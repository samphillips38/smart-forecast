import { useState, useCallback } from 'react';
import ReactFlow, { 
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useSelector } from 'react-redux';

import VariableNode from './VariableNode';
import { selectVariablesForSelectedModel } from '../../Reducers/variablesReducer';

const getNodes = (variables) => {
    return variables.map((el) => ({
        id: el.symbol,
        data: { label: el.name, ...el },
        position: { x: 0 + Math.floor(el.id/2)*250, y: 150 * (el.id - Math.floor(el.id/2)*1.5) },
        type: 'variableNode',
    }))
}
const getEdges = (variables) => {
    const edges = [];
    variables.forEach(element => {
        const deps = element.dependencies || [];
        deps.forEach(depElement => {
            edges.push({
                id: `${depElement}-${element.id}`,
                source:  depElement,
                target: element.symbol,
                label: element.formula,
                targetHandle: depElement
            })
        })
    });
    return edges;
}

const nodeTypes = { variableNode: VariableNode };

const initialNodes = [
    {
    id: '1',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
    type: 'input',
    },
    {
    id: '2',
    data: { label: 'World' },
    position: { x: 100, y: 100 },
    },
];

const initialEdges = [];


export default function ModelMap() {
    const variables = useSelector(selectVariablesForSelectedModel);

    const [nodes, setNodes] = useState(getNodes(variables));
    const [edges, setEdges] = useState(getEdges(variables));

    const onNodesChange = useCallback( (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),[] );
    const onEdgesChange = useCallback( (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),[] );
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    return (
        <div style={{ width: '100%', height:600 }}>
            <ReactFlow 
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            />
        </div>
    );
}