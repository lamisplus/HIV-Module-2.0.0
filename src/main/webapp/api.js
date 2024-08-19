export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI0MDg4OTI3fQ.xEdojzCgsBA9aLcEWdXyMHwUnmho8-4XfpdyK7wDwJXwzulLwx045BV-gmW_HlJZsqk49B2JJNO2J8sZD6hlcQ"  : new URLSearchParams(window.location.search).get("jwt");
