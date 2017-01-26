/**
 * Created by user on 12/10/2016.
 */
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {JwtHelper} from 'angular2-jwt';
// import * as crypto from 'crypto';
// import {jwt} from 'jsonwebtoken';

export var FakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: Http,
  useFactory: (backend, options) => {
    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {

      let testUser = { username: 'abbas', password: 'Adam24092001', firstName: 'Abbas', lastName: 'Salem' };
      let mockData = createMockData();
      // let token = generateToken();

      /**
       * token generated with the following info:
       * header:{
       *   "alg": "HS256",
       *  "typ": "JWT"
       * }
       *  data:{
       *  "iss":"Iman Ordering App",
       *  "sub": "19990806",
       *   }
       *
       *   HMACSHA256(
       *      base64UrlEncode(header) + "." +
       *      base64UrlEncode(payload),
       *      secret)
       *
       *
       **/

      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJJbWFuIE9yZGVyaW5nIEFwcCIsInN1YiI6IjE5OTkwODA2In0.nI--G-H1S-dk-efe3P03HX-NMbeeqg7KKZrX9Ug9dP8';
      console.log('jwt token - FakeBackend : ');
      console.dir(new JwtHelper().decodeToken(token));

      // wrap in timeout to simulate server api call
      setTimeout(() => {
        // fake authenticate api end point
        if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
          // get parameters from post request
          let params = JSON.parse(connection.request.getBody());
          // check user credentials and return fake jwt token if valid
          if (params.username === testUser.username && params.password === testUser.password) {
            // connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: { token: 'fake-jwt-token' } })));
            connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: { token: token } })));
               // new ResponseOptions({ status: 200, body: { token: 'fake-jwt-token' } })
            // generate token for users to be used for subsequent calls.

          } else {
            connection.mockRespond(new Response (new ResponseOptions({ status: 200 })));
          }
        }

        // fake users api end point
        if (connection.request.url.endsWith('/api/categories') && connection.request.method === RequestMethod.Get) {
          // check for fake auth token in header and return test users if valid, this security is implemented server side
          // in a real application
          if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
            connection.mockRespond(new Response(
              new ResponseOptions({ status: 200, body: mockData.categories })
            ));
          } else {
            // return 401 not authorised if token is null or invalid
            connection.mockRespond(new Response(
              new ResponseOptions({ status: 401 })
            ));
          }
        }
      }, 500);
    });
    return new Http(backend, options);
  },
  deps: [MockBackend, BaseRequestOptions]
};


// function generateToken(){
//   return jwt.sign({
//         data: {sub:19990806,iss:'Iman Ordering App'}
//       },
//     'Adam24092001', { expiresIn: 60 });
// }


// function verifyToken(token:any):any{
//   return jwt.verify(token, 'shhhhh');
// }


// function generateToken(){
//
//   let header = {
//     "alg": "HS256",
//     "typ": "JWT"
//   };
//
//   var data = {
//     "sub": 19990806,
//     "iss": "Iman Ordering App"
//   };
//
//   var stringifiedHeader = crypto.enc.Utf8.parse(JSON.stringify(header));
//   var encodedHeader = base64url(stringifiedHeader);
//
//   let unsignedToken = base64url(header) + "." + base64url(data);
//   let jwt = unsignedToken + "." + base64url(HMAC256(unsignedToken, secret));
//
//   let stringifiedData = crypto.enc.Utf8.parse(JSON.stringify(data));
//   let encodedData = base64url(stringifiedData);
//   let token = encodedHeader + "." + encodedData;
//
//   //token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMzNywidXNlcm5hbWUiOiJqb2huLmRvZSJ9
//
//   let secret = "My very confidential secret!";
//   let signature = crypto.HmacSHA256(token, secret);
//   signature = base64url(signature);
//   let signedToken = token + "." + signature;
//   return signedToken;
//   //signedToken = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMzNywidXNlcm5hbWUiOiJqb2huLmRvZSJ9.EvTdOJSfbffGHLyND3BMDwWE22zUBOCRspPZEHlNEw
// }
//
// function base64url(source) {
//   // Encode in classical base64
//   let encodedSource = crypto.enc.Base64.stringify(source);
//   // Remove padding equal characters
//   encodedSource = encodedSource.replace(/=+$/, '');
//   // Replace characters according to base64url specifications
//   encodedSource = encodedSource.replace(/\+/g, '-');
//   encodedSource = encodedSource.replace(/\//g, '_');
//   return encodedSource;
// }

