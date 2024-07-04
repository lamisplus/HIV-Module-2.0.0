export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzIwMTEyNDQ2fQ.qjC1LP3gyzVx9GWbiGxJDSZ0EbSs9hUIJ8xNYxWa1ga4YuXec4ZEFt7MmYY9haFuzmbTCFL9lWU0KrV45K8C2Q"  : new URLSearchParams(window.location.search).get("jwt");
