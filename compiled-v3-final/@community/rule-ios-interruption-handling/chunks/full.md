# IosInterruptionHandling [rule] v1.0.0
> Observe scenePhase changes and save state on background, pause on inactive, and resume cleanly on active — ensuring no user progress is lost across system interruptions.
domain: frontend-design

## Applies To
any iOS app with in-progress work that can be interrupted by system events (calls, Siri, notifications, backgrounding)

## Examples
- scenePhase .background: persist any unsaved form input or recording state to UserDefaults or disk.
- scenePhase .inactive: pause media playback, timers, or active animations.
- scenePhase .active: resume timers; restore UI to the last known state.
- Verify: receive a phone call during active use; app should pause cleanly and restore state when foregrounded.

## Rationale
iOS apps are regularly interrupted by phone calls, Siri invocations, and notifications. Losing user progress or active state on interrupt is unexpected and erodes trust. ScenePhase provides the correct lifecycle hooks for saving and restoring state.

## Applies To
any iOS app with in-progress work that can be interrupted by system events (calls, Siri, notifications, backgrounding)
