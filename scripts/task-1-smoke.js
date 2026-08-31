import http from 'k6/http';
import { sleep, check } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://ternny.com';

export const options = {
  vus: 1,
  duration: '30s',
};

export default function () {

  // 1. Authentication
  const authResponse = http.get(`${BASE_URL}/auth`);

  check(authResponse, {
    'Auth status is 200': (r) => r.status === 200,
    'Auth response body is not empty': (r) => r.body && r.body.length > 0,
  });

  sleep(1);

  // 2. Add Trip
  const addTripResponse = http.get(`${BASE_URL}/add-trip`);

  check(addTripResponse, {
    'Add Trip status is 200': (r) => r.status === 200,
    'Add Trip response body is not empty': (r) => r.body && r.body.length > 0,
  });

  sleep(1);

  // 3. Travel Persona
  const personaResponse = http.get(`${BASE_URL}/travel-persona`);

  check(personaResponse, {
    'Travel Persona status is 200': (r) => r.status === 200,
    'Travel Persona response body is not empty': (r) => r.body && r.body.length > 0,
  });

  sleep(1);

  // 4. Plan
  const planResponse = http.get(`${BASE_URL}/plan`);

  check(planResponse, {
    'Plan status is 200': (r) => r.status === 200,
    'Plan response body is not empty': (r) => r.body && r.body.length > 0,
  });

  sleep(1);

  // 5. Profile
  const profileResponse = http.get(`${BASE_URL}/profile`);

  check(profileResponse, {
    'Profile status is 200': (r) => r.status === 200,
    'Profile response body is not empty': (r) => r.body && r.body.length > 0,
  });

  sleep(1);
}