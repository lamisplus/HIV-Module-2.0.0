export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzIyNDMyNjI3fQ.INvtAeE-FUQZGORfheqw5pGcrL40S0GW_38WQ4P6yyUq1tPSACnXbqH1iJpcLElQYKP5JMa1hM8umZNfnK6LHg"  : new URLSearchParams(window.location.search).get("jwt");
