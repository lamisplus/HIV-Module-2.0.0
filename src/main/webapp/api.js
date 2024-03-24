
export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzEwOTQwNDk0fQ.xv2BFD7rt07P-xqNyx41jfz_-KNHwaNsAEJujyCZQiU4TtXAJ8sJAy1_fp-_CX6f4TI661v7WdW2fCx372wbMg"
    : new URLSearchParams(window.location.search).get("jwt");

