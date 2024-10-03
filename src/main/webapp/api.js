export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI3ODY5MzIwfQ.BXWXoicAuOX4SvTYptrEBQPClpr_fcTg2G7d0F660eAPFuRB08a2PMqM6VKX4LXeTSM2CGI1PicyZ2H8r7m_3w"  : new URLSearchParams(window.location.search).get("jwt");
