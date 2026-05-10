# PwaWebAppManifest [rule] v1.0.0
Every Progressive Web App must link a manifest.json in <head> with all required fields (name, icons, start_url, display) — omitting any field silently blocks the browser install prompt.
>     A PWA manifest requires ALL of the following or the install prompt will not appear:
    - name: full app name displayed in install dialogs
    - short_name: ≤12 characters, shown under the home screen icon
    - icons: array containing at minimum { src, sizes: "192x192", type: "image/png" } and { src, sizes: "512x512", type: "image/png" }
    - start_url: typically "/" or the entry point URL
    - display: "standalone" | "fullscreen" | "minimal-ui" (NOT "browser")
    - theme_color: status bar tint on Android (must match <meta name="theme-color">)
    - background_color: splash screen background while app loads

    Link in HTML: <link rel="manifest" href="/manifest.json">
  
domain: frontend-design

## Applies To
Any web app intended to be installable as a PWA (Progressive Web App).

## Counter Example
A manifest that has name and icons but omits start_url — Lighthouse reports 'Manifest does not have a start_url' and the install banner never appears.

## Examples
-       // manifest.json — minimal complete manifest
      {
        "name": "MyApp — Full Name",
        "short_name": "MyApp",
        "start_url": "/",
        "display": "standalone",
        "theme_color": "#5e6ad2",
        "background_color": "#ffffff",
        "icons": [
          { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
          { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
          { "src": "/icons/icon-512-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
        ]
      }
    

## Rationale
Missing manifest fields silently prevent the browser install prompt with no error in the console. Incomplete manifests are the most common PWA installability failure found in Lighthouse PWA audits. The manifest must be complete before the service worker is even evaluated for installability.

## Applies To
Any web app intended to be installable as a PWA (Progressive Web App).

## Counter Example
A manifest that has name and icons but omits start_url — Lighthouse reports 'Manifest does not have a start_url' and the install banner never appears.
