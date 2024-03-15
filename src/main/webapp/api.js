
export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzEwNTYwOTc5fQ.5g-OMAtCRNJS7DnjMDGXzKhGk1_CpHxBwJVgm4tAzPTRhPFo_hvkKsC6m46Wos9uQa6outrMHnvxAdYXY-sdAA"
    : new URLSearchParams(window.location.search).get("jwt");

