export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzM0MDQ5NjE3fQ.9aNFE1yt_dOcOHbThxLoa004BmF3tNxsrcGmULB-TeUcbwDZLlnievNwPGgJbAzfh-M6PqBIYxrK8m9cmVwWnA"
    : new URLSearchParams(window.location.search).get("jwt");

