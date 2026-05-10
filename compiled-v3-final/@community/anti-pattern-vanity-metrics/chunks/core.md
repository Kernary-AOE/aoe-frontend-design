# VanityMetrics [anti-pattern] v1.0.0
Declaring experiment success based solely on metrics that do not reflect actual user value — page views, clicks, session duration, impressions — without verifying that user outcomes improved.
domain: frontend-design

## What It Looks Like
An experiment is declared successful because page views, clicks, or impressions increased, without checking whether task completion, error rate, or retention improved.

## Why People Do It
Vanity metrics are easy to instrument, trend upward with traffic, and make results look positive. They satisfy stakeholder requests for 'data' with minimal analytical cost.

## Consequence
Teams ship changes that improve surface numbers while user success, retention, or satisfaction decline. Engineering effort is misdirected toward optimizing metrics that don't reflect user outcomes.

## Use Instead
Require at least one user-value metric (task completion rate, error rate on key flows, 30-day retention, or activation metric) as a primary success criterion. Vanity metrics may be reported as context but never as the primary pass/fail.
