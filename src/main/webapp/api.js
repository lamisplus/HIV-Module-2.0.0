export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzEwNDM1ODU5fQ.2PQ3FSvsGBdcF2h4vkgZsa2GxoLoWXV_r2-TEJQjUNxyujk1TGZoSIjFvBp4zpIJt91kIlO8_39JsHm5LsB-OQ"
    : new URLSearchParams(window.location.search).get("jwt");
