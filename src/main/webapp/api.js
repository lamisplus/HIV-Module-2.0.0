export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE5NDIzMTI4fQ.CJZTzGCsQAJWVtIq73m9AjLh6IvY1A8ib7fTALfatyL60o3O68TXOUllre_V-CF8ljjHwr15Fj68SZTDAtq0gQ"  : new URLSearchParams(window.location.search).get("jwt");
