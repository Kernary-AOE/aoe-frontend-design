# LeakyTarget [anti-pattern] v1.0.0
A feature that is computed using information that would not have been available at inference time — typically because the feature pipeline reads the latest value of some column instead of the value as-of the prediction timestamp. Models with leaky features look spectacular in offline evaluation and fail completely in production.
domain: machine-learning

## Label
Leaky Target / Future Information in Features

## Why Bad
Target leakage produces metrics so good they should immediately be suspect. A churn model with offline AUC 0.99 is almost certainly leaking — for example, the feature `support_tickets_30d` was computed from a snapshot taken last Tuesday for every row, including labels generated months earlier. The feature 'knew' that the user would later complain. In production, where features are computed BEFORE the label exists, the AUC collapses to 0.65. The team has shipped a model that solves a different problem than the one they evaluated. Common leakage sources: (1) features that are derived from the label itself (e.g. `last_payment_amount` for a churn model — paid users by definition haven't churned), (2) future aggregates joined without point-in-time semantics, (3) data preprocessing fit on the full dataset before train/test split (data leakage from test → train via mean imputation), (4) duplicated rows where the same entity appears in train and test.

## Instead Do
Use point-in-time-correct joins for every feature: `feature_value AS OF label_timestamp`. Never compute aggregates on the entire dataset before splitting; fit preprocessors (scalers, encoders, imputers) on the training fold only, then apply to validation/test. Time-based splits (train ≤ T1 < val ≤ T2 < test) instead of random splits whenever the prediction is forward-in-time. Feature stores (Feast, Tecton) make point-in-time correctness the default. As a sanity check: if your AUC > 0.95 on a non-trivial problem, assume leakage and audit every feature for time-of-availability.

## Structure
```
    # WRONG — point-in-time-incorrect join
    SELECT
      labels.user_id,
      labels.churned,
      stats.avg_txn_amount   -- snapshot from 'now', AFTER label was generated
    FROM churn_labels labels
    JOIN user_stats   stats USING (user_id);

    # WRONG — preprocessor fit on full data
    scaler = StandardScaler().fit(X)        # uses test means/stddevs
    X_scaled = scaler.transform(X)
    X_train, X_test = train_test_split(X_scaled, test_size=0.2)

    # WRONG — random split with time-correlated features
    train, test = train_test_split(df, test_size=0.2, random_state=42)
    # Both folds contain 2024-Q1 and 2024-Q2; model memorizes user_id

    # CORRECT — point-in-time join
    SELECT
      labels.user_id,
      labels.churned,
      stats.avg_txn_amount
    FROM churn_labels labels
    JOIN user_stats_snapshots stats
      ON labels.user_id = stats.user_id
     AND stats.snapshot_time = (
       SELECT MAX(snapshot_time)
       FROM user_stats_snapshots s2
       WHERE s2.user_id = labels.user_id
         AND s2.snapshot_time < labels.label_time
     );

    # CORRECT — pipeline-scoped preprocessor + time split
    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('clf',    LogisticRegression()),
    ])
    train = df[df.event_time <  '2024-04-01']
    test  = df[df.event_time >= '2024-04-01']
    pipeline.fit(train.X, train.y)            # scaler fits ONLY on train
    pipeline.score(test.X, test.y)
  
```

## Relations
requires: @community/pattern-feature-store

## Label
Leaky Target / Future Information in Features

## Why Bad
Target leakage produces metrics so good they should immediately be suspect. A churn model with offline AUC 0.99 is almost certainly leaking — for example, the feature `support_tickets_30d` was computed from a snapshot taken last Tuesday for every row, including labels generated months earlier. The feature 'knew' that the user would later complain. In production, where features are computed BEFORE the label exists, the AUC collapses to 0.65. The team has shipped a model that solves a different problem than the one they evaluated. Common leakage sources: (1) features that are derived from the label itself (e.g. `last_payment_amount` for a churn model — paid users by definition haven't churned), (2) future aggregates joined without point-in-time semantics, (3) data preprocessing fit on the full dataset before train/test split (data leakage from test → train via mean imputation), (4) duplicated rows where the same entity appears in train and test.

## Instead Do
Use point-in-time-correct joins for every feature: `feature_value AS OF label_timestamp`. Never compute aggregates on the entire dataset before splitting; fit preprocessors (scalers, encoders, imputers) on the training fold only, then apply to validation/test. Time-based splits (train ≤ T1 < val ≤ T2 < test) instead of random splits whenever the prediction is forward-in-time. Feature stores (Feast, Tecton) make point-in-time correctness the default. As a sanity check: if your AUC > 0.95 on a non-trivial problem, assume leakage and audit every feature for time-of-availability.

## Structure
```
    # WRONG — point-in-time-incorrect join
    SELECT
      labels.user_id,
      labels.churned,
      stats.avg_txn_amount   -- snapshot from 'now', AFTER label was generated
    FROM churn_labels labels
    JOIN user_stats   stats USING (user_id);

    # WRONG — preprocessor fit on full data
    scaler = StandardScaler().fit(X)        # uses test means/stddevs
    X_scaled = scaler.transform(X)
    X_train, X_test = train_test_split(X_scaled, test_size=0.2)

    # WRONG — random split with time-correlated features
    train, test = train_test_split(df, test_size=0.2, random_state=42)
    # Both folds contain 2024-Q1 and 2024-Q2; model memorizes user_id

    # CORRECT — point-in-time join
    SELECT
      labels.user_id,
      labels.churned,
      stats.avg_txn_amount
    FROM churn_labels labels
    JOIN user_stats_snapshots stats
      ON labels.user_id = stats.user_id
     AND stats.snapshot_time = (
       SELECT MAX(snapshot_time)
       FROM user_stats_snapshots s2
       WHERE s2.user_id = labels.user_id
         AND s2.snapshot_time < labels.label_time
     );

    # CORRECT — pipeline-scoped preprocessor + time split
    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('clf',    LogisticRegression()),
    ])
    train = df[df.event_time <  '2024-04-01']
    test  = df[df.event_time >= '2024-04-01']
    pipeline.fit(train.X, train.y)            # scaler fits ONLY on train
    pipeline.score(test.X, test.y)
  
```

## Requires
@community/pattern-feature-store
