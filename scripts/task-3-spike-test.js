import http from 'k6/http';
import { sleep, check } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://ternny.com';

export const options = {
  stages: [

    // Stage 1: Establish a normal baseline with 5 VUs
    { duration: '30s', target: 5 },

    // Stage 2: Sudden spike from 5 to 150 VUs
    { duration: '10s', target: 150 },

    // Stage 3: Hold the spike at 150 VUs
    { duration: '2m', target: 150 },

    // Stage 4: Quickly recover from 150 back to 5 VUs
    { duration: '10s', target: 5 },

    // Stage 5: Maintain the recovered baseline at 5 VUs
    { duration: '2m', target: 5 },

    // Stage 6: Gradually ramp down from 5 to 0 VUs
    { duration: '30s', target: 0 },
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