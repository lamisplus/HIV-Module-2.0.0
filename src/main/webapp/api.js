export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE4OTA1ODg2fQ.HMGpchms4CQSSz8E-WX3_YSQXrYnhY9CHuJlo_46XQDa0ON4omtLYN8lWp9CGNxB18CdgbJ_1xbil5vLi5j2bQ"  : new URLSearchParams(window.location.search).get("jwt");
