
export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzEyMDg5NjQ5fQ.I8TBeiGW2wvh86o9waJ-fPhB3lkdbE4FF3M5B-kD62rXQkqytaG3AZuhPqasEywMr6c0NSddBhqUfZvlZ2-qvg"
    : new URLSearchParams(window.location.search).get("jwt");

