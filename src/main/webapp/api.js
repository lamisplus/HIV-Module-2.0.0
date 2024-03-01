export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA5MzE3OTQ4fQ.DRyFov3LEO06Aek_KHhiJBG5wnUJLkss9L3JsBSTuZUAxeEmSn8sCkjOw7g6RTeLd-RxfJBSxQqZH4Ba_JdDBg"
    : new URLSearchParams(window.location.search).get("jwt");
