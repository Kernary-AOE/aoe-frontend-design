# PwaDisplayModeTaxonomy [fact] v1.0.0
The web app manifest display property has four values — fullscreen, standalone, minimal-ui, and browser — each trading browser chrome for app-like immersion; standalone is the standard choice for installable PWAs.
>     Web App Manifest display mode values, ordered from most to least app-like:

    | Value        | Browser chrome | Use case                                                      |
    |--------------|----------------|---------------------------------------------------------------|
    | fullscreen   | None           | Games, media players requiring edge-to-edge canvas            |
    | standalone   | None           | Standard installed PWA — feels native, no URL bar             |
    | minimal-ui   | Back + refresh | Light-touch install; users keep minimal navigation controls   |
    | browser      | Full chrome    | No install feel; indistinguishable from a regular tab         |

    fallback chain: if the browser does not support the declared value it falls back one step toward browser.
    Recommendation: use standalone for most PWAs; only use fullscreen for immersive-media products.
  
domain: frontend-design
