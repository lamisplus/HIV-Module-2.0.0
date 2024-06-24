export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE5MjQwNzI3fQ.H7H3EvuNkI3Mj7RqqYY59tkEFMBoF0R5dQqI10Rame6-2qun2S-Sx7zVWVS8zqbYYoyVv0DbsMZRBC8YbdKcvw"  : new URLSearchParams(window.location.search).get("jwt");
