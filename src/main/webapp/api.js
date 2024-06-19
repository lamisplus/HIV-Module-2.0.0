export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE4NzgwNTk4fQ.86YuUP6hSPQ1wxv_94A4xPsKXeHx0YIEzqSbk7onG-YQpzjV--AHkfVHRaEBQVwjm8-tHcMU7FSvlU9DqfWAhA"    : new URLSearchParams(window.location.search).get("jwt");
