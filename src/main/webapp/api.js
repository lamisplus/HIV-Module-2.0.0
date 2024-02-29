export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA5MjM3NjQ2fQ.eJZ0zx15FZufjOeauyP4b0X4_GqQX115GBB3fI7h93c8YqphIEQ3OV5n0Xa3chhCzzheTgqD2PKPTtLngrJ0aw"
    : new URLSearchParams(window.location.search).get("jwt");
