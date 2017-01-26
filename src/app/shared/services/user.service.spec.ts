import {async, inject, TestBed} from '@angular/core/testing';
import {BaseRequestOptions, Http, HttpModule, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

import {UserService} from './user.service';


describe('UserService (Mocked)', () => {

  const mockLoginRequest =
  {
    "password": "Adam24092001",
    "email": "abbas.salem.water@gmail.com"
  };

  const mockCreateUserRequest =
  {
    "_id": "57fa270b19ebd6787e1e742f",
    "firstname": "abbas",
    "lastname": "salem",
    "password": "Adam24092001",
    "email": "abbas.salem.water@gmail.com",
    "tel": "0032473321212",
    "active": true,
    "trusted": true,
    "rank": 1,
    "roles": [
      "admin"
    ]
  };

  const mockSavedUserResponse = {
    success: true,
    message: 'User successfully saved.',
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      imports: [
        HttpModule
      ]
    });
  });

  /* testing functions*/

  it('should construct', async(inject([UserService], (service) => {
    expect(service).toBeDefined();
  })));

  it('should construct', async(inject([UserService, MockBackend], (service, mockBackend) => {
    expect(service).toBeDefined();
  })));

  // it('should return null when email not specified',
  //   async(inject([UserService, MockBackend], (service, mockBackend) => {
  //
  //     mockBackend.connections.subscribe(conn => {
  //       throw new Error('No requests should be made.');
  //     });
  //     const result = service.getUser(null);
  //     expect(result).toBeNull();
  //   })));

  it('should save the user', async(inject(
    [UserService, MockBackend], (service, mockBackend) => {

      mockBackend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({body: mockSavedUserResponse})));
      });

      const result = service.saveUser(mockCreateUserRequest);
      result.subscribe(res => {
        expect(res).toEqual(mockSavedUserResponse);
      });
    })));

  // it('should parse response from endpoint', async(inject(
  //   [UserService, MockBackend], (service, mockBackend) => {
  //
  //     mockBackend.connections.subscribe(conn => {
  //       conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockUserResponse) })));
  //     });
  //
  //     const result = service.get(mockUserRequest.email,mockUserRequest.password);
  //     result.subscribe(res => {
  //       expect(res).toEqual(mockUserResponse);
  //     });
  //   })));

  // it('should not make duplicate requests for the same symbol', async(inject(
  //   [UserService, MockBackend], (service, mockBackend) => {
  //
  //     let requestInvocationCount = 0;
  //
  //     mockBackend.connections.subscribe(conn => {
  //       conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
  //
  //       requestInvocationCount++;
  //     });
  //
  //     const result = service.fetch(mockQuote.symbol);
  //
  //     result.subscribe(res => { });
  //     result.subscribe(res => { });
  //
  //     expect(requestInvocationCount).toBe(1);
  //   })));
// });
});
