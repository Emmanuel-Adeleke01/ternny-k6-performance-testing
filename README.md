**# Ternny K6 Performance Testing Assessment**

Performance and load testing assessment for the Ternny travel application using **\*\*Grafana k6\*\***.

**## Project Overview**

This project evaluates the performance, reliability, and behaviour of selected Ternny application endpoints under different traffic conditions.

The assessment covers:

\- Smoke testing

\- Threshold validation

\- Ramp-up and ramp-down load testing

\- Spike testing

\- User-journey and traffic-distribution testing

\- Integrated production-style performance testing

\- HTML performance reporting

**## Application Under Test**

**\*\*Application:\*\*** Ternny Travel App

**\*\*Base URL:\*\***

`https\://ternny.com`

**### Endpoints Tested**

\| Endpoint | Function | Criticality |

\|---|---|---|

\| `/auth` | Login / Registration | Critical |

\| `/add-trip` | Create and save a trip | Critical |

\| `/travel-persona` | Configure travel preferences | High |

\| `/plan` | Trip planning and itinerary management | High |

\| `/profile` | View and update user profile | Medium |

**## Tools & Technologies**

\- **\*\*Grafana k6\*\*** — Performance and load testing

\- **\*\*JavaScript\*\*** — k6 test scripting

\- **\*\*k6 Reporter\*\*** — HTML test reports

\- **\*\*Git/GitHub\*\*** — Version control and project submission

\- **\*\*VS Code\*\*** — Test development

**---**

**# Test Scenarios**

**## Task 1 — Smoke Test**

A lightweight performance smoke test was executed against all five endpoints to verify that the application endpoints were reachable and returning successful responses before heavier workloads were introduced.

**### Result**

\- Total requests: **\*\*25\*\***

\- Failed requests: **\*\*0\*\***

\- Checks passed: **\*\*50\*\***

\- Checks failed: **\*\*0\*\***

\- HTTP failure rate: **\*\*0.00%\*\***

**\*\*Result: PASS\*\***

**---**

**## Task 2 — Thresholds & Checks**

A threshold test was executed using:

\- **\*\*10 Virtual Users\*\***

\- **\*\*1 minute duration\*\***

**### Thresholds**

```javascript

http_req_duration: ['p(95)<500']

http_req_failed: ['rate<0.01']

checks: ['rate>0.99']
```

### Results

\| Metric | Result | Verdict |

\|---|---:|---|

\| Total Requests | 450 | — |

\| Failed Requests | 0 | PASS |

\| P95 Response Time | 457 ms | PASS |

\| Checks | 99.40% | PASS |

\| HTTP Failure Rate | 0.00% | PASS |

\*\*Result: PASS\*\*

All configured thresholds were successfully met.

\---

# Task 3 — Ramp-Up & Ramp-Down

The required five-stage load profile was implemented using k6 stages.

\| Stage | Duration | Target VUs |

\|---|---:|---:|

\| Ramp-Up | 30s | 10 |

\| Steady Baseline | 1m | 10 |

\| Scale-Up | 30s | 50 |

\| Peak Load | 2m | 50 |

\| Ramp-Down | 1m | 0 |

### Results

\| Metric | Result |

\|---|---:|

\| Total Requests | 6,895 |

\| Failed Requests | 0 |

\| Checks Passed | 6,895 / 6,895 |

\| Checks Failed | 0 |

\| HTTP Failure Rate | 0.00% |

\| P95 Response Time | 545.84 ms |

\| Maximum VUs | 50 |

### Threshold Evaluation

\*\*Target:\*\* P95 < 500 ms

\*\*Actual:\*\* 545.84 ms

\*\*Result: P95 THRESHOLD BREACHED\*\*

Although the response-time threshold was breached, the HTTP failure rate remained at \*\*0.00%\*\* and all checks passed.

This indicates increased latency under the higher sustained workload rather than a general availability failure.

\---

# Task 3 Bonus — Spike Test

The spike test simulated sudden traffic increases, such as a travel deal being shared widely on social media.

