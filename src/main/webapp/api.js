export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE4MTgwMTQ0fQ.Ejc3YhqngqzBfhMNQ_koRACJIVbGAq-N1NanCZ0LP-bS0pVo4fInmmG6ETP13ZSvooz6hYlGfW2vGWjRnlG_Lg"
    : new URLSearchParams(window.location.search).get("jwt");
