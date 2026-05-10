# PwaInstallabilityCriteria [fact] v1.0.0
A browser install prompt appears only when all four installability criteria are simultaneously met: served over HTTPS, has a registered service worker with a fetch handler, has a manifest with name/icons/start_url/display, and is not already installed.
>     PWA install prompt (beforeinstallprompt / Chrome install button) fires only when ALL four are true:
    1. HTTPS (or localhost for development) — plain HTTP never triggers the prompt.
    2. Service worker registered and active with a fetch event handler — empty SW is insufficient.
    3. Web app manifest linked in <head> with required fields:
       - name (or short_name)
       - icons: at least one 192×192px and one 512×512px PNG/WebP
       - start_url
       - display: "standalone" | "fullscreen" | "minimal-ui"
    4. The app is not already installed on the device.

    Failing any single criterion silently prevents the prompt — no error is thrown.
    Lighthouse PWA audit reports each criterion independently.
  
domain: frontend-design
