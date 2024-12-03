export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlY2V3c0FDRTUiLCJhdXRoIjoiU3VwZXIgQWRtaW4iLCJuYW1lIjoiRUNFV1MgQUNFNSIsImV4cCI6MTczMzI0MjczN30.S3o8tMMz2jfEhY__ICGsv7xqvYBJejAotuB5s61O3PAEVngGCgDzeGsjlQ9fXaisdOxzsveK_FKl9TVgofmNNA"
    : new URLSearchParams(window.location.search).get("jwt");
