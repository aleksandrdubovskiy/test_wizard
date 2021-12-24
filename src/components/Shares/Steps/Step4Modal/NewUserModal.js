import {Box, Button, MenuItem, Modal, Select, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import * as Yup from "yup";
import {useFormik} from "formik";

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

const initial = {
    entity: "Person",
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postal1: "",
    postal2: ""
}

const NewUserModal = ({handleChildClose, users, setUsers, setSelected}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const validation = Yup.object({
        id: Yup.string()
            .required('Required'),
        firstName: Yup.string()
            .required('Required'),
        lastName: Yup.string()
            .required('Required'),
        email: Yup.string()
            .required('Required'),
        phone: Yup.string()
            .required('Required'),
        postal1: Yup.string()
            .required('Required'),
    })

    const formik = useFormik({
        initialValues: initial,
        validationSchema: validation,
        onSubmit: values => {
            handleChildClose();
            setUsers([...users, values])
            setSelected(values)
            console.log("SUBMIT", values);
        },
    });

    return (
        <div>
            <Button onClick={handleOpen}>Add New Holder</Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{...style}}>
                    <h3>Create Person</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <Box>
                            Entity
                            <Select
                                id="entity"
                                name="entity"
                                value={formik.values.entity}
                                onChange={formik.handleChange}
                            >
                                {["Person", "notPerson"].map((item) => <MenuItem value={item}
                                                                                 key={item}>{item}</MenuItem>)}
                            </Select>
                        </Box>
                        <Box>
                            PersonId
                            <TextField
                                id="id"
                                name="id"
                                variant="outlined"
                                type="number"
                                value={formik.values.id}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.id && formik.errors.id ? (
                                <div>{formik.errors.id}</div>
                            ) : null}
                        </Box>


                        <Box>
                            FirstName
                            <TextField
                                id="firstName"
                                name="firstName"
                                variant="outlined"
                                type="text"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.firstName && formik.errors.firstName ? (
                                <div>{formik.errors.firstName}</div>
                            ) : null}
                        </Box>


                        <Box>
                            LastName
                            <TextField
                                id="lastName"
                                name="lastName"
                                variant="outlined"
                                type="text"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <div>{formik.errors.lastName}</div>
                            ) : null}
                        </Box>


                        <Box>
                            Email
                            <TextField
                                id="email"
                                name="email"
                                variant="outlined"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                            ) : null}
                        </Box>


                        <Box>
                            Phone
                            <TextField
                                id="phone"
                                name="phone"
                                variant="outlined"
                                type="number"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.phone && formik.errors.phone ? (
                                <div>{formik.errors.phone}</div>
                            ) : null}
                        </Box>


                        <Box>
                            Postal 1
                            <TextField
                                id="postal1"
                                name="postal1"
                                variant="outlined"
                                type="text"
                                value={formik.values.postal1}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.postal1 && formik.errors.postal1 ? (
                                <div>{formik.errors.postal1}</div>
                            ) : null}
                        </Box>


                        <Box>
                            Postal2
                            <TextField
                                id="postal2"
                                name="postal2"
                                variant="outlined"
                                type="text"
                                value={formik.values.postal2}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Box>

                        <Box>
                            <Button type="submit">Create</Button>
                        </Box>
                    </form>

                </Box>
            </Modal>
        </div>
    )
}

export default NewUserModal;