import * as React from 'react';
import {useEffect, useState} from 'react';
import {Box, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import ShareBlock from "./Step4Modal/ShareBlock";

const SortableTable = SortableContainer(({ children }) => {
    return (
        <TableBody>{children}</TableBody>
    );
});

const SortableRow = SortableElement(({ children }) => {
    return (
        <TableRow>{children}</TableRow>
    );
});

const Step4 = ({values, setFieldValue }) => {
    const [firstRow, setFirstRow] = useState([]);
    const data = values.sharesBlocks;
    const updatePosition = () => {
        const result = [];
        values.sharesBlocks.forEach((item, index) => {
            const positionStart = (index ? result[index-1]?.[1] : 0);
            result.push([positionStart + 1, positionStart + item.shares]);
        })
        setFirstRow([...result]);
    }

    useEffect(() => {
        updatePosition();
    }, [values.sharesBlocks]);

    const onReorderEnd = ({oldIndex, newIndex}) => {
        data.splice(newIndex, 0, data.splice(oldIndex, 1)[0]);
        setFieldValue("sharesBlocks", [...data])
    };

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
                        <SortableRow key={item.positionStart} index={index}>
                            <TableCell key="a1">{firstRow[index]?.[0]} - {firstRow[index]?.[1]}</TableCell>
                            <TableCell key="a2">{item.shares}</TableCell>
                            <TableCell key="a3">{item.className}</TableCell>
                            <TableCell key="a4">{item.shareholder}</TableCell>
                            <TableCell key="a5">
                                {item.clauses.map(clause => (<Chip label={clause} key={clause}/>))}
                            </TableCell>
                        </SortableRow>
                    ))}
                </SortableTable>
            </Table>
            <ShareBlock data={values} />



        </Box>
    )
}

export default Step4;