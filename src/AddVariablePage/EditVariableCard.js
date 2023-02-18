import TextField from "@mui/material/TextField";
import { CardContent } from "@mui/material";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function EditVariableCard({ symbol, editedValue, setEditedValue, onRemoveItem, setIsEditing }) {
  const onVarNameChanged = (e) => {
    const newValue = editedValue;
    newValue["title"] = e.target.value;
    setEditedValue(newValue);
  };
  const onSymbolChanged = (e) => {
    const newValue = editedValue;
    newValue["symbol"] = e.target.value;
    setEditedValue(newValue);
  };
  const onExpressionChanged = (e) => {
    const newValue = editedValue;
    newValue["expression"] = e.target.value;
    setEditedValue(newValue);
  };
  const onSaveClicked = () => {
    console.log("Saved");
    setIsEditing(false);
  };
  return (
        <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack spacing={2}>
                    <TextField
                        id={symbol}
                        label="Name"
                        defaultValue={editedValue.title}
                        onChange={onVarNameChanged}
                        variant="outlined"
                    />
                    <TextField
                        id={symbol}
                        label="Symbol"
                        defaultValue={editedValue.symbol}
                        onChange={onSymbolChanged}
                        variant="outlined"
                    />
                    <TextField
                        id={symbol}
                        label="Expression"
                        defaultValue={editedValue.expression}
                        onChange={onExpressionChanged}
                        variant="outlined"
                    />
                </Stack>
                <Stack alignItems="flex-end" justifyContent="space-between">
                    <IconButton
                        aria-label="delete"
                        onClick={() => onRemoveItem(symbol)}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                    <Button
                        aria-label="save"
                        onClick={onSaveClicked}
                    >Save Variable</Button>
                </Stack>
            </Stack>
        </CardContent>
  );
}
