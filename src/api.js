import { API } from "aws-amplify";

export async function fetchVariables(modelId) {
    const apiName = 'variables';
    const path = `/${modelId}/variables/`;
    const myInit = {
      headers: {} // OPTIONAL
    };
    const promise = await API.get(apiName, path, myInit);
    return promise;
  }


export async function fetchModels(modelId) {
    const apiName = 'variables';
    const path = `/models`;
    const myInit = {
        headers: {} // OPTIONAL
    };
    const promise = await API.get(apiName, path, myInit);
    console.log(promise);
    return Object.values(promise.models.entities);
}