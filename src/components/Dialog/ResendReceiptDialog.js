import React from 'react'

import CancelIcon from '@material-ui/icons/Cancel';
import Loading from './../posonline/Loading'
import styled from 'styled-components';
import { useHistory, Redirect } from 'react-router-dom';

//Marterial UI Section
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import {
    Drawer, Grid, List, ListItem, ListItemIcon, ListItemText, Divider, Paper,
    Card, Typography, Button, Box, ListItemAvatar, Avatar, IconButton, Badge,
    ListItemSecondaryAction, ButtonGroup, Container, Dialog, DialogTitle, DialogContent, DialogContentText,
    TextField, CardActionArea, CardMedia, CardContent, AppBar, Toolbar, Chip,
    TableContainer, TableHead, TableRow, TableCell, Table, TableBody, InputBase, TablePagination,
    Radio, FormControl, FormLabel, RadioGroup, FormControlLabel, DialogActions
} from '@material-ui/core'
import Draggable from 'react-draggable';
import CloseIcon from '@material-ui/icons/Close';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { resend_by_receiptno_api } from "../../utility/apihelper";
import DoneIcon from '@material-ui/icons/Done';
import ClearAll from '@material-ui/icons/DeleteOutline';


function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(0),
    },
    title: {
        flexGrow: 1,
    },
    store: {
        font: "7Font"
    },
    listItemText: {
        fontSize: '1.4em',//Insert your required size
        color: '#438B63'
    },
    channelText: {
        fontSize: '1.4em',//Insert your required size
        color: '#438B63',
        marginRight: theme.spacing(1),
    },
    radioText: {
        color: '#438B63',
    },
    listItemDetail: {
        fontSize: '1.2em',//Insert your required size
        fontWeight: 'regular',
        color: '#438B63'
    },
    radio: {
        '&$checked': {
            color: '#438B63'
        },
    },
    resendDiaog: {
        minWidth: "1200px"
    },
    styledHeader: {
        background: '#438B63',
        '& h2': {
            color: 'white',
        }
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(0),
        top: theme.spacing(0),
        color: theme.palette.grey[500],
    },
    tbody: {
        display: "block",
        maxHeight: "450px",
        overflowY: "auto"
    },
    thead: {
        display: "table",
        width: "100%",
        tableLayout: "fixed"
    },
    tr: {
        display: "table",
        width: "100%",
        tableLayout: "fixed"
    }
}));

const HeaderListStyled = styled(List)`
  // background:orange;
  margin-right:2rem;
`;

const DialogActionsStyled = styled(DialogActions)`
    margin-right:1rem
`;

const PaperStyled = styled(Paper)`

  width:95%;
  // height:80%;
  background:White;
  margin-left:1rem;
  margin-right:1rem;
`;

