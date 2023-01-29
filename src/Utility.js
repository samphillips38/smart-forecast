export function getData() {
  const testData = [
    {
      symbol: "S",
      data: {
        time: [1, 2, 3, 4],
        mean: [1, 5, 18, 20],
        std: [1, 2, 3, 4]
      },
      expression: "Normal(1, 0)",
      title: "Sales per Month",
      isProb: true
    },
    {
      symbol: "P",
      data: {
        time: [1, 2, 3, 4],
        mean: [5, 6, 8, 6]
      },
      expression: "3.5",
      title: "Price",
      isProb: false
    },
    {
      symbol: "T",
      data: {
        time: [1, 2, 3, 4],
        mean: [5, 24, 56, 72],
        std: [2, 10, 15, 30]
      },
      expression: "S \\times P",
      title: "Monthly Turnover",
      isProb: true
    }
  ];
  return testData;
}

export function getLayout(data) {
  const lgList = data.map(function (element) {
    return {
      w: 1,
      h: 2,
      x: 0,
      y: 0,
      i: element.symbol,
      moved: false,
      static: false
    };
  });
  const layouts = {
    lg: lgList
  };
  return layouts;
}

export function getLayoutsFromFormattedData(data) {
  const lgList = Object.entries(data).map(function ([key, value]) {
    return {
      w: 1,
      h: 2,
      x: 0,
      y: 0,
      i: key,
      moved: false,
      static: false
    };
  });
  const layouts = {
    lg: lgList
  };
  return layouts;
}

export function formatData(rawLoadedData) {
  const d = {};
  rawLoadedData.forEach((element) => {
    d[element.symbol] = element;
  });
  return d;
}
