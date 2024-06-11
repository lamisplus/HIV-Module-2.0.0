export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE4MTM0ODgzfQ.BeCdcSa8X-SJ44-FdT_K95kKXQQDX7JWv4g4mEgFuOO808bVuFj4cFPVHARIbuY4prj6ONa9blbcu7gCLGwTxg"
    : new URLSearchParams(window.location.search).get("jwt");
