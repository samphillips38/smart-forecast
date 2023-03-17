import { Typography } from "@material-ui/core";
import { MathJax } from "better-react-mathjax";
import nerdamer from "nerdamer";
import Grid from "@material-ui/core";

function recursiveEquationView(equationTree) {
    if ( equationTree.type == 'VARIABLE_OR_LITERAL' ) {
        return equationTree.value;
    } else {
        const leftSide = recursiveEquationView(equationTree.left);
        const rightSide = recursiveEquationView(equationTree.right);
        const operator = equationTree.value;
        return `${leftSide} ${operator} ${rightSide}`;
    }
}

export default function EquationView({ variable }) {
    const equation = nerdamer(variable.expression);
    const equationTree = nerdamer.tree(variable.expression);
    const opVarList = [];
    return (
        <Typography>{recursiveEquationView(equationTree)}</Typography>
    )
}