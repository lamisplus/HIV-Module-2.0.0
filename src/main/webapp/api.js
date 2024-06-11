export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE4MTMwNDg1fQ.5866fU-yMnM4eS2FGz7hix4GgSbwUB6qrAFStfe14hnxpXwR3PtCATR7WYudasfhmizVuC4Rq0ubcSU0mjKKUA"
    : new URLSearchParams(window.location.search).get("jwt");
