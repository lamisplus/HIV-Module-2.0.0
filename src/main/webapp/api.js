export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzIwNzE1Mjk5fQ.7sRU7wDhnhvP8xRQn1lh-Nt2hAT4M9svys8S0Tuctu71WWGYeCg_ZEHBxGzzJ4mSocki6engnKHqr-BXRh9EQw"  : new URLSearchParams(window.location.search).get("jwt");
