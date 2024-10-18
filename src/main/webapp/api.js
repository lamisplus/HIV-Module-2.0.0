export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI5MzExNDYwfQ.kSszkeelF9wxany6TDSKd56LViz_4W-9occ_SzLVFOPYlD38Rre9jnqVWacyi_l12oxvDWdz-ML81wVwSMMt7Q"  : new URLSearchParams(window.location.search).get("jwt");
