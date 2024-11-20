export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzMyMTI2MTgxfQ.DpyCL-ISTCK6udHRQNh7bZQbsFsrA2WeGI_GT137dCarx3hWDST7epjPb9rx8wAtf0WEJs4oSA1G5T7Mp0TFZw"  : new URLSearchParams(window.location.search).get("jwt");
