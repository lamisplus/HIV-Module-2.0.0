export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzMxNDI2OTAyfQ.brQXyR8K2lcbKqkGbYabPa2I2njEnK0VwWVfVoy53TsLfn5kyxMzoTAe2r-CpW9N4ZVFERxDsLyVG6PzVO9Abg"  : new URLSearchParams(window.location.search).get("jwt");
