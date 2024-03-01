export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"

    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA5MTMzNDcxfQ.1RClTPMwZYKriYSiya5tKnVcs4gHFqyynpRwXlh52e61bsaL4GL6GNz9fzCo3wP3QgeSDWkFJ3RPZ_aq9cMqOg"

    : new URLSearchParams(window.location.search).get("jwt");
