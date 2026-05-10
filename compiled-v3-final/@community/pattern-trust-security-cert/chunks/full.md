# TrustSecurityCert [pattern] v1.0.0
Compliance badges (SOC 2, ISO 27001, GDPR, PCI DSS) in a centered flex row at 0.65 opacity with 30% grayscale. Positioned at the bottom of the page where procurement teams look.
domain: frontend-design

## Label
Security Certifications Badge Row

## Problem
Enterprise buyers scan for compliance certifications as a procurement requirement before signing contracts — but these badges distract early visitors who are not yet at the decision stage.

## Solution
A lightly-styled, centered badge row at the bottom of the page with a small all-caps 'Compliance & Security' label. Images at 32px height, 0.65 opacity, grayscale(30%) — present and credible but not visually dominant.

## Structure
```
    .cert-badge-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1.5rem;
      justify-content: center;
      opacity: 0.65;
    }

    .cert-badge-row img {
      height: 32px;
      width: auto;
      filter: grayscale(30%);
    }

    .cert-label {
      font-size: 0.6875rem;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: hsl(var(--muted-foreground));
      margin-bottom: 0.75rem;
    }

    <!-- HTML -->
    <div class="cert-section">
      <p class="cert-label">Compliance & Security</p>
      <div class="cert-badge-row" role="list" aria-label="Security certifications">
        <img src="/certs/soc2.svg" alt="SOC 2 Type II certified" role="listitem" />
        <img src="/certs/iso27001.svg" alt="ISO 27001 certified" role="listitem" />
        <img src="/certs/gdpr.svg" alt="GDPR compliant" role="listitem" />
        <img src="/certs/pci-dss.svg" alt="PCI DSS compliant" role="listitem" />
      </div>
    </div>
  
```

## Label
Security Certifications Badge Row

## Problem
Enterprise buyers scan for compliance certifications as a procurement requirement before signing contracts — but these badges distract early visitors who are not yet at the decision stage.

## Solution
A lightly-styled, centered badge row at the bottom of the page with a small all-caps 'Compliance & Security' label. Images at 32px height, 0.65 opacity, grayscale(30%) — present and credible but not visually dominant.

## Structure
```
    .cert-badge-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1.5rem;
      justify-content: center;
      opacity: 0.65;
    }

    .cert-badge-row img {
      height: 32px;
      width: auto;
      filter: grayscale(30%);
    }

    .cert-label {
      font-size: 0.6875rem;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: hsl(var(--muted-foreground));
      margin-bottom: 0.75rem;
    }

    <!-- HTML -->
    <div class="cert-section">
      <p class="cert-label">Compliance & Security</p>
      <div class="cert-badge-row" role="list" aria-label="Security certifications">
        <img src="/certs/soc2.svg" alt="SOC 2 Type II certified" role="listitem" />
        <img src="/certs/iso27001.svg" alt="ISO 27001 certified" role="listitem" />
        <img src="/certs/gdpr.svg" alt="GDPR compliant" role="listitem" />
        <img src="/certs/pci-dss.svg" alt="PCI DSS compliant" role="listitem" />
      </div>
    </div>
  
```
