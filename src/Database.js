class DatabaseClient {
  constructor() {}

  getData(query) {
    var data = [
      {
        name: "Artificial Intelligence",
        related: "Machine Learning",
        description:
          "the capacity of a computer to perform operations analogous to learning and decision making in humans, as by an expert system, a program for CAD or CAM, or a program for the perception and recognition of shapes in computer vision systems."
      },
      {
        name: "Machine Learning",
        related: "Artificial Intelligence",
        description:
          "a branch of artificial intelligence in which a computer generates rules underlying or based on raw data that has been fed into it."
      }
    ];
    return data;
  }

  createSnippet(raw, query) {
    // var snippet = raw;

    // var pattern = new RegExp(query, 'gi');
    // var matchesArr = pattern.exec(raw);
    // console.log(raw +", " +  query)
    // console.log(pattern);
    // console.log(matchesArr);
    // console.log();
    // if (matchesArr) {
    // 	for (var i = 0; i < matchesArr.length; i++) {
    // 		let match = matchesArr[i];
    // 		snippet.replace(match, "<em>" + match + "</em>");
    // 	}
    // }
    // console.log(raw + ", " + query);
    // raw.toLowerCase()
    var snippet = raw.replace(query, "<em>" + query + "</em>");
    return snippet;
  }

  doSearch(query, page, pageSize) {
    var results = [];
    let data = this.getData(query);
    for (var i = 0; i < data.length; i++) {
      let dataItem = data[i];
      let name = dataItem.name;
      let description = dataItem.description;
      // let result = resultList.results[i];
      results.push({
        data: {
          name: {
            raw: name,
            snippet: this.createSnippet(name, query)
          },
          description: {
            snippet: this.createSnippet(description, query)
          }
        }
      });
    }

    let pageState = {
      info: {
        meta: {
          page: {
            current: 1,
            size: 10,
            total_pages: 1,
            total_results: data.length
          }
        }
      },
      results: results
    };

    return pageState;
  }

  search(query, page, pageSize) {
    // return new Promise(function(resolve, reject) {
    return this.doSearch(query, page, pageSize);
    // });
  }
}

let createDatabaseClient = () => {
  return new DatabaseClient();
};

export default createDatabaseClient;
