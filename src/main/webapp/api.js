export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA5ODI1ODQxfQ.gpdLJ0AlsFtAWrorIXj0TNL-eI0ypepAeyKom1NbpZ1oj1h-u3okO2Wxstyq6RM5Vdsl3q-nkWiel1omMESC7Q"
    : new URLSearchParams(window.location.search).get("jwt");
