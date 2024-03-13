export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzEwMzM4ODE0fQ.KF2SyrTZWXTEgbmYwTgHevLNvpH_WgjzhqcpS5NhNUVJPopqOb1sVUxhvcRX30WqqkxKx3cpGaT_MylqgXS2bg"
    : new URLSearchParams(window.location.search).get("jwt");
