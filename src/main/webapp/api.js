export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI4MzE2ODY4fQ.i_EkRuxYfW6KBsc_3EQCxSA8eVMGPy6on9gY_cRKtgj9ehZvu1-YhMtV1GWvTPDs6xB5xdHLOoJbvHap6rpTfA"  : new URLSearchParams(window.location.search).get("jwt");
