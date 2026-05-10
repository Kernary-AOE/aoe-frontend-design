# LeakyTarget [anti-pattern] v1.0.0
A feature that is computed using information that would not have been available at inference time — typically because the feature pipeline reads the latest value of some column instead of the value as-of the prediction timestamp. Models with leaky features look spectacular in offline evaluation and fail completely in production.
domain: machine-learning
