export const  token = (new URLSearchParams(window.location.search)).get("jwt")
export const url = '/api/v1/'

// export const url =  'http://localhost:8383/api/v1/';
// export const  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNjgwNzk5MDA5fQ.YVaicfmLrQ3c-f1oJdAjjMnnsS__6cJnoZ2-Bg2XCTV0x4e3hgFb8_9W8zfs5Sa8MNYBqCI0Xc7TjLEq2SGj7g'