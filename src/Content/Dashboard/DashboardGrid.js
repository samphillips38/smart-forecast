import { useSelector } from "react-redux";
import GridLayout from "react-grid-layout";
import { Box, Card, Typography } from "@material-ui/core";
import { withSize } from "react-sizeme";

import { selectVariables, selectSelectedModel } from "../../modelsReducer";
import LayoutComponent from "./Components/LayoutComponent";

function DashboardGrid({ size }) {
    const model = useSelector(selectSelectedModel);
    if (!model || !model.dashboardLayout) {
        return null
    }
    console.log(size.width)
    return (
        model && model.dashboardLayout && (
            <GridLayout
            // layout={model.dashboardLayout.layouts}
            rowHeight={150}
            width={size.width}
            // draggableHandle={".drag-handle"}
            >
                {model.dashboardLayout.layout.map((layout) => (
                    <Box border={1} key={layout.i} data-grid={layout}>
                        {/* <LayoutComponent layout={layout.i}/> */}
                        <Typography>hello</Typography>
                    </Box>
                ))}
            </GridLayout>
        )
    )
}


export default withSize({ refreshMode: "throttle", refreshRate: 166 })(
    DashboardGrid
);