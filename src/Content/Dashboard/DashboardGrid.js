import { useSelector } from "react-redux";
import { Responsive } from "react-grid-layout";
import { Box, Card, Typography } from "@material-ui/core";
import { withSize } from "react-sizeme";

import { selectSelectedModel } from "../../Reducers/modelsReducer";
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
        setLayouts(layout)
    }
    return (
        <Responsive
        // layout={model && model.dashboardLayouts && model.dashboardLayouts.layouts}
        rowHeight={150}
        width={size.width}
        draggableHandle={".drag-handle"}
        onLayoutChange={onLayoutChange}
        cols={{lg: 12, md: 12, sm: 12, xs: 6, xxs: 6}}
        >
            {model && model.dashboardLayouts && model.dashboardLayouts.layout.map((layout) => (
                <Box key={layout.i} data-grid={layout}>
                    <LayoutComponent layout={layout}/>
                </Box>
            ))}
        </Responsive>
    )
}


export default withSize({ refreshMode: "throttle", refreshRate: 166 })(
    DashboardGrid
);