import * as React from 'react';
import {useEffect, useState} from 'react';
import {Box, Button, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import ShareBlock from "./Step4Modal/ShareBlock";
import {SharesStatus} from "./SharesStatus";

const SortableTable = SortableContainer(({ children }) => {
    return (
        <TableBody>{children}</TableBody>
    );
});

const SortableRow = SortableElement(({ children, onClick }) => {
    return (
        <TableRow onClick={onClick}>{children}</TableRow>
    );
});

const initialShareModal = {
    shares: 0,
    nameClass: "",
    shareHolder: "",
    clauses: []
}

const Step4 = ({values, setFieldValue }) => {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState();
    const [openedRecord, setOpenedRecord] = useState(initialShareModal);
    const [sharesList, setSharesList] = useState([]);
    const [delta, setDelta] = useState(0)

    useEffect(() => {
        const summary = values.sharesBlocks.reduce((res, item) => {
            res[item.nameClass] = (res[item.nameClass] || 0)  + item.shares;
            return res;
        }, {})
        const newSharesList = values.sharesList
            .map(shareItem => {
                return {
                    nameClass: shareItem.nameClass,
                    shares: shareItem.shares - summary[shareItem.nameClass]
                }
            });
        setSharesList(newSharesList);
        const total = newSharesList.reduce((sum, item) => (sum + item.shares), 0);
        setDelta(total);
    }, [values.sharesBlocks, values.sharesList])

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const editRecord = (item) => {
        setOpenedRecord({...item});
        handleOpen();
        setMode("edit");
    }

    const newRecord = (item) => {
        setOpenedRecord({...initialShareModal});
        setOpen(true);
        setMode("new");
    }

    const [firstRow, setFirstRow] = useState([]);
    const data = values.sharesBlocks;

    useEffect(() => {
        const result = [];
        values.sharesBlocks.forEach((item, index) => {
            const positionStart = (index ? result[index-1]?.[1] : 0);
            result.push([positionStart + 1, positionStart + item.shares]);
        })
        setFirstRow([...result]);
    }, [values.sharesBlocks]);

    const onReorderEnd = ({oldIndex, newIndex}) => {
        data.splice(newIndex, 0, data.splice(oldIndex, 1)[0]);
        setFieldValue("sharesBlocks", [...data])
    };

    const saveHandler = (val, mode) => {
        if (mode === "new") {
            setFieldValue("sharesBlocks", [...data, val])
        } else {
            const item = data.find(dataItem => dataItem.shareholder === val.shareholder && dataItem.nameClass === val.nameClass);
            item.shares = val.shares;
            item.clauses = val.clauses;
            setFieldValue("sharesBlocks", [...data])
        }
    }

    return (
        <Box sx={{p: 5}}>
            <Typography component="h3" variant="h3" sx={{mb: 2}}>
                Create share blocks
            </Typography>
            <Typography component="p" variant="p" sx={{mb: 2}}>
                Enter the initial share blocks that was created in the initial company formation.
                Drag to change share block series.
            </Typography>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell key="1">Share block</TableCell>
                        <TableCell key="2">No shares</TableCell>
                        <TableCell key="3">Class</TableCell>
                        <TableCell key="4">Shareholder</TableCell>
                        <TableCell key="5">Clauses</TableCell>
                    </TableRow>
                </TableHead>
                <SortableTable axis="y" onSortEnd={onReorderEnd} distance={5}>
                    {data.map((item, index) => (
                        <SortableRow key={item.positionStart} index={index} onClick={() => editRecord(item)}>
                            <TableCell key="a1">{firstRow[index]?.[0]} - {firstRow[index]?.[1]}</TableCell>
                            <TableCell key="a2">{item.shares}</TableCell>
                            <TableCell key="a3">{item.nameClass}</TableCell>
                            <TableCell key="a4">{item.shareholder}</TableCell>
                            <TableCell key="a5">
                                {item.clauses.map(clause => (<Chip label={clause} key={clause}/>))}
                            </TableCell>
                        </SortableRow>
                    ))}
                </SortableTable>
            </Table>
            <Button onClick={() => newRecord()}>Open modal</Button>
            <SharesStatus delta={delta} />

            <ShareBlock
                mode={mode}
                open={open}
                data={values}
                openedRecord={openedRecord}
                saveHandler={saveHandler}
                handleClose={handleClose}
                sharesList={sharesList}
            />
        </Box>
    )
}

export default Step4;