export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE4OTYzNDA0fQ.uXlVQSo0U1MDaQJZJYUcNVmRJKuUyLgbNrfQ6as68KeZRC0APoTrT4L5aYS0dEpTreFik3lSbZ1vWWkLRnltAw"  : new URLSearchParams(window.location.search).get("jwt");
