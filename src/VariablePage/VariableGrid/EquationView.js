import { Box, Card, Typography, Grid, Divider } from "@material-ui/core";
import { Stack } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import nerdamer from "nerdamer";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

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
    const latexEquation = nerdamer.convertToLaTeX(equation.toString())
    const equationTree = nerdamer.tree(variable.expression);
    const opVarList = [];
    return (
        <>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
            <Typography variant="h6">Expression</Typography>
            <MathJax>`$${latexEquation.toString()}$$`</MathJax>
        </Stack>
        <Divider/>
        <Grid container spacing={2}>
            <Grid item>
                <Box 
                width={50} 
                height={50} 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                >
                    <Typography variant="h4">{variable.symbol}</Typography>
                </Box>
            </Grid>
            <Grid item>
                <Box 
                width={50} 
                height={50} 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                >
                    <Typography variant="h4">{"="}</Typography>
                </Box>
            </Grid>
            {recursiveEquationView(equationTree)}
        </Grid>
        </>
    )
}