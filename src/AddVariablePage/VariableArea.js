import VariableCard from "./VariableCard";
import Grid from "@mui/material/Grid";
import { withSize } from "react-sizeme";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import AddVariableCard from "./AddVariableCard";
import { SecurityUpdateWarningRounded } from "@mui/icons-material";

function VariableArea({ size: { width }, data, setData }) {
  return (
    <>
      <ResponsiveGridLayout
        className="layout"
        // layouts={layouts}
        // breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        // cols={{ lg: 1, md: 1, sm: 1, xs: 1, xxs: 1 }}
        rowHeight={100}
        width={width}
        isDraggable={false}
        // onLayoutChange={onLayoutChange}
      >
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            className="VariableCard"
            data-grid={{ w: 12, h: 1, x: 0, y: Infinity, i: key }}
          >
            <VariableCard
              symbol={key}
              value={value}
              data={data}
              setData={setData}
            />
          </div>
        ))}
        SecurityUpdateWarningRounded
        <div
          key="Add Variable"
          // className="VariableCard"
          data-grid={{ w: 12, h: 1, x: 0, y: Infinity, i: "New" }}
        >
          <AddVariableCard />
        </div>
      </ResponsiveGridLayout>
    </>
  );
}

export default withSize({ refreshMode: "debounce", refreshRate: 60 })(
  VariableArea
);
