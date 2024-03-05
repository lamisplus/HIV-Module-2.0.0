export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA5NTcwODQ1fQ.h6qKdQeYRcJE6QaP1z-02FtDazw_UEXDlzFYfoGdQj7Bdua__LlySyRWLYtVX05mb2yMzqu9IdIaH1qynJ_jJg"
    : new URLSearchParams(window.location.search).get("jwt");
