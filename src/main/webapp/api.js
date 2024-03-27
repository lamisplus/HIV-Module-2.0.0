
export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzExNTMwMjg2fQ.gzbGfdrTUch3I9OOcbX_db6MwMFndf7rjLdSXmE6Qk70xcdPjxNRz829LJkbXwAOAyv9YsGZq544DN5iLsm43A"
    : new URLSearchParams(window.location.search).get("jwt");

