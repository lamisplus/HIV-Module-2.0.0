export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI0MTcwMTI5fQ.vSivGMhApcJefCt_zWHWcxdaBSTrGrcx0JPSDvndrK6wwMEJ2t5WGS6GDZx3QC89zTv-B1_57gv-hav_RnGPhw"  : new URLSearchParams(window.location.search).get("jwt");
