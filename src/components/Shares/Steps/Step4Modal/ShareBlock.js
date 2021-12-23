import {Autocomplete, Box, Button, MenuItem, Modal, Select, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";

const clauses = [
    {
        abbreviation: "RFR",
        name: "Right of First Refusal",
    },
    {
        abbreviation: "TAR",
        name: "Tag-along right",
    },
]

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const ShareBlock = ({data, saveHandler}) => {
    const [open, setOpen] = useState(false);
    const [childOpen, setChildOpen] = useState(false);
    const [modalData, setModalData] = useState({})

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChildOpen = () => {
        setChildOpen(true);
    };
    const handleChildClose = () => {
        setChildOpen(false);
    };

    const handleSave = () => {
        saveHandler(modalData);
        handleClose();
    }

    const handleChange = (event) => {
        setModalData({
            ...modalData,
            nameClass: event.target.value
        })
    }
    const hanleShareNumbersChange = (event) => {
        const selecteClass = data.sharesList.find(item => item.nameClass === modalData.nameClass);
        setModalData({
            ...modalData,
            shares: (selecteClass.shares < event.target.value ? selecteClass.shares : event.target.value)
        })
    }


    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2>Share block</h2>

                    <Box>
                        Shareholder
                        <Button sx={{border: "1px solid #DDDDDD", borderRadius: 1, height: 50}} mb={2} onClick={setChildOpen}>
                            {modalData.user?.name}
                            {modalData.user?.id}
                        </Button>
                    </Box>
                    <Box>
                        Number of shares
                        <Box>
                            <TextField type="number" onChange={hanleShareNumbersChange} value={modalData.shares} />
                            <Select
                                id="shareName"
                                name="shareName"
                                value={modalData.nameClass || data.sharesList?.[0]?.nameClass}
                                onChange={handleChange}
                            >
                                {data.sharesList?.map((item) => (
                                    <MenuItem value={item.nameClass} key={item.nameClass}>
                                        <div style={{textAlign: "center"}}>
                                            <div>{item.nameClass}</div>
                                            <div style={{fontSize: 10}}>{item.shares}</div>
                                        </div>
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Box>
                    <Box>
                        Restrictive clauses
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            options={clauses}
                            getOptionLabel={(option) => option.abbreviation}
                            defaultValue={[]}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Tags"
                                />
                            )}
                        />
                    </Box>

                    <Box>
                        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" onClick={handleSave}>Save</Button>
                    </Box>
                </Box>
            </Modal>
            {/*<ChildModal />*/}
        </div>
    )
}

export default ShareBlock;