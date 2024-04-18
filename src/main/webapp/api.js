
export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzEzNTA1NTA5fQ.ZbBNpdDyRFctBhWbuQjnWmQhacNhMXcO2blBoYEnbMHc7bcfzaXAxrsC8q9vL85z-7f51gFbocG8jRRMJ1v6ag"
    : new URLSearchParams(window.location.search).get("jwt");

