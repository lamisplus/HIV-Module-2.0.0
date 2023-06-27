export const  token = (new URLSearchParams(window.location.search)).get("jwt")
export const url = '/api/v1/'

// export const url =  'http://localhost:8787/api/v1/';
// export const  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNjg3ODY1MjIxfQ.kTUHVDgKMi5thP0eCQS8iQb0MxyL2u-E2Fv00RTQasm4Az7q_eYFTy9T4AYIA4E66Bowk5UICkBRa6wNy0CjCA';