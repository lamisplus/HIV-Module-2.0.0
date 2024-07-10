export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzIwNjU2NTI0fQ.c7inh7-9JnPNGuBqXY2_5_MZDyrNl3Q7C2j1UKZ8O57dQaHkVJCLcWjzqUqnZFUpYYKbgVc3bbLJ49R2r_80OQ"  : new URLSearchParams(window.location.search).get("jwt");
