export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
?"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzMyNjEyNTEyfQ.LJML_1O9O30fGy_KNYDALs55-rVkDTheVVNXIWsd2nbHs3OReR5TbGfEo3ZIxPWuSBaMO6phUxJk4r_loTjVCg"  : new URLSearchParams(window.location.search).get("jwt");
