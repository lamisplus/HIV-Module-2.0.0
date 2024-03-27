
export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzExNTQ2NTU1fQ.0okVv7_kS0Hz0-pw0_SC4WH24j_lJ46_yHrZEYPmsKahhTOiuPHN4kP8Eo-BfQQAzDHtEdId-ZtTGtPQepwu3A"
    : new URLSearchParams(window.location.search).get("jwt");

