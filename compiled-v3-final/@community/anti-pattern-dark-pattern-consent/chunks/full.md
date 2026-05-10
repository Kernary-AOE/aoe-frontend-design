# DarkPatternConsent [anti-pattern] v1.0.0
UI patterns that nudge, manipulate, or coerce users into agreeing to data processing they would not freely choose — pre-checked boxes, asymmetric button prominence, multi-step opt-out journeys, dark-side defaults. Illegal under GDPR Art. 4(11) (consent must be 'freely given') and explicitly enumerated in the EU Digital Services Act and EDPB Guidelines 03/2022.
domain: legal-compliance

## Label
Dark Pattern Consent UI

## Why Bad
Consent is the legal basis the business is relying on; if the consent is not 'freely given, specific, informed, and unambiguous' (GDPR Art. 4(11)), it is invalid and the business has no lawful basis for processing. Penalties scale with global turnover (up to 4% under GDPR; up to 6% under DSA). Beyond fines: the EDPB explicitly listed 15 categorised dark-pattern variants in March 2022, the FTC issued enforcement statements (2022) and a report on 'Bringing Dark Patterns to Light' (Sept 2022), and California's CPRA (2023) explicitly invalidates consent obtained through dark patterns. The pattern is also a trust failure: users learn that the brand will manipulate them, and trust is the most expensive thing to rebuild.

## Instead Do
Apply the symmetry principle: 'Reject all' must be as easy and as prominent as 'Accept all'. No pre-checked boxes anywhere. Default to the privacy-preserving choice. Use neutral copy ('Allow analytics?' not 'Help us improve!'). Every option must be reachable in the same number of clicks. Run user testing with task: 'reject all non-essential cookies' — measure success rate; if < 95%, the UI is not free consent. Use the EDPB Guidelines 03/2022 dark-pattern taxonomy as a checklist.

## Structure
```
    # WRONG — pre-checked boxes
    ☑ Analytics cookies
    ☑ Advertising cookies        # invalid by Planet49 (CJEU C-673/17, 2019)
    [ Save preferences ]

    # WRONG — asymmetric prominence
    [  Accept all  (large green button)  ]   [ Manage preferences (small grey text link) ]
    # CNIL fined Google €150M and Facebook €60M (Jan 2022) for this exact pattern.

    # WRONG — multi-step opt-out
    Step 1: 'Manage preferences'
    Step 2: 'Show vendors'  → list of 800 vendors, each with 'object'
    Step 3: 'Confirm' (each vendor individually)
    # vs single-click 'Accept all' — illegal asymmetry.

    # WRONG — privacy-zuckering
    [  Continue with Google  ]              # implicitly grants email + profile
    Small print: 'By continuing, you agree to share your email and profile.'

    # WRONG — confirmshaming
    [  Yes, I want to save money  ]
    [  No, I prefer to pay full price  ]    # emotion manipulation, not consent

    # CORRECT — symmetric, neutral
    [  Accept all  ]   [  Reject all  ]   [ Customize ]
    # Same size, same color weight, same row.
    # No category pre-checked in customize.

    # CORRECT — minimisation-first
    Banner only appears if non-essential cookies are actually used.
    Plausible Analytics or server-side aggregation = no banner needed.
  
```

## Label
Dark Pattern Consent UI

## Why Bad
Consent is the legal basis the business is relying on; if the consent is not 'freely given, specific, informed, and unambiguous' (GDPR Art. 4(11)), it is invalid and the business has no lawful basis for processing. Penalties scale with global turnover (up to 4% under GDPR; up to 6% under DSA). Beyond fines: the EDPB explicitly listed 15 categorised dark-pattern variants in March 2022, the FTC issued enforcement statements (2022) and a report on 'Bringing Dark Patterns to Light' (Sept 2022), and California's CPRA (2023) explicitly invalidates consent obtained through dark patterns. The pattern is also a trust failure: users learn that the brand will manipulate them, and trust is the most expensive thing to rebuild.

## Instead Do
Apply the symmetry principle: 'Reject all' must be as easy and as prominent as 'Accept all'. No pre-checked boxes anywhere. Default to the privacy-preserving choice. Use neutral copy ('Allow analytics?' not 'Help us improve!'). Every option must be reachable in the same number of clicks. Run user testing with task: 'reject all non-essential cookies' — measure success rate; if < 95%, the UI is not free consent. Use the EDPB Guidelines 03/2022 dark-pattern taxonomy as a checklist.

## Structure
```
    # WRONG — pre-checked boxes
    ☑ Analytics cookies
    ☑ Advertising cookies        # invalid by Planet49 (CJEU C-673/17, 2019)
    [ Save preferences ]

    # WRONG — asymmetric prominence
    [  Accept all  (large green button)  ]   [ Manage preferences (small grey text link) ]
    # CNIL fined Google €150M and Facebook €60M (Jan 2022) for this exact pattern.

    # WRONG — multi-step opt-out
    Step 1: 'Manage preferences'
    Step 2: 'Show vendors'  → list of 800 vendors, each with 'object'
    Step 3: 'Confirm' (each vendor individually)
    # vs single-click 'Accept all' — illegal asymmetry.

    # WRONG — privacy-zuckering
    [  Continue with Google  ]              # implicitly grants email + profile
    Small print: 'By continuing, you agree to share your email and profile.'

    # WRONG — confirmshaming
    [  Yes, I want to save money  ]
    [  No, I prefer to pay full price  ]    # emotion manipulation, not consent

    # CORRECT — symmetric, neutral
    [  Accept all  ]   [  Reject all  ]   [ Customize ]
    # Same size, same color weight, same row.
    # No category pre-checked in customize.

    # CORRECT — minimisation-first
    Banner only appears if non-essential cookies are actually used.
    Plausible Analytics or server-side aggregation = no banner needed.
  
```

## Derived From
@community/rule-cookie-consent-banner
