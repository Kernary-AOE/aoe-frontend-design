# TrustingClientValidation [anti-pattern] v1.0.0
Relying on browser-side validation (HTML5 required/pattern attributes, JavaScript form checks) as the security boundary, with no equivalent validation on the server — trivially bypassed with curl, Postman, or DevTools.
domain: security

## Label
Validating Only on the Client (Browser), Not the Server

## Why Bad
Client-side validation is a UX feature, not a security control. Any user can: (1) open DevTools and delete the required attribute, (2) send a raw HTTP request with curl bypassing the browser entirely, (3) modify the request in a proxy (Burp Suite). The server must treat every incoming request as potentially crafted by a malicious actor who has never loaded your HTML. Client validation provides zero security assurance.

## Instead Do
Validate and sanitize ALL inputs on the server, every time, on every endpoint — even for inputs that 'could only come from your own UI'. Client-side validation is additive for UX only: fast feedback, reduced roundtrips. The server is the authoritative validation boundary.

## Trap
Believing that your SPA is 'internal-only' or that attackers 'can't find the API'. Security through obscurity is not security — API endpoints are discoverable from browser network traffic in seconds.

## Structure
```
    # WRONG — validation only in React component (browser)
    function SubmitForm() {
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.includes('@')) { setError('Invalid email'); return; }
        // Sends to /api/register — server does NO validation
        fetch('/api/register', { method: 'POST', body: JSON.stringify({ email, age }) });
      };
    }
    // curl -X POST https://app.com/api/register -d '{"email":"not-an-email","age":-999}'
    // ^ bypasses browser entirely — server accepts garbage

    # CORRECT — shared schema, validated on both sides
    // shared/schemas.ts (used by both client and server)
    export const RegisterSchema = z.object({
      email: z.string().email().max(254),
      age:   z.number().int().min(13).max(120),
    });

    // Server (Express/Next.js API route)
    app.post('/api/register', async (req, res) => {
      const result = RegisterSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.flatten() });
      }
      const { email, age } = result.data;   // safe, validated values
      // ... proceed
    });

    // Client (React)
    const result = RegisterSchema.safeParse(formData);
    if (!result.success) { showErrors(result.error.flatten()); return; }
    // Client validation = UX only; server will re-validate anyway
  
```
