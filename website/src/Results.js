import React from "react";

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

export default function Results({ results, queryState, trackClick, setClickedResult }) {
  return (
    <ul>
      {results.map(result => (
        <li className="result" key={getRaw(result, "name")}>
          <div className="result__header">
            <a
              className="result__title"
              href={"#"}
              // target="_blank"
              rel="noopener noreferrer"
              onClick={e => {
                trackClick(getRaw(result, "id"));
                setClickedResult(getRaw(result, "name"));
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
