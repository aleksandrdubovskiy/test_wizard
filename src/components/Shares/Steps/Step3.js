import * as React from 'react';
import {useEffect} from 'react';
import {Box, Button, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import "react-datepicker/dist/react-datepicker.css";
import {FieldArray} from "formik";
import ClassLine from "./ClassLine";

const useStyles = makeStyles({
    title: {
        color: "#797979",
        fontSize: "14px",
        fontWeight: 600,
        marginBottom: "0.4em",
    }
})

const Step3 = ({values, errors, touched, handleBlur, handleChange, setContinue}) => {
    const shareItem = {
        nameClass: "",
        shares: 0,
        votes: 0,
    }

    const delta = values.sharesNumber - values.sharesList.reduce((sum, item) => (sum + (item?.shares ? item.shares : 0)), 0);
    useEffect(() => {
        setContinue(delta < 0);
    }, [delta]);

    return (
        <Box sx={{p: 5}}>
            <Typography component="h3" variant="h3" sx={{mb: 2}}>
                Share classes
            </Typography>
            <Typography component="p" variant="p" sx={{mb: 2}}>
                Semper mattis enim mattis risus id praesent condimentum duis justo.
            </Typography>
            <FieldArray
                name="sharesList"
                render={(arrayHelpers) => (
                    <div>
                        <Box sx={{mt: 5}}>
                            {values.sharesList.map((shareItem, index) => {
                                return (
                                    <ClassLine
                                        key={`${index}${values.sharesList.length}`}
                                        values={shareItem}
                                        errors={errors.sharesList?.[index] || []}
                                        touched={touched.sharesList?.[index]}
                                        index={index}
                                        formikHandlers={{handleChange, handleBlur}}
                                        onRemove={() => arrayHelpers.remove(index)}
                                    />
                                )
                            })}
                        </Box>

                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Button variant="outlined" onClick={() => arrayHelpers.push(shareItem)}>Add share class</Button>
                            <div>
                                {delta > 0 && `${delta} shares for distributing`}
                                {delta === 0 && "All shares distributed"}
                                {delta < 0 && `Overusing ${delta} shares`}
                            </div>
                        </Box>
                    </div>
                )}
            />
        </Box>
    )
}

export default Step3;