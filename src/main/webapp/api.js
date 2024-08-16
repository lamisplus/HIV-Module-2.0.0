export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzIzODM3MDYzfQ.hobeqKZMsIhDflnCnFtdzvOlu8MZJAFszm9z_BUQtPrN0eme_yXrff0G984TcXfUR9EWWa2Ezf2HVSK9oV8ruQ"  : new URLSearchParams(window.location.search).get("jwt");
