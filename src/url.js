let url = require('url')


let urlParse = url.parse('https://www.flipkart.com/6bo/jdy/~cs-scglyuz1jw/pr?sid=6bo%2Cjdy&collection-tab-name=Memory+Card&param=45678&hpid=N7YhGJjYJmROEc5g4JCrlap7_Hsxr70nj65vMAAFKlc%3D&ctx=eyJjYXJkQ29udGV4dCI6eyJhdHRyaWJ1dGVzIjp7InZhbHVlQ2FsbG91dCI6eyJtdWx0aVZhbHVlZEF0dHJpYnV0ZSI6eyJrZXkiOiJ2YWx1ZUNhbGxvdXQiLCJpbmZlcmVuY2VUeXBlIjoiVkFMVUVfQ0FMTE9VVCIsInZhbHVlcyI6WyJGcm9tIOKCuTQyOSJdLCJ2YWx1ZVR5cGUiOiJNVUxUSV9WQUxVRUQifX0sImhlcm9QaWQiOnsic2luZ2xlVmFsdWVBdHRyaWJ1dGUiOnsia2V5IjoiaGVyb1BpZCIsImluZmVyZW5jZVR5cGUiOiJQSUQiLCJ2YWx1ZSI6IkFDQ0c5TlBYQllGRkZIMlYiLCJ2YWx1ZVR5cGUiOiJTSU5HTEVfVkFMVUVEIn19LCJ0aXRsZSI6eyJtdWx0aVZhbHVlZEF0dHJpYnV0ZSI6eyJrZXkiOiJ0aXRsZSIsImluZmVyZW5jZVR5cGUiOiJUSVRMRSIsInZhbHVlcyI6WyJUb3AgU2VsbGluZyBTRCBDYXJkcyJdLCJ2YWx1ZVR5cGUiOiJNVUxUSV9WQUxVRUQifX19fX0%3D', false)
console.log(urlParse);

let obj = {
    protocol: 'https:',
    slashes: true,
    host: 'www.shoppingheist.com',
    query: {
        sid: '6bo,jby',
        param: '45678',
        hpid: 'N7YhGJjYJmROEc5g4JCrlap7_Hsxr70nj65vMAAFKlc='
    }
}

let urlFormate = url.format(obj)

let urlresolve = url.resolve('https://www.shoppingheist.com', '/utsav')
console.log(urlresolve);
