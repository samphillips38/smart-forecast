import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { useSelector } from 'react-redux';
import { selectVariableById } from '../../Reducers/variablesReducer';

const handleStyle = { left: 10 };

export default function VariableNode({ data, isConnectable }) {
    const variable = useSelector((state) => selectVariableById(state, data.id))
    const name = variable.name
    const expression = variable.formula

    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    const createInputHandles = (dependencies) => {
        const handles = [];
        const numHandles = dependencies ? dependencies.length : 0
        const indentFactor = 20;  // Percentage to indent the first and last handles
        const range = 100 - 2 * indentFactor;
        for (let i = 0; i < numHandles; i++) {
            const symbol = dependencies[i];
            const top = indentFactor + (i * range) / (numHandles - 1);
            handles.push(
            <Handle
                type="target"
                position='left'
                id={symbol}
                key={symbol}
                style={{ top: `${top}%`, background: '#555' }}
            />
            );
        }
        return handles;
      };


      return (
        <div style={{ border: '1px solid gray', borderRadius: '8px', padding: '10px', minWidth: '150px' }}>
          <div>{name}</div>
          <div>{expression}</div>
          {createInputHandles(variable.dependencies)}
          <Handle
                type="source"
                position='right'
                id={variable.symbol}
                key={variable.symbol}
                style={{ top: `50%`, background: '#555' }}
            />
        </div>
      );
}
