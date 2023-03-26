const var1 = {
    id: 0,
    investmentId: 0,
    symbol: "S",
    data: {
        time: [1, 2, 3, 4],
        mean: [1, 5, 18, 20],
        std: [1, 2, 3, 4]
    },
    expression: "Normal(1, 0)",
    title: "Sales per Month",
    isProb: true,
    probType: 'Gaussian',
    type: "Independent",
    status: "loaded" // Options will be ["loaded", "loading", "needs updating"]
}
const var2 = {
    id: 1,
    investmentId: 0,
    symbol: "P",
    data: {
        time: [1, 2, 3, 4],
        mean: [5, 6, 8, 6]
    },
    expression: "3.5",
    title: "Price",
    isProb: false,
    type: "Independent",
    status: "loaded"
}
const var3 = {
    id: 2,
    investmentId: 0,
    symbol: "T",
    data: {
        time: [1, 2, 3, 4],
        mean: [5, 24, 56, 72],
        std: [2, 10, 15, 30],
        valid: true
    },
    expression: "2S + x + 41 + P + P^2 + S^P + 1/S",
    title: "Monthly Turnover",
    isProb: false,
    probType: 'Gaussian',
    type: "Dependent",
    status: "loaded"
}

const investment1 = {
    id: 0,
    name: "Test Investment",
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
const investment2 = {
    id: 1,
    name: "Test Investment 2",
    status: "idle",
    variables: {
        status: "idle",
        entities: {}
    }
}
const rootData = {
    investments: {
        status: "idle",
        displayInvestment: investment1.id,
        entities: {
            [investment1.id]: investment1,
            [investment2.id]: investment2
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
        case 'api/investments':
            return returnAfterDelay([investment1, investment2]);
        default:
            return null
    }
}