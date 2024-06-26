export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE5MzUwMDk5fQ.h9SMIWORfdg2fY0ycOwyIdX5jrdKHi2vM6mn3x0gc7ntrUEeW1k-uvnsS82QUYntdR9Pqdd-rmDzXgdhokH5UA"  : new URLSearchParams(window.location.search).get("jwt");
