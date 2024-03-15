
export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzEwNTM3MTkzfQ.FTpuhKTLwusTsps76ISIuqFTD_uCXN1vfqnIPdobEgaO3VgrmG4X-438hf8VUgIk_oix9QbkMmSwwIKP6e1cNg"
    : new URLSearchParams(window.location.search).get("jwt");

