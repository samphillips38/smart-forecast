import { Box, Card, Typography, Grid } from "@material-ui/core";
import { MathJax } from "better-react-mathjax";
import nerdamer from "nerdamer";

function EquationElement({ children }) {
    return (
        <Grid item>
            <Card>
                <Box 
                width={50} 
                height={50} 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                >
                    <Typography variant="h4">{children}</Typography>
                </Box>
            </Card>
        </Grid>
    )
}

function recursiveEquationView(equationTree) {
    if ( equationTree.type == 'VARIABLE_OR_LITERAL' ) {
        return (
            <EquationElement>{equationTree.value}</EquationElement>
        );
    } else {
        const leftSide = recursiveEquationView(equationTree.left);
        const rightSide = recursiveEquationView(equationTree.right);
        const operator = equationTree.value;
        return (
            <>
            {leftSide}
            <EquationElement>{equationTree.value}</EquationElement>
            {rightSide}
            </>
        )
    }
}

export default function EquationView({ variable }) {
    const equation = nerdamer(variable.expression);
    const equationTree = nerdamer.tree(variable.expression);
    const opVarList = [];
    return (
        <Grid container spacing={2}>
            {recursiveEquationView(equationTree)}
        </Grid>
        // <Typography>{recursiveEquationView(equationTree)}</Typography>
    )
}