\| Stage | Duration | Target VUs |

\|---|---:|---:|

\| Baseline | 30s | 5 |

\| Spike | 10s | 150 |

\| Spike Hold | 2m | 150 |

\| Recovery | 10s | 5 |

\| Baseline | 2m | 5 |

\| Ramp-Down | 30s | 0 |

### Results

\| Metric | Result |

\|---|---:|---:|

\| Total Requests | 14,773 |

\| Failed Requests | 1 |

\| P95 Response Time | 665.47 ms |

\| Maximum VUs | 150 |

\| HTTP Failure Rate | ~0.0068% |

One request timed out during the spike test.

### Threshold Evaluation

\*\*P95 Target:\*\* <500 ms

\*\*Actual:\*\* 665.47 ms

\*\*Result: P95 THRESHOLD BREACHED\*\*

The observed HTTP failure rate remained below the 1% threshold.

\*\*Overall Spike Result: PERFORMANCE DEGRADED UNDER SPIKE LOAD\*\*

The test demonstrated that sudden high concurrency can increase response latency and cause isolated request failures.

\---

# Task 4 — User Journeys & Traffic Distribution

The user-journey test modelled realistic traffic distribution across the five application endpoints using `Math.random()`.

### Expected Traffic Distribution

\| Endpoint | Expected Traffic |

\|---|---:|

\| `/auth` | 15% |

\| `/plan` | 35% |

\| `/add-trip` | 20% |

\| `/travel-persona` | 15% |

\| `/profile` | 15% |

### Observed Traffic Distribution

\| Group | Expected | Observed |

\|---|---:|---:|

\| Auth | 15% | 13.74% |

\| Plan | 35% | 32.88% |

\| Add Trip | 20% | 22.97% |

\| Travel Persona | 15% | 15.77% |

\| Profile | 15% | 14.64% |

The observed distribution was reasonably close to the intended probabilistic distribution.

Because `Math.random()` is probabilistic, exact percentages are not expected during every test run, particularly with a relatively small sample size.

### Results

\| Metric | Result |

\|---|---:|

\| Total Requests | 444 |

\| Failed Requests | 0 |

\| Failed Checks | 0 |

\| Breached Thresholds | 0 |

\*\*Result: PASS\*\*

\---

# Task 5 — Integrated Production Performance Test

The final production-style performance test combined the major requirements from the previous tasks.

The final script includes:

\- Five-stage load profile

\- Performance thresholds

\- User-journey groups

\- Traffic distribution

\- Response checks

\- `sleep(1)`

\- Environment-based `BASE_URL`

\- HTML report generation

## Load Profile

```text

0 → 10 VUs

10 VUs steady

10 → 50 VUs

50 VUs peak

50 → 0 VUs
```

## Final Results

Metric

Result

Total Requests

7,060

Failed Requests

0

HTTP Failure Rate

0.00%

Checks Passed

14,120

Checks Failed

0

Breached Thresholds

0

Maximum VUs

50

Request Rate

23.46 req/s

Average Response Time

298.36 ms

Median Response Time

281.24 ms

P90 Response Time

345.70 ms

P95 Response Time

380.84 ms

Maximum Response Time

3,574.75 ms

Final Threshold Evaluation

Threshold

Target

Actual

Verdict

Response Time

P95 < 500 ms

380.84 ms

PASS

Error Rate

< 1%

0.00%

PASS

Final Verdict

PASS

The final integrated test successfully satisfied both primary configured performance thresholds.

Overall Performance Summary

Test

Requests

Failed

P95

Result

Task 1 — Smoke

25

0

Not captured

PASS

Task 2 — Thresholds

450

0

457 ms

PASS

Task 3 — Ramp/Ramp-down

6,895

0

545.84 ms

P95 Breached

Task 3 — Spike

14,773

1

665.47 ms

Performance Degraded

Task 4 — User Journey

444

0

550.51 ms

Completed Successfully

Task 5 — Integrated

7,060

0

380.84 ms

PASS

Key Findings

