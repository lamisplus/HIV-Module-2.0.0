export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE5ODQ3Nzg3fQ.j0e6bTOG7w2eH-UUUbF0OBUq7CpETEyjP7NXb50TAgI_38TOWWFG7RtA4ID3Lq-NcVDU52bsDoHgJv_lxRX6Yw"  : new URLSearchParams(window.location.search).get("jwt");
