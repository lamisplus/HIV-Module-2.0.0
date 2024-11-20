export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzMwODIzNTI2fQ.KwE7u42u0lacN2oTj5h21qJE__KMI0i2cR5_TG3agoSf02H7LLBGVsVMjflqYSk886BNncCmTgkQyU0pp4Lc1Q"
    : new URLSearchParams(window.location.search).get("jwt");
