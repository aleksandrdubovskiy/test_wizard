import {Box, Button, TextField} from "@mui/material";
import * as React from "react";

const ClassLine = ({values, errors, touched, index, formikHandlers, onRemove}) => {
    return (
        <Box display="flex">
            <div>
                {index + 1}.
            </div>
            <div>
                Class name
                <TextField
                    id={`sharesList[${index}].nameClass`}
                    name={`sharesList[${index}].nameClass`}
                    variant="outlined"
                    type="text"
                    value={values.nameClass}
                    onChange={formikHandlers.handleChange}
                    onBlur={formikHandlers.handleBlur}
                />
                {touched?.nameClass && errors?.nameClass ? (
                    <div>{errors.nameClass}</div>
                ) : null}
            </div>
            <div>
                No. shares
                <TextField
                    id={`sharesList[${index}].shares`}
                    name={`sharesList[${index}].shares`}
                    variant="outlined"
                    type="number"
                    value={values.shares}
                    onChange={formikHandlers.handleChange}
                    onBlur={formikHandlers.handleBlur}
                />
                {touched?.shares && errors?.shares ? (
                    <div>{errors.shares}</div>
                ) : null}
            </div>

            <div>
                No. votes per share
                <TextField
                    id={`sharesList[${index}].votes`}
                    name={`sharesList[${index}].votes`}
                    variant="outlined"
                    type="number"
                    value={values.votes}
                    onChange={formikHandlers.handleChange}
                    onBlur={formikHandlers.handleBlur}
                />
                {touched?.votes && errors?.votes ? (
                    <div>{errors.votes}</div>
                ) : null}
            </div>
            <div>
                <Button variant="text" onClick={onRemove}>Close</Button>
            </div>
        </Box>
    )
}
export default ClassLine;