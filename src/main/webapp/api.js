export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzIzMjA4NzI3fQ.CrAWNu81knNiuVLc2D9-MFa5IBaqAJRPRUnUVr7wOcBXKQQs4GOKpLCB1teSPpo0WZw8iA34HmwRJzbl5ih1ng"  : new URLSearchParams(window.location.search).get("jwt");
