export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI1NjIzMTg1fQ.k6hLOXKJ9QKNEqX2RXby1U7grd3Ew8_LlrB7c3hTLKNlyFU-raK5MApHze1mdCYUHrglWjtrvlzONlV4mgZ01w"  : new URLSearchParams(window.location.search).get("jwt");
