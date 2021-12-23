import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    wrapper: {
        width: "100%",
        maxWidth: "300px",
        display: "flex",
        flexWrap: "nowrap",
    },
    filled: {
        width: "20%",
        height: "0",
        borderBottom: "3px solid #275C30",
        marginRight: "5px",
    },
    empty: {
        width: "20%",
        height: "0",
        borderBottom: "3px solid #DBDBDB",
        marginRight: "5px",
    }
});

const StepLine = ({current, max}) => {
    const classes = useStyles();
    const lines = new Array(max)
        .fill("")
        .map((item, index) => (<div className={index <= current ? classes.filled : classes.empty} key={index} />));
    return (
        <div className={classes.wrapper}>
            {lines}
        </div>
    )
}

export default StepLine;