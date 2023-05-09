import { useSelector } from "react-redux";
import GridItem from 'react-grid-layout';

import VariableGraphCard from "./VariableGraphCard/VariableGraphCard"
import { selectSelectedModel, selectVariableById } from "../../../modelsReducer";

export default function LayoutComponent({ layout }) {
    const model = useSelector(selectSelectedModel);
    const variable = model.variables.entities[layout.varId];
    switch (layout.type) {
        case "Variable Graph":
            return (
                <VariableGraphCard variable={variable} layoutId={layout.i}/>);
        default:
            return (<></>);
    }
}