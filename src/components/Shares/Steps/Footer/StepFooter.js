import {Box, Button} from "@mui/material";

const StepFooter = ({backHandler, saveHandler, continueHandler, continueBtnDisabled}) => {
    return (
        <Box component="div" sx={{ p:3, borderTop: "1px solid #DBDBDB", height: "90px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            {backHandler && <Button variant="outlined" onClick={backHandler}>Back</Button> }
            <Box component="div" sx={{display: "flex"}}>
                {saveHandler && <Button variant="text" color="success" onClick={saveHandler}>Save as draft</Button>}
                {continueHandler && <Button variant="contained" color="success" onClick={continueHandler} disabled={!!continueBtnDisabled}>Continue</Button>}
            </Box>
        </Box>
    )
}

export default StepFooter;