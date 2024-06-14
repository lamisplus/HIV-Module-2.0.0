export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE4MzYyOTYzfQ.CrygZm4pSGt_YDv6uCZWApxgLN8-XBYAa1o1GDj_DTPYlU6zd3oO5-HKivAL-Ly6MZeHf_WvOJ1sy-S8BIrL8A"
    : new URLSearchParams(window.location.search).get("jwt");
