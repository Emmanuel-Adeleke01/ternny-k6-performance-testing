import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/3.0.1/dist/bundle.js';

const BASE_URL = __ENV.BASE_URL || 'https://ternny.com';

const TRAFFIC_SPLIT = {
  auth: 0.15,
  plan: 0.35,
  addTrip: 0.20,
  persona: 0.15,
  profile: 0.15,
};

export const options = {
  stages: [

    // Stage 1: Gradually ramp up from 0 to 10 VUs
    { duration: '30s', target: 10 },

    // Stage 2: Maintain 10 VUs as the baseline load
    { duration: '1m', target: 10 },

    // Stage 3: Scale the workload from 10 to 50 VUs
    { duration: '30s', target: 50 },

    // Stage 4: Hold the peak load at 50 VUs
    { duration: '2m', target: 50 },

    // Stage 5: Gradually ramp down from 50 to 0 VUs
    { duration: '1m', target: 0 },
  ],

    thresholds: {
    // 95% of requests should complete in under 500ms
    http_req_duration: ['p(95)<500'],

    // Less than 1% of requests should fail
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const random = Math.random();

  if (random < TRAFFIC_SPLIT.auth) {
    // Auth → 15%
    group('Auth', function () {
      const response = http.get(`${BASE_URL}/auth`);

      check(response, {
        'Auth status is 200': (r) => r.status === 200,
        'Auth response body is not empty': (r) =>
          r.body && r.body.length > 0,
      });
    });

    sleep(1);

  } else if (random < TRAFFIC_SPLIT.auth + TRAFFIC_SPLIT.plan) {
    // Plan → 35%
    group('Plan', function () {
      const response = http.get(`${BASE_URL}/plan`);

      check(response, {
        'Plan status is 200': (r) => r.status === 200,
        'Plan response body is not empty': (r) =>
          r.body && r.body.length > 0,
      });
    });

    sleep(1);

  } else if (
    random <
    TRAFFIC_SPLIT.auth +
    TRAFFIC_SPLIT.plan +
    TRAFFIC_SPLIT.addTrip
  ) {
    // Add Trip → 20%
    group('Add Trip', function () {
      const response = http.get(`${BASE_URL}/add-trip`);

      check(response, {
        'Add Trip status is 200': (r) => r.status === 200,
        'Add Trip response body is not empty': (r) =>
          r.body && r.body.length > 0,
      });
    });

    sleep(1);

  } else if (
    random <
    TRAFFIC_SPLIT.auth +
    TRAFFIC_SPLIT.plan +
    TRAFFIC_SPLIT.addTrip +
    TRAFFIC_SPLIT.persona
  ) {
    // Travel Persona → 15%
    group('Travel Persona', function () {
      const response = http.get(`${BASE_URL}/travel-persona`);

      check(response, {
        'Travel Persona status is 200': (r) => r.status === 200,
        'Travel Persona response body is not empty': (r) =>
          r.body && r.body.length > 0,
      });
    });

    sleep(1);

  } else {
    // Profile → 15%
    group('Profile', function () {
      const response = http.get(`${BASE_URL}/profile`);

      check(response, {
        'Profile status is 200': (r) => r.status === 200,
        'Profile response body is not empty': (r) =>
          r.body && r.body.length > 0,
      });
    });

    sleep(1);
  }
}

export function handleSummary(data) {
  return {
    'reports/ternny-performance-report.html': htmlReport(data),
  };
}