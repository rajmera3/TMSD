import React from "react";
import FilterLink from "./FilterLink";

function LineItem({ label, value, children }) {
  if (!value) return null;
  if (Array.isArray(value) && !value.length) return null;
  return (
    <li>
      <strong>{label}</strong>: {children(value)}
    </li>
  );
}

function Lisence({ value, children }) {
  if (!value) return null;
  if (Array.isArray(value) && !value.length) return null;
  return <div className="result__lisence">{value}</div>;
}

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

export default function Results({ results, queryState, trackClick }) {
  return (
    <ul>
      {results.map(result => (
        <li className="result" key={getRaw(result, "name")}>
          <div className="result__header">
            <a
              className="result__title"
              href={`https://www.npmjs.com/package/${getRaw(result, "name")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => trackClick(getRaw(result, "id"))}
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
