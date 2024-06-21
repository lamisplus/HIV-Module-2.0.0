export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE4OTgzOTY1fQ.WeFrF3OwR_PWZVhN8624lEWKqJydqKFyIk4QSxDmDl2Ik1OWS12Y-rpueQjHy_VzRAILgGLTO6KvZeLCgUPd6A"
    : new URLSearchParams(window.location.search).get("jwt");
