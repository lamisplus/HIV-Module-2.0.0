export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA5NjMyOTQ3fQ.xm-6HabiFNrWo_yuKvyGldu53c62_dH5ADXe4QEVGQiQML2sVTljaOOUIxCmfeFaG8awCOiS8eXRZB0g5KOSHQ"
    : new URLSearchParams(window.location.search).get("jwt");
