export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI3OTgzNDI0fQ.85Y8kH1BoY1WyOriN_MVgC5Hykzj5qpn66ohd3L6xgVe3J25aG8GrIHcRLBkYOXNFy1UAxJnjZRHom9Jpmd8vw"  : new URLSearchParams(window.location.search).get("jwt");
