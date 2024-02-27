export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA4OTk1MDg1fQ.byjLGTSMtC_NQhYDnTyH_TwupovlKb1C_m0JApTp84UdOMrhzLe4ULq9Jk0BFLmeNBrOqVagClOZbDlR0WvsUQ"
    : new URLSearchParams(window.location.search).get("jwt");
