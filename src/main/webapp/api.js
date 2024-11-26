export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8789/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlY2V3c0FDRTUiLCJhdXRoIjoiU3VwZXIgQWRtaW4iLCJuYW1lIjoiRUNFV1MgQUNFNSIsImV4cCI6MTczMjYwNzc2Nn0.P8nqZ6RldMF7oyDvoMZCKZV_Cu8EDq-b8_cl0XZXQU4wijQJtuF4PhuL7x9f4AhBEcLQxxwemRVCsbXG5kiPzw"  : new URLSearchParams(window.location.search).get("jwt");
