export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA5NzQ5NTE2fQ.Rf5112OgqZ0vl-YEKezm3r7BN2wB7ZJwnkEEBG8K4vgCfemse6tMsmHZ_5Gzk8wZg03zO78U2vGTeazDXVyVOA"
    : new URLSearchParams(window.location.search).get("jwt");
