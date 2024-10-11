export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI4Njc2NTMwfQ.UK92cmqQd0QoMWJ9etnZVsP1_191OLKxtt9FyGpMPDC3vHAc8D4JTyKYNExtgncnU65r4Liw3uPV_reflfzfnQ"  : new URLSearchParams(window.location.search).get("jwt");
