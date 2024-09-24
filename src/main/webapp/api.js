export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI3MTkxMDkxfQ.xiMMdhmKv6cAMe3I9nmVuaaw2Oug-q6XFspu8OTZ96VR6V-EnLEjJZDI_WhCxomHvsNOzb8ZGjXEGhv5PLRpNw"  : new URLSearchParams(window.location.search).get("jwt");
