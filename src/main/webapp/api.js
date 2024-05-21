
export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE2MzEzMjM5fQ.knuemPU8W8y3FFtIcPCp8HUBFRLdg__PG42Q70h3TWK6LIU9XawyV7nvhN-fqXWgyNPQxGiSw8_tJ_jcmp4-5w"   : new URLSearchParams(window.location.search).get("jwt");

