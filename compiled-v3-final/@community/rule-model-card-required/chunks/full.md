# ModelCardRequired [rule] v1.0.0
Every model deployed to production must publish a Model Card (per Mitchell et al., FAccT 2019) that documents intended use, evaluation data, performance across demographic slices, ethical considerations, and known limitations. No production deployment without a signed-off card.
> A Model Card is a 1-3 page structured document, version-controlled alongside the model artifact, containing nine sections: (1) Model Details — name, version, date, owner, license, citation; (2) Intended Use — primary use, primary users, out-of-scope uses; (3) Factors — relevant demographic, environmental, instrumentation factors; (4) Metrics — performance measures, decision thresholds, variation approaches; (5) Evaluation Data — datasets, motivation, preprocessing; (6) Training Data — same; (7) Quantitative Analyses — disaggregated results across factors; (8) Ethical Considerations; (9) Caveats and Recommendations. Deployment gates require a card linked from the model registry.
domain: machine-learning

## Applies To
- Any ML model serving customer-facing predictions
- Models making decisions affecting access to credit, housing, employment, healthcare (high-risk under EU AI Act)
- Foundation models / LLMs (Hugging Face requires card on every model upload)
- Internal-only models that influence business decisions (pricing, fraud, ranking)
- Even retraining the same architecture on new data — every retraining produces a new card

## Implementation Checklist
- Model Card stored as `MODEL_CARD.md` next to the model artifact in the registry (MLflow, Weights & Biases, SageMaker Model Registry)
- All 9 sections present; missing sections explicitly justify why ('N/A — no demographic factors apply' is acceptable; blank is not)
- Performance metrics disaggregated by relevant factors (gender, age, geography, device type — whatever the model interacts with)
- Out-of-scope uses listed explicitly — protect against misuse by other teams
- Card reviewed by a non-author (peer engineer + product/legal where applicable) before deployment
- Card version-pinned to the model version; rollback rolls back the card
- Retraining produces a new card automatically (Hugging Face `model-card` CLI; Google's TF Model Card Toolkit)

## Severity
block

## Counter Examples
- Internal recommendation model deployed with no documentation. Six months later a privacy review asks: 'what features does this use, who is it deployed to, what's the false-positive rate by user segment?' — nobody can answer; model rolled back.
- Vendor-supplied face-recognition model used in a customer-facing app with no demographic-disaggregated metrics — fails downstream when accuracy disparity becomes a press story.

## Examples
- Hugging Face: every model on the Hub has an auto-generated card with metadata fields (license, datasets, languages); UI surfaces missing fields as warnings.
- Google's TF Model Card Toolkit: `mct = model_card_toolkit.ModelCardToolkit('./model_card_dir/')` generates HTML + JSON cards from training metrics + eval reports.
- Hiring-AI Bias Audit (NYC LL 144): annual independent audit of disparate impact ratios for any AEDT used in hiring; results published — Model Card is the natural artifact.

## Rationale
Without a Model Card, downstream users (other teams, customers, regulators) cannot assess fitness for purpose. The 2018 Gender Shades study (Buolamwini & Gebru) showed commercial face-recognition systems with 34% error gap between dark-skinned women and light-skinned men — disparity invisible from aggregate accuracy alone. The EU AI Act (effective Aug 2026), NYC Local Law 144 (bias audits for hiring AI), and Colorado SB-205 all require disclosure of intended use and disaggregated performance. Model Cards are the de-facto standard format adopted by Google, Hugging Face Hub (auto-generated), Microsoft Responsible AI, and the NIST AI RMF.

## Applies To
- Any ML model serving customer-facing predictions
- Models making decisions affecting access to credit, housing, employment, healthcare (high-risk under EU AI Act)
- Foundation models / LLMs (Hugging Face requires card on every model upload)
- Internal-only models that influence business decisions (pricing, fraud, ranking)
- Even retraining the same architecture on new data — every retraining produces a new card

## Implementation Checklist
- Model Card stored as `MODEL_CARD.md` next to the model artifact in the registry (MLflow, Weights & Biases, SageMaker Model Registry)
- All 9 sections present; missing sections explicitly justify why ('N/A — no demographic factors apply' is acceptable; blank is not)
- Performance metrics disaggregated by relevant factors (gender, age, geography, device type — whatever the model interacts with)
- Out-of-scope uses listed explicitly — protect against misuse by other teams
- Card reviewed by a non-author (peer engineer + product/legal where applicable) before deployment
- Card version-pinned to the model version; rollback rolls back the card
- Retraining produces a new card automatically (Hugging Face `model-card` CLI; Google's TF Model Card Toolkit)

## Severity
block

## Counter Examples
- Internal recommendation model deployed with no documentation. Six months later a privacy review asks: 'what features does this use, who is it deployed to, what's the false-positive rate by user segment?' — nobody can answer; model rolled back.
- Vendor-supplied face-recognition model used in a customer-facing app with no demographic-disaggregated metrics — fails downstream when accuracy disparity becomes a press story.

## Derived From
@community/principle-train-serve-skew
