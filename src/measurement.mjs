// Zipspeed measurement helpers.
// Production rule: no synthetic/random network metrics. Unknown/unavailable => null / --.

export function calculateThroughput(bytes, ms) {
  if (typeof bytes !== 'number' || typeof ms !== 'number') return null;
  if (!Number.isFinite(bytes) || !Number.isFinite(ms)) return null;
  if (bytes < 0 || ms <= 0) return null;
  return (bytes * 8) / (ms * 1000);
}

export function calculateMedian(samples) {
  if (!Array.isArray(samples) || samples.length === 0) return null;
  const valid = samples.filter(n => typeof n === 'number' && Number.isFinite(n) && n >= 0);
  if (valid.length === 0) return null;
  const sorted = [...valid].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

// HTTP jitter indicator used by this app: mean absolute difference between adjacent
// successful HTTP-latency samples. This is intentionally not labelled as ICMP jitter.
export function calculateJitter(samples) {
  if (!Array.isArray(samples) || samples.length < 2) return null;
  const valid = samples.filter(n => typeof n === 'number' && Number.isFinite(n) && n >= 0);
  if (valid.length < 2) return null;
  let diffSum = 0;
  for (let i = 1; i < valid.length; i += 1) {
    diffSum += Math.abs(valid[i] - valid[i - 1]);
  }
  return diffSum / (valid.length - 1);
}

export function calculateProbeFailPct(failed, total) {
  if (typeof failed !== 'number' || typeof total !== 'number') return null;
  if (!Number.isFinite(failed) || !Number.isFinite(total)) return null;
  if (total <= 0 || failed < 0 || failed > total) return null;
  return (failed / total) * 100;
}

export function evaluateVideoSuitability(downloadMbps, responseOk) {
  if (!responseOk || typeof downloadMbps !== 'number' || !Number.isFinite(downloadMbps) || downloadMbps < 0) {
    return {
      available: false,
      overall: '--',
      details: {
        '4k': { name: '4K UHD (2160p)', requiredMbps: 25.0, suitable: null, label: '--' },
        '1080p': { name: '1080p Full HD', requiredMbps: 5.0, suitable: null, label: '--' },
        '720p': { name: '720p HD', requiredMbps: 2.5, suitable: null, label: '--' },
        '480p': { name: '480p SD', requiredMbps: 1.0, suitable: null, label: '--' },
      }
    };
  }

  const check = req => downloadMbps >= req;
  const is4k = check(25.0);
  const is1080p = check(5.0);
  const is720p = check(2.5);
  const is480p = check(1.0);

  let overallLabel = '480p SD';
  if (is4k) overallLabel = '4K UHD';
  else if (is1080p) overallLabel = '1080p FHD';
  else if (is720p) overallLabel = '720p HD';
  else if (!is480p) overallLabel = '< 480p';

  return {
    available: true,
    overall: overallLabel,
    measuredDownloadMbps: downloadMbps,
    details: {
      '4k': { name: '4K UHD (2160p)', requiredMbps: 25.0, suitable: is4k, label: is4k ? 'Supported' : 'Insufficient' },
      '1080p': { name: '1080p Full HD', requiredMbps: 5.0, suitable: is1080p, label: is1080p ? 'Supported' : 'Insufficient' },
      '720p': { name: '720p HD', requiredMbps: 2.5, suitable: is720p, label: is720p ? 'Supported' : 'Insufficient' },
      '480p': { name: '480p SD', requiredMbps: 1.0, suitable: is480p, label: is480p ? 'Supported' : 'Insufficient' },
    }
  };
}

// Parses the JSON returned by https://speed.cloudflare.com/meta.
// `colo` is treated as Cloudflare edge/PoP code. City/country are kept as client-area
// metadata and are never relabelled as the server's city.
export function parseCloudflareMetadata(meta) {
  const obj = meta && typeof meta === 'object' ? meta : {};
  const clean = value => {
    if (value === null || value === undefined) return null;
    const text = String(value).trim();
    return text || null;
  };

  const ip = clean(obj.clientIp);
  const asnRaw = clean(obj.asn);
  const asn = asnRaw ? (asnRaw.toUpperCase().startsWith('AS') ? asnRaw.toUpperCase() : `AS${asnRaw}`) : null;
  const org = clean(obj.asOrganization);
  const colo = clean(obj.colo);
  const city = clean(obj.city);
  const country = clean(obj.country);

  return {
    serverName: 'Cloudflare Speed Test',
    serverColo: colo || '--',
    serverLocation: colo ? `Edge colo: ${colo}` : '--',
    clientIp: ip || '--',
    clientAsn: [asn, org].filter(Boolean).join(' • ') || '--',
    clientArea: [city, country].filter(Boolean).join(' • ') || '--',
  };
}

export function isResultEligibleForHistory(result) {
  if (!result || typeof result !== 'object') return false;
  if (!result.completed || result.aborted) return false;
  if (typeof result.down !== 'number' || !Number.isFinite(result.down) || result.down <= 0) return false;
  if (typeof result.up !== 'number' || !Number.isFinite(result.up) || result.up <= 0) return false;
  if (typeof result.ping !== 'number' || !Number.isFinite(result.ping) || result.ping < 0) return false;
  if (typeof result.jitter !== 'number' || !Number.isFinite(result.jitter) || result.jitter < 0) return false;
  if (typeof result.probeFailPct !== 'number' || !Number.isFinite(result.probeFailPct) || result.probeFailPct < 0) return false;
  if (!result.timestamp || Number.isNaN(Date.parse(result.timestamp))) return false;
  return true;
}

export function calculateNeedleAngle(mbps) {
  const v = typeof mbps === 'number' && Number.isFinite(mbps) && mbps > 0 ? mbps : 0;
  const norm = Math.min(1, Math.log1p(v) / Math.log(1001));
  return 145 + (250 * norm);
}