1\. Final performance target was achieved

The final integrated test achieved a P95 response time of 380.84 ms, which was below the configured 500 ms target.

2\. No request failures occurred during the final integrated test

The final test processed 7,060 requests with:

0 failed requests

0.00% HTTP failure rate

0 failed checks

3\. Higher sustained load increased latency

The Task 3 ramp-up/ramp-down test recorded a P95 of 545.84 ms, exceeding the 500 ms overall threshold.

This indicates increased latency as concurrency approached the 50-VU peak.

4\. Sudden traffic spikes caused greater degradation

The spike test recorded:

P95: 665.47 ms

One request timeout

Maximum load: 150 VUs

This indicates that sudden increases in concurrency can place additional pressure on the application.

5\. Traffic distribution was successfully implemented

The Task 4 test produced traffic percentages reasonably close to the required:

15% / 35% / 20% / 15% / 15%

distribution.

6\. Isolated high-latency requests were observed

The final Task 5 test recorded a maximum response time of 3,574.75 ms, despite the P95 remaining within the required threshold.

Because the configured SLA is based on P95, the isolated maximum did not cause the final P95 threshold to fail.

Recommendations

Investigate the latency increase observed during the 50-VU staged test.

Investigate the isolated timeout recorded during the 150-VU spike test.

Review backend processing, database queries, connection handling, and infrastructure capacity under high concurrency.

Conduct endpoint-level performance testing to determine which endpoint contributes most to aggregate latency.

Repeat spike testing after optimisation to confirm whether the observed timeout and latency degradation have been resolved.

Capture endpoint-specific P95/P99 metrics in future tests to provide more granular SLA analysis.

Project Structure

Ternny K6 Assessment/

│

├── scripts/

│   ├── task-1-smoke.js

│   ├── task-2-thresholds.js

│   ├── task-3-ramp-up-ramp-down.js

│   ├── task-3-spike-test.js

│   ├── task-4-user-journey.js

│   └── ternny-performance.js

│

├── reports/

│   ├── task-4-user-journey-report.html

│   └── ternny-performance-report.html

│

└── README.md

How to Run the Tests

Make sure Grafana k6 is installed and available in your terminal.

Task 1 — Smoke Test

k6 run --env BASE_URL=https\://ternny.com scripts/task-1-smoke.js

Task 2 — Threshold Test

k6 run --env BASE_URL=https\://ternny.com scripts/task-2-thresholds.js

Task 3 — Ramp-Up/Ramp-Down

k6 run --env BASE_URL=https\://ternny.com scripts/task-3-ramp-up-ramp-down.js

Task 3 Bonus — Spike Test

k6 run --env BASE_URL=https\://ternny.com scripts/task-3-spike-test.js

Task 4 — User Journey

k6 run --env BASE_URL=https\://ternny.com scripts/task-4-user-journey.js

Task 5 — Final Integrated Test

k6 run --env BASE_URL=https\://ternny.com scripts/ternny-performance.js

HTML Reports

The test scripts generate HTML performance reports using the k6 Reporter.

Task 4 Report

reports/task-4-user-journey-report.html

Task 5 Final Report

reports/ternny-performance-report.html

Assessment Summary

Task

Status

Task 1 — Smoke Test

PASS

Task 2 — Thresholds & Checks

PASS

Task 3 — Ramp-Up/Ramp-Down

P95 Threshold Breached

Task 3 Bonus — Spike Test

Performance Degraded

Task 4 — User Journeys

PASS

Task 5 — Integrated Performance Test

PASS

Overall Final Result

PASS

The final integrated Ternny performance test successfully met the configured overall performance and error-rate thresholds.

The test achieved:

7,060 requests

0 failed requests

0.00% error rate

14,120 passed checks

0 failed checks

380.84 ms P95 response time

50 maximum VUs

The ramp-up and spike tests also identified latency degradation under more aggressive traffic conditions, providing actionable areas for future performance optimisation.

Author

Emmanuel Adeleke

QA / Software Test Engineer

Performance Testing: Grafana k6
