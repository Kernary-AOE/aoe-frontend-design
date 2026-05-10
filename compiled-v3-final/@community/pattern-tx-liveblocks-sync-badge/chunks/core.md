# TxLiveblocksSyncBadge [pattern] v1.0.0
Liveblocks connection-status pill pattern (Apache-2.0): React component writes useStatus() string to data-status attribute; CSS [data-status='connected'] selectors drive all state styling — color, pulsing ::before ping animation — with zero JS for transitions. Adding a new status is one CSS rule.
domain: frontend-design

## Code
```
    // Status.tsx — React only sets data-status; CSS handles all state display
    export function Status() {
      const status = useStatus();
      return (
        <div className={styles.status} data-status={status}>
          <div className={styles.statusCircle} />
          <div className={styles.statusText}>{status}</div>
        </div>
      );
    }

    /* Status.module.css — entire state machine in CSS */
    .status[data-status="connected"]    { --status-block: #22c55e; }
    .status[data-status="connecting"],
    .status[data-status="reconnecting"] { --status-block: #eab308; }
    .status[data-status="disconnected"] { --status-block: #ef4444; }

    .statusCircle { background: var(--status-block); width: 8px; height: 8px; border-radius: 9999px; }
    .statusCircle::before {
      /* Ping animation: scale to 2× and fade to 0 over 1.5s */
      content: ""; position: absolute; inset: -1px;
      background: var(--status-block); border-radius: 9999px;
      animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
      opacity: 0.4;
    }

    @keyframes ping { 75%, to { transform: scale(2); opacity: 0; } }
  
```

## How To Adapt
- Replace useStatus() with any connection hook — the CSS doesn't care about the source.
- Same pattern for CI build state, deploy state, server health — any status pill.
- [data-status^='failing'] attribute prefix matching enables family selectors for related states.
- For urgent states (disconnected, error): shorten ping to 1s with higher peak opacity.
- For terminal states (archived, disabled): remove the pulse — a static dot communicates 'settled'.

## Gotchas
- user-select: none on root prevents accidental text selection when double-clicking near the pill.
- Ping ::before scales to 2× = 20px effective footprint from an 8px circle — ensure surrounding padding prevents clip.
- capitalize on status text assumes lowercase API strings — mixed-case status like 'reConnecting' renders as 'ReConnecting'.
