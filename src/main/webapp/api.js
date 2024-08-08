export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8380/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkb2N0b3IiLCJhdXRoIjoiRG9jdG9yL0NsaW5pY2lhbiAiLCJuYW1lIjoiZG9jdG9yIGRvY3RvciIsImV4cCI6MTcyMzE1NTIzMH0.8QtfKP4G9Zr9YLaThHsj7OTV6rrlsQmA-d7zHg9m_R9JAweS3FowJpx_FtmaHbV8oH_6QgI6wa4ruKW6pL2X0g"
    : new URLSearchParams(window.location.search).get("jwt");
