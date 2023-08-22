#!/bin/bash
# 1. build, fetch the dependencies
pipenv install
# 2. zip, prepare the AWS Lambda to upload
cd `pipenv --venv`/lib/python3.8/site-packages/
zip -r /var/task/my-deployment-package.zip .
cd -
zip -r -g my-deployment-package.zip src/
# 3. deploy, using `aws` command to update the remote AWS Lambda
aws lambda update-function-code --function-name runModel-staging --zip-file fileb://my-deployment-package.zip