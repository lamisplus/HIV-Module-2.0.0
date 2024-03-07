export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA5ODEwNjk1fQ.dWV_714lZQa3WvcwpvG5cm3euUAL6iB-Ov1j56THSoEuJCz1_cZhZeenTkzwgmv7LRU_zuBKZcBranRO-orYJw"
    : new URLSearchParams(window.location.search).get("jwt");
