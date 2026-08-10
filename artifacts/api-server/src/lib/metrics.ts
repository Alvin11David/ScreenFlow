const LATENCY_BUCKETS_MS = [
  5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000, Infinity,
];

const startTime = Date.now();

const counters = {
  totalRequests: 0,
  status2xx: 0,
  status4xx: 0,
  status5xx: 0,
  errorCount: 0,
  latencySumMs: 0,
  latencySamples: 0,
  latencyHistogram: new Array<number>(LATENCY_BUCKETS_MS.length).fill(0),
};

export function recordRequest({
  statusCode,
  durationMs,
}: {
  statusCode: number;
  durationMs: number;
}) {
  counters.totalRequests += 1;
  counters.latencySumMs += durationMs;
  counters.latencySamples += 1;

  if (statusCode >= 500) {
    counters.status5xx += 1;
    counters.errorCount += 1;
  } else if (statusCode >= 400) {
    counters.status4xx += 1;
  } else {
    counters.status2xx += 1;
  }

  const bucket = LATENCY_BUCKETS_MS.findIndex((b) => durationMs <= b);
  counters.latencyHistogram[
    bucket === -1 ? LATENCY_BUCKETS_MS.length - 1 : bucket
  ] += 1;
}

export function recordError() {
  counters.errorCount += 1;
}

export function snapshotMetrics() {
  const total = counters.totalRequests;
  const errorRate = total === 0 ? 0 : counters.status5xx / total;

  return {
    uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
    requestsTotal: total,
    requestsPerMinute:
      total === 0
        ? 0
        : (total / ((Date.now() - startTime) / 1000 / 60)).toFixed(2),
    errorRate: Number(errorRate.toFixed(4)),
    avgLatencyMs:
      counters.latencySamples === 0
        ? 0
        : Math.round(counters.latencySumMs / counters.latencySamples),
    p95LatencyMs: percentile(LATENCY_BUCKETS_MS, counters.latencyHistogram, 0.95),
    p99LatencyMs: percentile(LATENCY_BUCKETS_MS, counters.latencyHistogram, 0.99),
    memoryMb: Number(
      ((process.memoryUsage().heapUsed + process.memoryUsage().rss) / 1024 / 1024).toFixed(1),
    ),
  };
}

export function percentile(
  buckets: number[],
  counts: number[],
  p: number,
): number {
  const total = counts.reduce((a, b) => a + b, 0);
  if (total === 0) return 0;
  const target = total * p;
  let cumulative = 0;
  for (let i = 0; i < counts.length; i++) {
    cumulative += counts[i];
    if (cumulative >= target) return buckets[i];
  }
  return buckets[buckets.length - 1];
}
