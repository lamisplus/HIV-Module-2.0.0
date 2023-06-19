export const  token = (new URLSearchParams(window.location.search)).get("jwt")
export const url = '/api/v1/'
// export const url =  'http://localhost:8787/api/v1/';
// export const  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlY2V3c0FDRTUiLCJhdXRoIjoiU3VwZXIgQWRtaW4iLCJuYW1lIjoiRUNFV1MgQUNFNSIsImV4cCI6MTY4NzE3ODkwNn0.sJkz_EbgaLJG-mOJUeMh-6R0Fhdy6_MaVt6ed-Q-2z5-pfZhfGpdIBW7nYl1YU2NFH13am6ueo82Lz0wioCsww';