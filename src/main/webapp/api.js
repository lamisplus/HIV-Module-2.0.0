export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA5MjUyNzA2fQ.kFzSTphtWELpuPVWpG6KvpZXFr0CXZtfxLceWd_r04mJMPOQCxKGNNjxkrOU5qimX752vTD83sYCP8b98dUgzg"
    : new URLSearchParams(window.location.search).get("jwt");
