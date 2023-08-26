import logging

from models.variables import Variables
from models.layouts import Layout

class Model:
    def __init__(self, d) -> None:
        self.id = d.get('id')
        self.name = d.get('name')
        self.description = d.get('description')
        self.status = d.get('status')
        self.variables = [Variables(varDic) for varDic in list(d.get('variables').get('entities').values())]
        self.layouts = [Layout(layoutDic) for layoutDic in d.get('dashboardLayouts').get('layout')]

        self.linkVars()

        self.indepVars = [var for var in self.variables if not var.dependencies]
        self.depVars = [var for var in self.variables if var.dependencies]

    def __str__(self) -> str:
        return self.name

    def getVarFromString(self, s):
        for var in self.variables:
            if var.symbol == s:
                return var
        raise Exception(f'No Var found for symbol {s}')
   
    def linkVars(self):
        for var in self.variables:
            for depVarStr in var.dependencies:
                depVar = self.getVarFromString(depVarStr)
                var.addDependency(depVar)
            var.isLinked = True

    def solve(self):
        logging.info('Solving model')
        for var in self.variables:
            var.getMeanArray()

    def getDict(self):
        return {
        "id": self.id,
        "name": self.name,
        "description": self.description,
        "status": self.status,
        "variables": {
            "status": "idle",
            "entities": {var.symbol: var.getDict() for var in self.variables}
        },
        "dashboardLayouts": {
            "status": "idle",
            "layout": [layout.getDict() for layout in self.layouts],
        }
    }
