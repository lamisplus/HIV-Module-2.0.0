export const  token = (new URLSearchParams(window.location.search)).get("jwt")
export const url = '/api/v1/'

// export const url =  'http://localhost:8787/api/v1/';
// export const  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNjg3NzE4NjUzfQ.MnktOezioqny2i7djt5mn7QryXZAiJ2XFvH6FhJTF40MyD_rbR7v2j1wIfHVAoWolo6ET6DYLyaPZ3l-ceTfBw';