export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzMyODE4MzkzfQ.ZEodzNPP5cKXDk8o6dMFHYY1iXW44qAbcvVafAiET16G3bv4mo9ZNEZXFETSXBdB_z0iBazHUdnNbkzHChm-Jw"
    : new URLSearchParams(window.location.search).get("jwt");
