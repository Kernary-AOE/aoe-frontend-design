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
