class Layout:
    def __init__(self, d) -> None:
        self.i = d.get('i')
        self.x = d.get('x')
        self.y = d.get('y')
        self.w = d.get('w')
        self.h = d.get('h')
        self.type = d.get('type')
        self.varId = d.get('varId')
        self.otherInfo = d.get('otherInfo')

    def getDict(self):
        return {
            "i": self.i, "x": self.x, "y": self.y, "w": self.w, "h": self.h,
            "type": self.type,
            "varId": self.varId,
            "otherInfo": self.otherInfo
        }