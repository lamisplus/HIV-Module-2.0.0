export const  token = (new URLSearchParams(window.location.search)).get("jwt")
export const url = '/api/v1/'

// export const url =  'http://localhost:8789/api/v1/';
// export const  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNjkxMTU3Nzc5fQ.AROLj7d3Jb1BQRIuzxToBDDkjtiIX6V5IfORuIdkQqgx575ZEr3pH7l0As1JhgayR5Rw1SItzu3jzTmrgBKoPw';