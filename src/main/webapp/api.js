
export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE4Mzk3NDMyfQ.xOGZjcCNOdbst6QLyo1fonvVy_u-Z1cNdMjGDep_tNLXOgKTuOLXV21bEagzsP1Tgf8sfHRbkI5ICR1EwwPa2g"   : new URLSearchParams(window.location.search).get("jwt");

