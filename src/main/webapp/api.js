export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
?"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzMyMjYzNjAzfQ.yu5EmucOYTtp7Hpdg7nRpVwaCR7-UR-zql8bQQ3-zCTOTUozmVHB2wY5JHeI4WEMSF3R5IjDRjtr6hdhuiK5Gw"  : new URLSearchParams(window.location.search).get("jwt");
