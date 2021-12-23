import * as React from 'react';
import {Box, MenuItem, Select, TextField, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const currencies = ["SEK", "USD", "EUR"]


const useStyles = makeStyles({
    title: {
        color: "#797979",
        fontSize: "14px",
        fontWeight: 600,
        marginBottom: "0.4em",
    }
})

const Step2 = ({values, errors, touched, handleBlur, handleChange, setFieldValue}) => {
    const classes = useStyles();

    return (
        <Box sx={{p: 5}}>
            <Typography component="h3" variant="h3" sx={{mb: 2}}>
                Share capital
            </Typography>
            <Typography component="p" variant="p" sx={{mb: 2}}>
                Enter the company’s share capital as it was at the company formation. It can be found on the registry
                certificate from Bolagsverket.
            </Typography>
                <Box sx={{mt: 5}}>
                    <div className={classes.title}>Amount of share capital</div>
                    <TextField
                        id="capital"
                        name="capital"
                        variant="outlined"
                        type="number"
                        value={values.capital}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <Select
                        labelId="currency"
                        id="currency"
                        name="currency"
                        value={values.currency}
                        onChange={handleChange}
                    >
                        {currencies.map((item) => <MenuItem value={item} key={item}>{item}</MenuItem>)}
                    </Select>
                    {touched.capital && errors.capital ? (
                        <div>{errors.capital}</div>
                    ) : null}
                </Box>
                <Box sx={{mt: 5}}>
                    <div className={classes.title}>Total number of shares</div>
                    <TextField
                        id="sharesNumber"
                        name="sharesNumber"
                        variant="outlined"
                        type="number"
                        value={values.sharesNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.sharesNumber && errors.sharesNumber ? (
                        <div>{errors.sharesNumber}</div>
                    ) : null}
                </Box>
                <Box sx={{mt: 5}}>
                    <div className={classes.title}>Company formation date</div>
                    <DatePicker id="startDate" name="startDate" selected={values.startDate} onBlur={handleBlur} onChange={(val) => setFieldValue("startDate", val)}/>
                    {touched.startDate && errors.startDate ? (
                        <div>{errors.startDate}</div>
                    ) : null}
                </Box>
        </Box>
    )
}

export default Step2;