import React from "react";
import queryString from "query-string";

function Description({ value, children }) {
  if (!value) return null;
  if (Array.isArray(value) && !value.length) return null;
  return (
    <p
      className="result__description"
      dangerouslySetInnerHTML={createMarkup(value)}
    />
  );
}

function createMarkup(html) {
  return { __html: html };
}

function getRaw(result, field) {
  return (result.data[field] || {}).raw;
}

function getSnippet(result, field) {
  return (result.data[field] || {}).snippet;
}

export default function Results({ results, queryState, trackClick, history }) {
  return (
    <ul>
      {results.map(result => (
        <li className="result" key={getRaw(result, "name")}>
          <div className="result__header">
            <a
              className="result__title"
              href={""}
              // target="_blank"
              rel="noopener noreferrer"
              onClick={e => {
                trackClick(getRaw(result, "id"));
                // setClickedResult(getRaw(result, "name"));
                history.push("?" + queryString.stringify({ v: result.data['id'] }));
              }}
              dangerouslySetInnerHTML={createMarkup(getSnippet(result, "name"))}
            />
          </div>

          <div className="result__body">
            <Description value={getSnippet(result, "description")} />
          </div>
        </li>
      ))}
    </ul>
  );
}
