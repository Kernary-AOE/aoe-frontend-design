# BlueGreenDeploy [pattern] v1.0.0
Run two identical production environments (blue and green); only one serves live traffic at a time. Deploy new code to the idle environment, run smoke tests, then atomically switch the traffic router to the new environment. Roll back by switching the router back.
domain: infrastructure
