const var1 = {
    id: 0,
    modelId: 0,
    name: "Sales per Month",
    symbol: "S",
    isFormula: false,
    formula: null,
    points: {
        areProbabilistic: false,
        entities: {
            0: {id: 0, xCoordinate: 1, yCoordinate: 1, yDeviation: 1},
            1: {id: 2, xCoordinate: 2, yCoordinate: 5, yDeviation: 2},
            2: {id: 3, xCoordinate: 3, yCoordinate: 18, yDeviation: 3},
            3: {id: 4, xCoordinate: 4, yCoordinate: 20, yDeviation: 4}
        }
    },
    status: "loaded" // Options will be ["loaded", "loading", "needs updating"]
}
const var2 = {
    id: 1,
    modelId: 0,
    name: "Price",
    symbol: "P",
    isFormula: false,
    formula: null,
    points: {
        areProbabilistic: false,
        entities: {
            0: {id: 0, xCoordinate: 1, yCoordinate: 5, yDeviation: null},
            1: {id: 2, xCoordinate: 2, yCoordinate: 6, yDeviation: null},
            2: {id: 3, xCoordinate: 3, yCoordinate: 8, yDeviation: null},
            3: {id: 4, xCoordinate: 4, yCoordinate: 6, yDeviation: null}
        }
    },
    status: "loaded"
}
const var3 = {
    id: 2,
    modelId: 0,
    name: "Monthly Turnover",
    symbol: "T",
    isFormula: true,
    formula: "2S + x + 41 + P + P^2 + S^P + 1/S",
    points: {
        areProbabilistic: true,
        entities: {
            0: {id: 0, xCoordinate: 1, yCoordinate: 5, yDeviation: 2},
            1: {id: 2, xCoordinate: 2, yCoordinate: 24, yDeviation: 10},
            2: {id: 3, xCoordinate: 3, yCoordinate: 56, yDeviation: 15},
            3: {id: 4, xCoordinate: 4, yCoordinate: 72, yDeviation: 30}
        }
    },
    status: "loaded"
}

const model1 = {
    id: 0,
    name: "Test Model",
    description: "This model is for something",
    status: "idle",
    variables: {
        status: "idle",
        entities: {
            [var1.id]: var1,
            [var2.id]: var2,
            [var3.id]: var3
        }
    }
}
const model2 = {
    id: 1,
    name: "Test Model 2",
    description: "This model is for something else",
    status: "idle",
    variables: {
        status: "idle",
        entities: {}
    }
}
const rootData = {
    models: {
        status: "idle",
        selectedModel: model1.id,
        ids: [model1.id, model2.id],
        entities: {
            [model1.id]: model1,
            [model2.id]: model2
        }
    }
}

function returnAfterDelay(value) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(value);
        }, 2000);
    })
}

export default async function fakeGet(endpoint) {
    switch (endpoint) {
        case 'api/rootData':
            return returnAfterDelay(rootData);
        case 'api/models':
            return returnAfterDelay([model1, model2]);
        default:
            return null
    }
}