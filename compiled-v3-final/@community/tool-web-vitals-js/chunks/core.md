# WebVitalsJs [tool] v1.0.0
Google's web-vitals.js library exposes the Core Web Vitals (LCP, INP, CLS) and supplemental metrics (FCP, TTFB) in a small, consistent API. The official measurement implementation that Lighthouse and Chrome User Experience Report (CrUX) use under the hood. Drop into any page and ship metrics to RUM.
domain: performance

signature: (callback: (metric: Metric) => void) -> void

## External
true

## Package
web-vitals@^4

## Output Type
- **Name**: 'LCP' | 'INP' | 'CLS' | 'FCP' | 'TTFB'
- **Value**: number
- **Rating**: 'good' | 'needs-improvement' | 'poor'
- **Delta**: number
- **Id**: string
- **Entries**: PerformanceEntry[]
- **NavigationType**: string

## Usage
```
    // 1) Vanilla — ship metrics on every value change
    import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

    function send(metric) {
      // sendBeacon is preferred — fires reliably on unload
      const body = JSON.stringify(metric);
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/analytics/vitals', body);
      } else {
        fetch('/analytics/vitals', { body, method: 'POST', keepalive: true });
      }
    }

    onCLS(send);
    onINP(send);
    onLCP(send);
    onFCP(send);
    onTTFB(send);

    // 2) Attribution mode — ships the offending element + cause
    import { onLCP } from 'web-vitals/attribution';

    onLCP((metric) => {
      // metric.attribution.element is the LCP element
      // metric.attribution.url is the resource URL
      // metric.attribution.timeToFirstByte breaks down the load
      console.log('LCP element:', metric.attribution.element);
      send(metric);
    });

    // 3) Server-side aggregation
    // Per page-view: send single CLS/INP/LCP per session (use reportAllChanges: false default)
    // Per change: useful for SPAs with route changes
    onCLS(send, { reportAllChanges: true });
  
```
