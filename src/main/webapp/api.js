export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA5MDg1MDY2fQ.pVrle1jSrjjGEaOUAWjqy5TfUE5p63KvHv5xMZ2m_36JxeB9JD6MRXiNxcl_Znd2DMp1xZ-RA-TKESm1WhMfKg"
    : new URLSearchParams(window.location.search).get("jwt");
