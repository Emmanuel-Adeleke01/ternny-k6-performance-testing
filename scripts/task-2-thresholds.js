import http from 'k6/http';
import { sleep, check } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://ternny.com';

export const options = {
  vus: 10,
  duration: '1m',

  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
    checks: ['rate>0.99'],
  },
};

export default function () {

  const authResponse = http.get(`${BASE_URL}/auth`);

  check(authResponse, {
    'Auth status is 200': (r) => r.status === 200,
    'Auth response body is not empty': (r) => r.body && r.body.length > 0,
    'Auth response time is below 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);

    const addTripResponse = http.get(`${BASE_URL}/add-trip`);

  check(addTripResponse, {
    'Add Trip status is 200': (r) => r.status === 200,
    'Add Trip response body is not empty': (r) => r.body && r.body.length > 0,
    'Add Trip response time is below 700ms': (r) => r.timings.duration < 700,
  });

  sleep(1);

  const personaResponse = http.get(`${BASE_URL}/travel-persona`);

check(personaResponse, {
  'Travel Persona status is 200': (r) => r.status === 200,
  'Travel Persona response body is not empty': (r) => r.body && r.body.length > 0,
  'Travel Persona response time is below 500ms': (r) => r.timings.duration < 500,
});

sleep(1);

const planResponse = http.get(`${BASE_URL}/plan`);

check(planResponse, {
  'Plan status is 200': (r) => r.status === 200,
  'Plan response body is not empty': (r) => r.body && r.body.length > 0,
  'Plan response time is below 600ms': (r) => r.timings.duration < 600,
});

sleep(1);

const profileResponse = http.get(`${BASE_URL}/profile`);

check(profileResponse, {
  'Profile status is 200': (r) => r.status === 200,
  'Profile response body is not empty': (r) => r.body && r.body.length > 0,
  'Profile response time is below 450ms': (r) => r.timings.duration < 450,
});

sleep(1);
}

  