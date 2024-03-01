export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA5MjM4NDE5fQ.Af8JDvM5SHqiLVSYqFeT2qkDERRCGcpFKyftoSlgxOnH78EDFg6lbVAAIs_mFSFCwHlYnUNfOb4Wry2YeMj1tg"
    : new URLSearchParams(window.location.search).get("jwt");
