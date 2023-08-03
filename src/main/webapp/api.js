export const  token = (new URLSearchParams(window.location.search)).get("jwt")
export const url = '/api/v1/'

// export const url =  'http://localhost:8789/api/v1/';
// export const  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNjkxMDc4NTgwfQ.zjb9aoRlHWreoiJHL2I8Ugf2jQ1JwwPjdvz-QEZwgH4lNnksty7LySuZW-3rKFm7dE1aaUnXCOExFMosHyKhZA';