export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE4MjEwNjQ5fQ.4enniP4MjLCXoKctCy8B1gieRXb9S5mYp4JHxMzJv34BOLhqLXqN5rC3eW-pLYWoYySO8BnxtTWjnVCA-gWb7Q"
    : new URLSearchParams(window.location.search).get("jwt");
