# BatchOnlyPipelines [anti-pattern] v1.0.0
Designing every data pipeline as a nightly (or hourly) batch job — typically Airflow + dbt + warehouse — when downstream use-cases require sub-minute freshness. The freshness ceiling becomes the batch interval, and there is no architectural seam to lower it.
domain: data-engineering
