export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzIxMjUxODg2fQ.X5gq50t-j_12ZamOF5ea1RS6VDncUXpPjV01XCwYzrUNDJBGefWGdgOuLsyQq-ntggHh1ttYdPrwAajWWYPUCw"  : new URLSearchParams(window.location.search).get("jwt");
