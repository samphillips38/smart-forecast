def getFakeData():
    var1 = {
        "id": 0,
        "modelId": 0,
        "name": "Sales per Month",
        "symbol": "S",
        "isFormula": False,
        "formula": None,
        "points": {
            "areProbabilistic": False,
            "entities": {
                0: {"id": 0, "xCoordinate": 1, "yCoordinate": 1, "yDeviation": 1},
                1: {"id": 2, "xCoordinate": 2, "yCoordinate": 5, "yDeviation": 2},
                2: {"id": 3, "xCoordinate": 3, "yCoordinate": 18, "yDeviation": 3},
                3: {"id": 4, "xCoordinate": 4, "yCoordinate": 20, "yDeviation": 4}
            }
        },
        "status": "loaded" # Options will be ["loaded", "loading", "needs updating"]
    }
    var2 = {
        "id": 1,
        "modelId": 0,
        "name": "Price",
        "symbol": "P",
        "isFormula": False,
        "formula": None,
        "points": {
            "areProbabilistic": False,
            "entities": {
                0: {"id": 0, "xCoordinate": 1, "yCoordinate": 5, "yDeviation": None},
                1: {"id": 2, "xCoordinate": 2, "yCoordinate": 6, "yDeviation": None},
                2: {"id": 3, "xCoordinate": 3, "yCoordinate": 8, "yDeviation": None},
                3: {"id": 4, "xCoordinate": 4, "yCoordinate": 6, "yDeviation": None}
            }
        },
        "status": "loaded"
    }
    var3 = {
        "id": 2,
        "modelId": 0,
        "name": "Monthly Turnover",
        "symbol": "T",
        "isFormula": True,
        "formula": "2S + x + 41 + P + P^2 + S^P + 1/S",
        "dependencies": ["S", "x", "P"],
        "points": {
            "areProbabilistic": True,
            "entities": {
                0: {"id": 0, "xCoordinate": 1, "yCoordinate": 5, "yDeviation": 2},
                1: {"id": 2, "xCoordinate": 2, "yCoordinate": 24, "yDeviation": 10},
                2: {"id": 3, "xCoordinate": 3, "yCoordinate": 56, "yDeviation": 15},
                3: {"id": 4, "xCoordinate": 4, "yCoordinate": 72, "yDeviation": 30}
            }
        },
        "status": "loaded"
    }
    layoutComponent1 = {
        "i": '0', "x": 0, "y": 0, "w": 6, "h": 2,
        "type": "Variable Graph",
        "varId": 0,
        "otherInfo": "some other stuff"
    }
    layoutComponent2 = {
        "i": '1', "x": 6, "y": 0, "w": 6, "h": 2,
        "type": "Variable Graph",
        "varId": 1,
        "otherInfo": "some other stuff"
    }
    layoutComponent3 = {
        "i": '2', "x": 0, "y": 1, "w": 12, "h": 2,
        "type": "Variable Graph",
        "varId": 2,
        "otherInfo": "some other stuff"
    }
    model1 = {
        "id": 0,
        "name": "Test Model",
        "description": "This model is for something",
        "status": "idle",
        "variables": {
            "status": "idle",
            "entities": {
                var1["id"]: var1,
                var2["id"]: var2,
                var3["id"]: var3
            }
        },
        "dashboardLayouts": {
            "status": "idle",
            "layout": [layoutComponent1, layoutComponent2, layoutComponent3],
        }
    }
    model2 = {
        "id": 1,
        "name": "Test Model 2",
        "description": "This model is for something else",
        "status": "idle",
        "variables": {
            "status": "idle",
            "entities": {}
        }
    }
    rootData = {
        "models": {
            "status": "idle",
            "selectedModel": model1["id"],
            "ids": [model1["id"], model2["id"]],
            "entities": {
                model1["id"]: model1,
                model2["id"]: model2
            }
        }
    }
    return rootData