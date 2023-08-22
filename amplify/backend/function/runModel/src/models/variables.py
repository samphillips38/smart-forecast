# import numpy as np
# import numexpr as ne
# import logging

# class Variables:
#     def __init__(self, d) -> None:
#         self.id = d.get('id')
#         self.modelId = d.get('modelId')
#         self.name = d.get('name')
#         self.symbol = d.get('symbol')
#         self.isFormula = d.get('isFormula')
#         self.formula = d.get('formula')
#         self.dependencies = d.get('dependencies', [])
#         self.dependenciesObjects = []
#         self.points = [point for point in list(d.get('points').get('entities').values())]
#         self.isLinked = False
#         self.hasBeenSolved = False

#     def getMeanArray(self):
#         logging.info(f'Getting mean array for variable {self.symbol}')
#         if not self.dependencies or self.hasBeenSolved:
#             return np.array([point['yCoordinate'] for point in self.points])
#         if not self.isLinked:
#             raise Exception(f'Variable {self.symbol} has not yet been linked.')
#         means = ne.evaluate(self.formula, local_dict={var.symbol: var.getMeanArray() for var in self.dependenciesObjects})
#         self.points = [{'id': i, 'xCoordinate': i+1, 'yCoordinate': means[i]} for i in range(len(means))]
#         self.hasBeenSolved = True
#         return means
    
#     def getSigma(self):
#         return np.array([point['yDeviation'] for point in self.points])
    
#     def addDependency(self, dep):
#         if dep.symbol not in self.dependencies:
#             raise Exception(f'Dependency {dep.symbol} not found for variable {self.symbol}')
#         self.dependenciesObjects.append(dep)

#     def getDict(self):
#         return {
#         "id": self.id,
#         "modelId": self.modelId,
#         "name": self.name,
#         "symbol": self.symbol,
#         "isFormula": self.isFormula,
#         "formula": self.formula,
#         "dependencies": self.dependencies,
#         "points": {
#             "areProbabilistic": True,
#             "entities": {point['id']: point for point in self.points}
#         },
#         "status": "loaded"
#     }



if __name__=='__main__':
    pass
