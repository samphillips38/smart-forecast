import { useSelector } from "react-redux";
import RGL from "react-grid-layout";
import { Box, Card, Typography } from "@material-ui/core";
import { withSize } from "react-sizeme";

import { selectVariables, selectSelectedModel } from "../../modelsReducer";
import LayoutComponent from "./Components/LayoutComponent";
import { useState } from "react";

function DashboardGrid({ size }) {
    const model = useSelector(selectSelectedModel);
    const [layouts, setLayouts] = useState({
        lg: [
            {i: '0', x: 0, y: 0, w: 6, h: 2},
            {i: '1', x: 6, y: 0, w: 6, h: 2},
            {i: '2', x: 0, y: 2, w: 12, h: 2}
        ],
        sm: [
            {i: '0', x: 0, y: 0, w: 12, h: 2},
            {i: '1', x: 0, y: 2, w: 12, h: 2},
            {i: '2', x: 0, y: 4, w: 12, h: 2}
        ]
    })
    const onLayoutChange = (layout) => {
        console.log(layout)
        setLayouts(layout)
    }
    return (
        <RGL
        // layouts={layouts}
        // layout={model && model.dashboardLayout && model.dashboardLayout.layouts}
        rowHeight={150}
        width={size.width}
        draggableHandle={".drag-handle"}
        onLayoutChange={onLayoutChange}
        >
            {model && model.dashboardLayout && model.dashboardLayout.layout.map((layout) => (
                <Box key={layout.i} data-grid={layout}>
                    <LayoutComponent layout={layout}/>
                </Box>
            ))}
        </RGL>
    )
}


export default withSize({ refreshMode: "throttle", refreshRate: 166 })(
    DashboardGrid
);