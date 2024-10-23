export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzI5Njc5NTEyfQ.1hobMTW7W3-gLhuO1E1wySxD_0LNmLVqtRhKDJEHXtvrvqHjvEVwKncoZ64pNzjp5e1pkM-e3lV7hf_okKo6Tg"  : new URLSearchParams(window.location.search).get("jwt");
