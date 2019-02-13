import { Component } from "react";
import { debounce } from "lodash";
import queryString from "query-string";
import createDatabaseClient from "./Database";

const databaseClient = createDatabaseClient();

const FILTERS_WHITELIST = ["dependencies", "license", "keywords"];

function getFiltersFromQueryState(queryState) {
  return FILTERS_WHITELIST.reduce((acc, filterName) => {
    const filterValue = queryState[filterName];
    if (!filterValue) return acc;
    return acc.concat({ [filterName]: filterValue });
  }, []);
}

/*
  A simple abstraction to centralize all App Search logic in one place. This uses the
  Render Props pattern (https://reactjs.org/docs/render-props.html) and hence makes no assumption
  about your view, it simply passes down handlers and data to the app.

  In your React app, you may choose to use something like Redux or Mobx to achieve this centralization,
  but for simplicity in this Demo, we've chosen to simply keep this in a top-level component.
*/
export default class Search extends Component {
  state = {
    facets: {},
    filters: {},
    pageState: {
      currentPage: 0,
      pageSize: 0,
      totalPages: 0,
      totalResults: 0
    },
    query: "",
    requestId: "",
    results: []
  };

  updateQuery = query => {
    const { history } = this.props;
    history.push("?" + queryString.stringify({ q: query }));
  };

  updatePage = newPage => {
    const { history } = this.props;
    history.push(
      "?" + queryString.stringify({ ...this.getQueryState(), page: newPage })
    );
  };

  updateFromQueryState = () => {
    let { q, page } = this.getQueryState();
    const filters = getFiltersFromQueryState(this.getQueryState());
    q = q || "";
    page = parseInt(page, 10);
    page = isNaN(page) ? 1 : page;
    this.updateResults({ query: q, page: parseInt(page, 10), filters });
  };

  updateResults = debounce(({ query, page = 1, filters }) => {
    databaseClient.search(query, page, 10).then(
      resultList => {
        // console.log(resultList);
        this.setState({
          pageState: {
            currentPage: resultList.info.meta.page.current,
            pageSize: resultList.info.meta.page.size,
            totalPages: resultList.info.meta.page.total_pages,
            totalResults: resultList.info.meta.page.total_results
          },
          query: query,
          results: resultList.results
        });
      },
      error => {
        console.log(`error: ${error}`);
      }
    );
  }, 200);

  // trackClick = ({ query, documentId, requestId }) => {
  //   client.click({ query, documentId, requestId });
  //   // We'll return undefined here. We don't necessarily want calling code to wait for a response.
  // };

  // This is so that we don't have to pass `requestId` and `query` deep down
  // the tree.
  curriedTrackClick = (query, requestId) => documentId => {
    // this.trackClick({ query, requestId, documentId });
  };

  getQueryState = () => queryString.parse(this.props.location.search);

  componentDidMount() {
    this.updateFromQueryState();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.updateFromQueryState();
    }
  }

  render() {
    const { children } = this.props;
    const {
      facets,
      filters,
      pageState,
      query,
      requestId,
      results
    } = this.state;
    const { q } = this.getQueryState();
    const queryClass = query ? "active-search" : "";

    return children({
      query: q,
      queryState: this.getQueryState(),
      queryClass: queryClass,
      searchActions: {
        trackClick: this.curriedTrackClick(query, requestId),
        updatePage: this.updatePage,
        updateQuery: this.updateQuery
      },
      searchResults: {
        facets,
        filters,
        pageState,
        query,
        requestId,
        results
      }
    });
  }
}
