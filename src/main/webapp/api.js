export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE5MDQ3NjM2fQ.S9EbgGDVyC6cJMy8uZja_wL2jK_OagOmNPL5-3Tq_ZCEOGtPQvZTPNWrpGh7pP3ovLlqQqa3Dih4hPPlVqxP5w"  : new URLSearchParams(window.location.search).get("jwt");
