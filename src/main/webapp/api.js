export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI4MjU5ODM4fQ.AbkMiEmfZd7uO6G2rxNzehph1AL0oL1yhceM5KkzvjXMRWapq936I8ZifF9U7TtKxPHWvTIdQLOWomVr827PPA"  : new URLSearchParams(window.location.search).get("jwt");
