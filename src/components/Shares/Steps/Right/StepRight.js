import {Box} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    title: {
        fontSize: 16,
        fontWeight: 600,
        color: "#787878"
    }
})

const StepRight = ({data}) => {
    const classes = useStyles();
    return (
        <Box component="div" sx={{ p:3, borderLeft: "1px solid #DBDBDB", backgroundColor: "#EBEBEB", minWidth: 300}}>
            <div className={classes.title}>
                Summary
            </div>
        </Box>
    )
}

export default StepRight;