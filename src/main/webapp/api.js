
export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE1NjEwOTI4fQ.uVaaINP2z-hon2jnMLhc2gA7UcRk2_12huCXbKnIA3dKoRM6TNraDK79FmOu8PzzKL1mT59RzE8Vc9DFDEv1hQ"   : new URLSearchParams(window.location.search).get("jwt");

