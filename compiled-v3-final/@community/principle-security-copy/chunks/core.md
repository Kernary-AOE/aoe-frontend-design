# SecurityCopy [principle] v1.0.0
Security-related UI copy must be specific about the risk, actionable about what to do, and honest — neither alarming nor falsely reassuring.
> Security messaging in UI must satisfy three criteria: (1) Specific — name exactly what is at risk ('your password' not 'your account'); (2) Actionable — tell the user exactly what to do right now ('Click the link in your email to reset your password'); (3) Honest — acknowledge uncertainty where it exists and avoid promises that cannot be kept ('We cannot guarantee recovery if you lose access to your email').
domain: frontend-design

## Implications
- Never use: 'An issue has been detected with your account.' → Too vague.
- Use: 'Someone signed in to your account from a new device in Tokyo. Was this you?'
- Never use: 'For your security, this session will expire.' → No actionable path.
- Use: 'Your session expires in 5 minutes. Save your work or stay logged in.'
- Never promise absolute security. Say 'encrypted' not 'unhackable'; 'we use industry-standard security' not 'completely secure'.

## Applies To
- Breach / anomaly detection notifications
- Session expiry warnings
- Two-factor authentication prompts
- Permission request explanations
- Data deletion confirmation dialogs
- Privacy setting descriptions
