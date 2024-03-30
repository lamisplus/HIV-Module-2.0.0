
export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzExODE2MjQ4fQ.Y3f4BB4BEwh5hT5-ShBW_4y1d4crDiGeQfyuLJB20rcVLnSOX20jog-rZBAzCjk30xYE2TPg3AsqDs4ENQlCWA"
    : new URLSearchParams(window.location.search).get("jwt");

