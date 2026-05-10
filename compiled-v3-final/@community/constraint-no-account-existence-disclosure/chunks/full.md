# NoAccountExistenceDisclosure [constraint] v1.0.0
Auth error messages must never reveal whether a given email or username exists in the system — use a single neutral message regardless of the failure reason.
domain: frontend-design

## Severity
critical

## Required Message
We couldn't sign you in. Check your email and password and try again.

## Forbidden Messages
- 'No account found with this email' — discloses existence
- 'Incorrect password' — implies account exists
- 'This email is already registered' on signup — reveals existence
- 'We sent a reset link if this email is registered' — leaks absence

## Correct Patterns
- Login failure (any reason): 'Email or password is incorrect'
- Password reset: 'If an account exists for this email, we sent a reset link'
- Signup with existing email: 'An account with this email may already exist — try signing in'
