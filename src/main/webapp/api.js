export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzIwNTQzMzc2fQ.kfBmtf2Z4csRaaVHqnDqULA3fJ2ikdygJm5s5GdnBoN3XTvBNTZpGnVJiN3IBkq19scK5knTEWJFoOtI01afuQ"  : new URLSearchParams(window.location.search).get("jwt");
