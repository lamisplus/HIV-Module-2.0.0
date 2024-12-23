export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzM0NjI3Njc3fQ.b5nw-oDPxmenGzQzuVIHbasXfqLto03WAocTxHkEkl-n4qG2jQiI91DqLgURPK4YsPp28s83bolLOC1Pzna4nQ"
    : new URLSearchParams(window.location.search).get("jwt");
