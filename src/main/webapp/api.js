
export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzExNDIzNjMwfQ.DkSE5L9KlY67bQqk76GxdbDybNXbT4x8MqOVD1Zcp4wDNs4gfkM2XPTmCntRr2I3edtpQqG9MX8Y0Q42FUhXIA"
    : new URLSearchParams(window.location.search).get("jwt");

