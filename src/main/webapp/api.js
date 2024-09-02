export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI1MzExMjY1fQ.uxVIB2nK4U8QvR5XL_aSOmZj1O_fRF4jJiFfXqiKKSZrkJyH-vfDsxVyE1pNFyW3W9tjpNlXB-Arz8Vg9fTlZg"  : new URLSearchParams(window.location.search).get("jwt");
