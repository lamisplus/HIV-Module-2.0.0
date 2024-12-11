export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzMzODQyMTI5fQ.J6sH5PBW7UpeEp6q5iEIG7tF2TtZgLrhhCgpslLjYXu7PdXuRiFtGmUS1HOuCZ2KLjMTESqHcoJ6p0E_Ja0S3w"
    : new URLSearchParams(window.location.search).get("jwt");

export const wsUrl = "http://localhost:8383/websocket"