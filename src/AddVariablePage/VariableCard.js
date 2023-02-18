import Card from "@material-ui/core/Card";
import { useState } from 'react';
import EditVariableCard from "./EditVariableCard";
import ShowVariableCard from "./ShowVariableCard";

export default function VariableCard({ variable, onRemoveItem }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <Card>
        {isEditing ? (
            <EditVariableCard variable={variable} setIsEditing={setIsEditing} onRemoveItem={onRemoveItem}/>
        ) : (
            <ShowVariableCard variable={variable} setIsEditing={setIsEditing} onRemoveItem={onRemoveItem}/>
        )}
    </Card>
  );
}
