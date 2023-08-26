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

const getNodes = (variables) => {
    return variables.map((el) => ({
        id: el.id.toString(),
        data: { label: el.name, variableId: el.id, modelId: el.modelId },
        position: { x: 0, y: 100 * el.id },
        type: 'variableNode',
    }))
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
    const [edges, setEdges] = useState(initialEdges);

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