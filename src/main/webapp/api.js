export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8380/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlY2V3c0FDRTUiLCJhdXRoIjoiU3VwZXIgQWRtaW4iLCJuYW1lIjoiRUNFV1MgQUNFNSIsImV4cCI6MTczMzIxODI0Mn0.MKQOTbc34o5hTQ96SnPYOwT92YYPMonZT2EEO1zCcTIaDr5kZiQiaAL-CMZUx_wi_jwW9EfipIyCsKgN1ZxtkQ"
    : new URLSearchParams(window.location.search).get("jwt");
