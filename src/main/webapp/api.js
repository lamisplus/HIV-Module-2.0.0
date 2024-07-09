export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzIwNTkzNjMyfQ.mclf4EIQ3Le_HlBcom-qjd9iyEiIATpl5D0vnuTmwLwrNzCCkl0POGMFRjfLkoIcZPA0J19l3Vzr6uLxPD1aQQ"  : new URLSearchParams(window.location.search).get("jwt");