function createMockData() {
  let data =
  {
    "categories": [
      {
        "_id": "57fa764516e5646c2329d44e",
        "name": "Pains",
        "description": "",
        "products": [
          {
            "id": "21",
            "name": "Baguette",
            "description": "",
            "reference": "x21",
            "image": "/assets/img/baguette.jpg",
            "prices": [
              {
                "1": 0.8
              },
              {
                "10": 15.0
              },
              {
                "20": 28.0
              }
            ]
          },
          {
            "id": "22",
            "name": "Pain Francais",
            "description": "",
            "reference": "x22",
            "image": "/assets/img/french-bread.jpg",
            "prices": [
              {
                "1": 0.75
              },
              {
                "10": 7.0
              },
              {
                "20": 12.0
              }
            ]
          },
          {
            "id": "23",
            "name": "Piccolo Blanc",
            "description": "",
            "reference": "xxx23",
            "image": "/assets/img/piccolo-white.jpg",
            "prices": [
              {
                "1": 0.3
              },
              {
                "10": 2.5
              },
              {
                "20": 4.0
              }
            ]
          },
          {
            "id": "24",
            "name": "Piccolo Gris",
            "description": "",
            "reference": "x24",
            "image": "/assets/img/piccolo-brown.jpg",
            "prices": [
              {
                "1": 0.35
              },
              {
                "10": 3.0
              },
              {
                "20": 5.0
              }
            ]
          },
          {
            "id": "25",
            "name": "Tartine BlancP",
            "description": "",
            "reference": "x24",
            "image": "/assets/img/slice-white-small.jpg",
            "prices": [
              {
                "1": 1.2
              },
              {
                "10": 11.0
              },
              {
                "20": 20.0
              }
            ]
          },
          {
            "id": "25",
            "name": "Tartine BlancG",
            "description": "",
            "reference": "x25",
            "image": "/assets/img/slice-white-big.jpg",
            "prices": [
              {
                "1": 1.7
              },
              {
                "10": 16.0
              },
              {
                "20": 30.0
              }
            ]
          },
          {
            "id": "26",
            "name": "Tartine GrisP",
            "description": "",
            "reference": "x26",
            "image": "/assets/img/slice-brown-small.jpg",
            "prices": [
              {
                "1": 1.3
              },
              {
                "10": 12.0
              },
              {
                "20": 22.0
              }
            ]
          },
          {
            "id": "27",
            "name": "Tartine GrisG",
            "description": "",
            "reference": "x27",
            "image": "/assets/img/slice-white-big.jpg",
            "prices": [
              {
                "1": 1.8
              },
              {
                "10": 17.0
              },
              {
                "20": 32.0
              }
            ]
          },
          {
            "id": "28",
            "name": "Cereal G",
            "description": "",
            "reference": "x28",
            "image": "/assets/img/slice-cereal-big.jpg",
            "prices": [
              {
                "1": 1.9
              },
              {
                "10": 18.0
              },
              {
                "20": 34.0
              }
            ]
          },
          {
            "id": "29",
            "name": "Cereal P",
            "description": "",
            "reference": "x29",
            "image": "/assets/img/slice-cereal-small.jpg",
            "prices": [
              {
                "1": 1.8
              },
              {
                "10": 17.0
              },
              {
                "20": 32.0
              }
            ]
          }
        ]
      },

      {
        "_id": "57fa76ec16e5646c2329d44f",
        "name": "Couques",
        "description": "",
        "products": [
          {
            "id": "11",
            "name": "Croissant",
            "description": "",
            "reference": "x11",
            "image": "/assets/img/croissant.jpg",
            "prices": [
              {
                "1": 0.65
              },
              {
                "10": 5.0
              },
              {
                "20": 11.0
              }
            ]
          },
          {
            "id": "12",
            "name": "Chocolat",
            "description": "",
            "reference": "x12",
            "image": "/assets/img/pain-chocolat.jpg",
            "prices": [
              {
                "1": 0.65
              },
              {
                "10": 5.0
              },
              {
                "20": 11.0
              }
            ]
          },
          {
            "id": "13",
            "name": "Raisin",
            "description": "",
            "reference": "x13",
            "image": "/assets/img/raisin.jpg",
            "prices": [
              {
                "1": 0.65
              },
              {
                "10": 5.0
              },
              {
                "20": 11.0
              }
            ]
          },
          {
            "id": "14",
            "name": "Suisse rond",
            "description": "",
            "reference": "x14",
            "image": "/assets/img/suisse.jpg",
            "prices": [
              {
                "1": 0.8
              },
              {
                "10": 7.0
              },
              {
                "20": 11.0
              }
            ]
          },
          {
            "id": "15",
            "name": "Suisse long",
            "description": "",
            "reference": "x15",
            "image": "/assets/img/suisse-long.jpg",
            "prices": [
              {
                "1": 0.8
              },
              {
                "10": 7.0
              },
              {
                "20": 11.0
              }
            ]
          },
          {
            "id": "16",
            "name": "Creme",
            "description": "",
            "reference": "x15",
            "image": "/assets/img/couque-creme.jpg",
            "prices": [
              {
                "1": 0.9
              },
              {
                "10": 8.0
              },
              {
                "20": 14.0
              }
            ]
          },
          {
            "id": "17",
            "name": "Gausette",
            "description": "",
            "reference": "x17",
            "image": "/assets/img/gausette.jpg",
            "prices": [
              {
                "1": 1.1
              },
              {
                "10": 10.0
              },
              {
                "20": 18.0
              }
            ]
          }
        ]
      }
    ]
  };
 return data;
}
