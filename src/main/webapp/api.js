export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzIzNjE5Mzk0fQ.BjM3Lizfko-XZJZDSZ23z8kj-vXqb6RvACAXpl3xyyfHvsM3lrp1pCXXtZEy68I0UpIqTl1fpUZaOyWEuj8BDQ"  : new URLSearchParams(window.location.search).get("jwt");
