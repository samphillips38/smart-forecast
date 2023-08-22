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


export async function fetchModels() {
    return fetch('http://127.0.0.1:80/getModels')
}


export async function runModel(model) {
    const apiName = 'variables';
    const path = `/runmodel/${model.id}`;
    const myInit = {
        body: model, // replace this with attributes you need
        headers: {} // OPTIONAL
    };

    return await API.post(apiName, path, myInit);
}

export async function runModel2(model) {
    const apiName = 'runModelAPI';
    const path = `/runmodel`;
    const body = {
        'model': model
    }
    const myInit = {
        body: body, // replace this with attributes you need
        headers: {} // OPTIONAL
    };

    return await API.post(apiName, path, myInit);
}