
export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE4ODIzNDg3fQ.ye30FQKorAstmsVaJQr09V1I3I4O6ZbqM02xa57AmOwSwxPRtO9UmXOzKygTUxVTRxpSbxPDme07kOcNrT4PDg"   : new URLSearchParams(window.location.search).get("jwt");

