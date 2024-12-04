export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlY2V3c0FDRTUiLCJhdXRoIjoiU3VwZXIgQWRtaW4iLCJuYW1lIjoiRUNFV1MgQUNFNSIsImV4cCI6MTczMzMyMTUyOX0.cSAXSN7rk5iwiYwv0s96ssW3SJ-9RcLydNroJTtmZ05PphkJH3deMby38ywJ91zQnGN8b_pIyQonizRiAPgtLA"
    : new URLSearchParams(window.location.search).get("jwt");
