export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA5OTE4ODgyfQ.ZqIrS9B38_2dfUSpP5X8fEGhaVh-7YOS6WBwg4SbYdcoMZt2kyD7xv11N0lmMlgTtsRVdPHCKd0Ljvcj2rtrOw"
    : new URLSearchParams(window.location.search).get("jwt");
