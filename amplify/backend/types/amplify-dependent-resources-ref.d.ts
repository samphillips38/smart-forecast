export type AmplifyDependentResourcesAttributes = {
  "api": {
    "runModelAPI": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "variables": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    }
  },
  "function": {
    "getVariables": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "runModel": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  }
}