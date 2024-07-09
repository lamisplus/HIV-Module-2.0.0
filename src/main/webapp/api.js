export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzIwNTEyMjk4fQ.Vwrym_y87yVNGrkXkfbIHeCzQDq3UnmE-i7CvRq7c2iWRg5JTkF6xeUc5tbl6ho88kiz9XDEEy7cyZRw4sSXwQ"  : new URLSearchParams(window.location.search).get("jwt");
