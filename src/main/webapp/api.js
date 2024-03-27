
export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzExNTY1ODc0fQ._2UhvMcMEM8PPEJvOoQMpDv0H0U322eZ3wjm3p7JZTuVDAIhE7p6_tggg0ygljgc1-odnn_yAOQWJC9o9IY1rQ"
    : new URLSearchParams(window.location.search).get("jwt");

