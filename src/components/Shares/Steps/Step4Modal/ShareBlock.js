import {Autocomplete, Box, Button, MenuItem, Modal, Select, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import NewUserModal from "./NewUserModal";

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

const ShareBlock = ({data, saveHandler, users, setUsers}) => {
    const [open, setOpen] = useState(false);
    const [childOpen, setChildOpen] = useState(false);
    const [modalData, setModalData] = useState({
        nameClass: data.sharesList?.[0]?.nameClass
    })
    const [selectedUsers, setSelectedUsers] = useState(users)

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

    const handleChange2 = (event, value) => {
        setModalData({
            ...modalData,
            clauses: value.map(val => val.abbreviation)
        })
    }

    const hanleShareNumbersChange = (event) => {
        console.log(modalData);
        const selecteClass = data.sharesList.find(item => item.nameClass === modalData.nameClass);
        setModalData({
            ...modalData,
            shares: (selecteClass.shares < event.target.value ? selecteClass.shares : event.target.value)
        })
    }

    const onChangeUserSelect = (e) => {
        setSelectedUsers([...users.filter(user => `${user.firstName} ${user.lastName}`.indexOf(e.target.value) !== -1)]);
    }

console.log(selectedUsers, users);
    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2>Share block</h2>

                    <Box component="div">
                        <div>Shareholder</div>
                        <Box sx={{border: "1px solid #DDDDDD", borderRadius: 1, height: 50, width: "100%", display: "flex", alignItems: "center"}} mb={2} onClick={handleChildOpen}>
                            {modalData.user ? (
                                <>
                                    {modalData.user.firstName}
                                    {modalData.user.lastName}
                                    {modalData.user.id}
                                </>
                            ): (
                                <>
                                    Choose shareholder
                                </>
                            )}

                        </Box>
                        {childOpen && (<div>
                            <TextField onChange={onChangeUserSelect} placeholder="Search..."/>
                            <div>
                                {selectedUsers.map(user => (
                                    <div onClick={() => {
                                        setModalData({...modalData, user});
                                        setChildOpen(false);
                                    }}>
                                        {user.firstName} {user.lastName} {user.id}
                                    </div>
                                ))}
                            </div>

                            <NewUserModal handleChildClose={handleChildClose} setUsers={setUsers} users={users} setSelected={(val) => setModalData({...modalData, user: val})}/>
                        </div>)}
                    </Box>
                    <Box>
                        Number of shares
                        <Box>
                            <TextField type="number" onChange={hanleShareNumbersChange} value={modalData.shares} />
                            <Select
                                id="shareName"
                                name="shareName"
                                value={modalData.nameClass}
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
                            onChange={handleChange2}
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
        </div>
    )
}

export default ShareBlock;