const rateLimitMap = new Map();

export function rateLimiter({
  windowMs = 60_000,
  max = 5,
} = {}) {
  return (ip: any) => {
    const now = Date.now();

    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, []);
    }

    const timestamps = rateLimitMap
      .get(ip)
      .filter(t => now - t < windowMs);

    if (timestamps.length >= max) {
      return false; // blocked
    }

    timestamps.push(now);
    rateLimitMap.set(ip, timestamps);
    return true; // allowed
  };
}
