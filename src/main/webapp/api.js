
export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzExNjY4NjQ4fQ.iGv5P70fo4wpD8M3mmztIOxu9xSB14Y1c6m81YIkIDXGbutHOC_IQid5o_lVo-q9OE1LW8kd3eGZmhCCrw1zaw"
    : new URLSearchParams(window.location.search).get("jwt");

