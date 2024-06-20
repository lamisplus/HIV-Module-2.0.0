
export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE4ODk2MjE5fQ.wD4FpnHUqby0Zp0gXdb_FSECOJyj9qO1pSZwnJbrSQsxIA0_PXQeGLLVbtTIjMeidFKSKkNCt3PlsRlu4N_W0A"   : new URLSearchParams(window.location.search).get("jwt");

