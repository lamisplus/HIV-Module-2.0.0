export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzMxMDg2OTIwfQ.toyE9G98RZKKhM9gSkZ_Wen81KlJDDLrrJJ8uo0ELXZesqNRL8JgUn1gitVHVDT3w8pvcfVmAOMa1E8-F0LhWQ"  : new URLSearchParams(window.location.search).get("jwt");
