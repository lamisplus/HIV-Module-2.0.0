export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzMzNzY4NzIwfQ.nl0xoTKvthx3RhxQQHobzj6FKb9WlN7mTQ7f72V6UagfO3A8cVt3pyv_EpyRkbH8ENGbrMvgroo8OISrYdgZ9g"
    : new URLSearchParams(window.location.search).get("jwt");
