export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI4NDEzMjg0fQ.TknxJGX3CQSDDi79rbaSbcSUdwwC8d8wZbFH7m5Ubg1GkxWYfYB63Wgqv-kbVKJzvNFhT0YFNBUj6dSiHtoVkA"  : new URLSearchParams(window.location.search).get("jwt");
