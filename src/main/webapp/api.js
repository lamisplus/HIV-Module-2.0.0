export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzMwOTk3NTI3fQ.FJW_qnIbECNbdsM4zqLu8zKWnUyPm9hya26jEU0tPaaCFTXUMMQ8JalfAGG6MfBR7ADkWf8I8NkrmQV12K-LFg"  : new URLSearchParams(window.location.search).get("jwt");