const TableContainerStyled = styled(TableContainer)`
  overflow:auto;
  background:White;
  // max-height:42rem;
  // max-height:33rem;
`;
const StyledTableRow = withStyles((theme) => ({
    root: {
        display: "table",
        width: "100%",
        tableLayout: "fixed",
        '&:nth-of-type(even)': {
            backgroundColor: '#f7fdfa',

        },
    },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#438B63',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);


export default function ResendReceiptDialog({
    showProp, setShowProp, itemList, setItemList
}) {

    const classes = useStyles();
    const [isLoadingOpen, setLoadingOpen] = React.useState(false)

    function handleDelItem(itemDel) {
        let f = itemList.filter((item) => {
            return item.store_id !== itemDel.store_id
                || item.receipt_no !== itemDel.receipt_no
        });

        let x = JSON.parse(JSON.stringify(f))

        setItemList(x);
    }


    async function handleResendMessage() {
        try {
            setLoadingOpen(true);

            if (itemList.length === 0) {
                alert("กรุณาเพิ่มข้อมูลใบเสร็จ ในรายการใบเสร็จ");
                return;
            }

            let x = JSON.parse(JSON.stringify(itemList))

            for (let i = 0; i < x.length; i++) {
                // if (x[i].status != 'ส่งข้อมูลสำเร็จ')
                    x[i].status = "รอดำเนินการ";
            }
            setItemList(x);

            for (let i = 0; i < x.length; i++) {

                //1. Prepare request
                let apiRequest = {
                    "channel": x[i].channel,
                    "store_id": x[i].store_id,
                    "receipt_no": x[i].receipt_no
                };

                //2. Call API
                const apiResponse = await resend_by_receiptno_api(apiRequest);

                //3. Update Result
                if (apiResponse.data.result === undefined) {
                    x[i].status = apiResponse.data.body.error.message;
                } else {
                    if (apiResponse.data.result.apiresult.issuccess == false) {
                        x[i].status = apiResponse.data.result.apiresult.message;
                    } else {
                        x[i].status = "ส่งข้อมูลสำเร็จ";
                    }
                }
            }
            setItemList(x);
        } catch (Exception) {
            alert(Exception);
        } finally {
            setLoadingOpen(false);
        }
    }


    return (
        <>
            <Dialog
                open={showProp}
                onClose={() => setShowProp(false)}
                aria-labelledby="dialog-title"
                fullWidth
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                maxWidth="md"
            // classes={{ paper: classes.resendDiaog }}
            >
                <DialogTitle
                    style={{ cursor: 'move'}}
                    id="draggable-dialog-title"
                    className={classes.styledHeader}
                    align={"center"}>
                    Re-send receipt
                    <IconButton aria-label="close" className={classes.closeButton} onClick={() => setShowProp(false)}>
                    <CloseIcon />
                </IconButton>
                </DialogTitle>
                <DialogContent style={{ marginBottom: '3rem', overflow: "hidden" }} className={classes.tableBody}>
                    <HeaderListStyled
                    align={"right"}>

                        <Button onClick={handleResendMessage} color="primary" type="submit">
                            <AutorenewIcon />
                  
                        </Button>
                        {/* <Button onClick={() => {

                            let item = JSON.parse(JSON.stringify(itemList))

                            item = item.filter(el => el.status != 'ส่งข้อมูลสำเร็จ')
                            if (item.length > 0)
                                setItemList(item)
                            else {
                                setItemList([])
                                setShowProp(false)
                            }

                        }} color="primary" type="submit">
                            <DoneIcon />
                            Clear Done
                        </Button> */}
                        <Button onClick={() => {
                            setItemList([])
                            setShowProp(false)
                        }} color="primary" type="submit">
                            <ClearAll />
                       
                        </Button>

                        {/* <Button onClick={() => setShowProp(false)} color="primary" type="submit">
                            <CloseIcon />
                            Cancel
                        </Button> */}
                        {/* <ListItemText primary="โปรแกรมส่งข้อมูลยอดขายลงร้านสาขา" /> */}
                    </HeaderListStyled>
                    <PaperStyled elevation={0} >

                        <TableContainerStyled className={classes.container} >
                            <Table
                                // style={{ width: "100%" }}
                                stickyHeader
                                aria-label="sticky table"
                                fullWidth
                                maxWidth="lg"
                            >
                                <TableHead className={classes.thead}>
                                    <TableRow>
                                        <StyledTableCell
                                            align={'center'}
                                            padding='none'
                                        >
                                            แชนแนล
                                    </StyledTableCell>
                                        <StyledTableCell
                                            align={'center'}
                                            padding='none'
                                        >
                                            รหัสร้าน
                                    </StyledTableCell>
                                        <StyledTableCell
                                            align={'center'}
                                            padding='none'
                                        >
                                            เลขที่ใบเสร็จ
                                    </StyledTableCell>
                                        <StyledTableCell
                                            align={'center'}
                                            padding='none'
                                        >
                                            สถานะ
                                    </StyledTableCell>
                                        <StyledTableCell
                                            align={'center'}
                                            padding='none'
                                        />
                                    </TableRow>
                                </TableHead>
                                <TableBody
                                    className={classes.tbody}
                                >
                                    {
                                        itemList.map(transaction => {
                                            return <StyledTableRow>
                                                <TableCell
                                                    align={'center'}
                                                    padding='none'
                                                >
                                                    {transaction.channel}
                                                </TableCell>
                                                <TableCell
                                                    align={'center'}
                                                    padding='none'
                                                >
                                                    {transaction.store_id}
                                                </TableCell>
                                                <TableCell
                                                    // key={1}
                                                    align={'center'}
                                                    padding='none'
                                                >
                                                    {transaction.receipt_no}
                                                </TableCell>
                                                <TableCell
                                                    // key={1}
                                                    align={'center'}
                                                    padding='none'
                                                >
                                                    {transaction.status}
                                                </TableCell>
                                                <TableCell
                                                    align={'center'}
                                                    padding='none'
                                                >
                                                    <IconButton color='primary'
                                                        onClick={() => { handleDelItem(transaction) }}
                                                    >
                                                        <CancelIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </StyledTableRow>
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainerStyled>
                    </PaperStyled>
                </DialogContent>
            </Dialog>
            <Loading
                isOpen={isLoadingOpen} />
        </>
    )
}