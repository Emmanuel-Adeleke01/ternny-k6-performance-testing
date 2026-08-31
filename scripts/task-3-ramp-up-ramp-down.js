import http from 'k6/http';
import { sleep, check } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://ternny.com';

export const options = {
  stages: [

    // Stage 1: Gradually increase from 0 to 10 VUs
    { duration: '30s', target: 10 },

    // Stage 2: Maintain 10 VUs to establish baseline performance
    { duration: '1m', target: 10 },

    // Stage 3: Increase from 10 to 50 VUs
    { duration: '30s', target: 50 },

    // Stage 4: Maintain peak load at 50 VUs
    { duration: '2m', target: 50 },

    // Stage 5: Gradually reduce the load back to 0 VUs
    { duration: '1m', target: 0 },
  ],

  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {

  const authResponse = http.get(`${BASE_URL}/auth`);

  check(authResponse, {
    'Auth status is 200': (r) => r.status === 200,
  });

  sleep(1);

  const addTripResponse = http.get(`${BASE_URL}/add-trip`);

  check(addTripResponse, {
    'Add Trip status is 200': (r) => r.status === 200,
  });

  sleep(1);

  const personaResponse = http.get(`${BASE_URL}/travel-persona`);

  check(personaResponse, {
    'Travel Persona status is 200': (r) => r.status === 200,
  });

  sleep(1);

  const planResponse = http.get(`${BASE_URL}/plan`);

  check(planResponse, {
    'Plan status is 200': (r) => r.status === 200,
  });

  sleep(1);

  const profileResponse = http.get(`${BASE_URL}/profile`);

  check(profileResponse, {
    'Profile status is 200': (r) => r.status === 200,
  });

  sleep(1);
}