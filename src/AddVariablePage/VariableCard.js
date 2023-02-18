import Card from "@material-ui/core/Card";
import { useState } from 'react';
import EditVariableCard from "./EditVariableCard";
import ShowVariableCard from "./ShowVariableCard";

export default function VariableCard({ symbol, value, data, setData, onRemoveItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  return (
    <Card>
        {isEditing ? (
            <EditVariableCard symbol={symbol} editedValue={editedValue} setEditedValue={setEditedValue} setIsEditing={setIsEditing} onRemoveItem={onRemoveItem}/>
        ) : (
            <ShowVariableCard symbol={symbol} value={value} setIsEditing={setIsEditing} onRemoveItem={onRemoveItem}/>
        )}
    </Card>
  );
}
