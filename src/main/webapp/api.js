export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI1MjgwNTc5fQ.qmDTljy12_vuuXY-GgS49lp_VHa8dzUzaxuxJc0o4L5FSKJwwy6o-sYJeHYjUspIeNRF7DZ0lHKWt_GTZFUF4Q"  : new URLSearchParams(window.location.search).get("jwt");
