import {makeStyles} from "@mui/styles";
import Shares from "../components/Shares/Shares";

const useStyles = makeStyles({
    page: {
        display: "grid",
        gridTemplateColumns: "350px 1fr",
        height: "100vh"
    },
    left: {
        backgroundColor: "#efefef"
    },
    right: {
        display: "grid",
        gridTemplateRows: "100px 1fr"
    },
    header:{
        backgroundColor: "red",
        height: "100px",
    },
    content:{
    }
});

const MainPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.page}>
            <div className={classes.left}>Left menu</div>
            <div className={classes.right}>
                <div className={classes.header}>Header</div>
                <div className="content"><Shares /></div>
            </div>
        </div>
    )
}

export default MainPage;