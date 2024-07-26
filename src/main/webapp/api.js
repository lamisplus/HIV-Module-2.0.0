export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzIxODkyODA3fQ.xsSjd9k7LuDPks8dvnwf-CaagPCCyxl-y5vnOI6AfG74-_hzKPbZj6fd1k5J2pq2PJO37TE9mhBje9876hloWw"  : new URLSearchParams(window.location.search).get("jwt");
