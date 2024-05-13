
export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE1NjE4MjYzfQ.0A_LmTuKgMrK4Vgr9hCWgfS9ACTpmFgKFjfkmomNx2PZaH44_VF-GPLbq4JcCzIXF37B_NbDx7ODzcuuOm-7dQ"
    : new URLSearchParams(window.location.search).get("jwt");

    

