import { useSelector } from "react-redux";
import GridItem from 'react-grid-layout';

import VariableGraphCard from "./VariableGraphCard/VariableGraphCard"
import { selectSelectedModel } from "../../../Reducers/modelsReducer";
import { selectAllVariables, selectVariableById } from "../../../Reducers/variablesReducer";

export default function LayoutComponent({ layout }) {
    const variable = useSelector((state) => selectVariableById(state, layout.varId))
    switch (layout.type) {
        case "Variable Graph":
            return (
                <VariableGraphCard variable={variable} layoutId={layout.i}/>);
        default:
            return (<></>);
    }
}