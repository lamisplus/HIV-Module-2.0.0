
export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzExNjQ5MTE1fQ.oqw_3nLo2t3SNokaYEl4cwx62IeCt9fdwOnUj798DR6dGwRIw6iNhfHVjhZ9toRL8dj2QvjmqeVHHtJbsq9KQQ"
    : new URLSearchParams(window.location.search).get("jwt");

