export const  token = (new URLSearchParams(window.location.search)).get("jwt")
export const url = '/api/v1/'
// export const url =  'http://localhost:8383/api/v1/';
// export const  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNjgwNzEyMTE4fQ.hnfW-iT8A2CftfffLZbhRMyuoy810dsF6tUYTPZtWNxErPQuXEDLssz4pVaPJESW4Hwldm43U_lhfkMVEGqkKw'