export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzIzMTIyMzgxfQ.UWhnc9x36Ae2-dcSZcucjLoqS2Q2-FNJ2_bg8FmjNsgfYZLJiw8E-eGr42E3Hh_rGlDrCQBsuh7wfiNjHwJLCg"  : new URLSearchParams(window.location.search).get("jwt");
