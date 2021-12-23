import StepLine from "./StepLine";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const StepHeader = ({step, steps, setStep}) => {
    return (
        <Box component="div" sx={{ p:3, borderBottom: "1px solid #DBDBDB", display: "flex", alignItems: "center"}}>
            <Box component="div" sx={{width: 1, maxWidth: 300}}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-standard-label">Step {step + 1} of {steps.length}</InputLabel>
                    <Select
                        labelId="select-standard"
                        id="select-standard"
                        value={step}
                        onChange={(e) => setStep(e.target.value)}
                        label="Age"
                    >
                        {steps.map((stepItem, index) => <MenuItem value={index} key={stepItem}>{stepItem}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>
            <StepLine current={step} max={steps.length} />
        </Box>
    )
}

export default StepHeader;