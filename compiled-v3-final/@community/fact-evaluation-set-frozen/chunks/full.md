# EvaluationSetFrozen [fact] v1.0.0
A model's holdout evaluation set must be frozen before model development begins and must never be examined, joined to, or used for any decision other than the final model-quality verdict. Repeated 'peeking' at the test set converts it from a generalization estimator into a training set with extra steps.
> Generalization guarantees rely on the test set being statistically independent of the modeling decisions. Each time a researcher computes test-set metrics and then changes the model, hyperparameters, or feature set in response, the researcher introduces an information channel from test to model. After ~20 such cycles, the test-set metric is overfit at significance levels indistinguishable from random. Industrial practice: hold out a 'true holdout' (also called 'final test', 'lockbox', or 'evaluation set') that is computed once at release time, on a model selected entirely on the validation fold.
domain: machine-learning

## Confidence
strong

## Applies To
- Any production ML model — final go/no-go decision uses the frozen evaluation set
- Academic benchmarks (CIFAR, ImageNet, GLUE, MMLU) — community drifts toward leaderboard overfit if no fresh test set is collected periodically
- A/B test analysis — the holdout cohort is the analog of the evaluation set
- LLM evaluation — eval sets must not appear in training data; data contamination is the dominant threat to LLM benchmark validity (HellaSwag, TriviaQA leakage in pretraining corpora)

## Quantitative
- **Cycles To Overfit**: Dwork et al. show with high probability the test-set metric is invalid after ~k = (test-set-size / accuracy²) adaptive queries — for a 1000-row test set and ε=0.01, ~10 cycles is the limit
- **Cifar10 Recreation Drop**: Recht et al. found 3% mean accuracy drop on CIFAR-10.1 across 32 models, with a 7% drop on best leaderboard performers — cumulative test-set adaptation effect
- **Contamination Effect Llm**: GPT-4 accuracy on contaminated benchmark questions ~30% higher than on uncontaminated subset of the same benchmark (Sainz et al., NLP4DH 2023)

## Counter Conditions
- Models are typically retrained periodically — each retrain produces a new model and may evaluate on the same test set, but the team should rotate or augment the test set quarterly to prevent slow leakage.
- It is acceptable to track test-set metric in dashboards (read-only) — the violation is using that signal to drive model decisions.
- Cross-validation does NOT solve test-set leakage — CV produces validation estimates; you still need a separate, untouched final test set.
- Anonymized public benchmark leaderboards (e.g. Kaggle private leaderboard) approximate the principle by hiding the test set; researchers' equivalent is a lockbox repository with revoked write access.

## Sources

## Confidence
strong

## Source
- Dwork et al., 'The Reusable Holdout: Preserving Validity in Adaptive Data Analysis' (Science 2015) — formal treatment of test-set reuse and information leakage
- Hastie, Tibshirani, Friedman, 'The Elements of Statistical Learning' (2009), Section 7.10 — Cross-validation and the optimism bias
- Recht et al., 'Do CIFAR-10 Classifiers Generalize to CIFAR-10?' (ICML 2019) — accuracy on a freshly-collected CIFAR-10-like test set drops 3-15% across models, evidence of cumulative test-set adaptation
- Kaggle: separation of public and private leaderboard, with private set revealed only at competition end — institutional encoding of this principle
- Google, 'Rules of Machine Learning' Rule #18 — 'Measure delta between models' on validation, not test

## Applies To
- Any production ML model — final go/no-go decision uses the frozen evaluation set
- Academic benchmarks (CIFAR, ImageNet, GLUE, MMLU) — community drifts toward leaderboard overfit if no fresh test set is collected periodically
- A/B test analysis — the holdout cohort is the analog of the evaluation set
- LLM evaluation — eval sets must not appear in training data; data contamination is the dominant threat to LLM benchmark validity (HellaSwag, TriviaQA leakage in pretraining corpora)

## Quantitative
- **Cycles To Overfit**: Dwork et al. show with high probability the test-set metric is invalid after ~k = (test-set-size / accuracy²) adaptive queries — for a 1000-row test set and ε=0.01, ~10 cycles is the limit
- **Cifar10 Recreation Drop**: Recht et al. found 3% mean accuracy drop on CIFAR-10.1 across 32 models, with a 7% drop on best leaderboard performers — cumulative test-set adaptation effect
- **Contamination Effect Llm**: GPT-4 accuracy on contaminated benchmark questions ~30% higher than on uncontaminated subset of the same benchmark (Sainz et al., NLP4DH 2023)

## Counter Conditions
- Models are typically retrained periodically — each retrain produces a new model and may evaluate on the same test set, but the team should rotate or augment the test set quarterly to prevent slow leakage.
- It is acceptable to track test-set metric in dashboards (read-only) — the violation is using that signal to drive model decisions.
- Cross-validation does NOT solve test-set leakage — CV produces validation estimates; you still need a separate, untouched final test set.
- Anonymized public benchmark leaderboards (e.g. Kaggle private leaderboard) approximate the principle by hiding the test set; researchers' equivalent is a lockbox repository with revoked write access.

## Derived From
@community/anti-pattern-leaky-target
