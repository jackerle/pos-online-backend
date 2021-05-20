import React, { useState } from 'react'

import CancelIcon from '@material-ui/icons/Cancel';
import Loading from './../posonline/LoadingWithProcess'
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
import { set_one_touch } from "../../utility/apihelper";
import DoneIcon from '@material-ui/icons/Done';
import SearchIcon from '@material-ui/icons/Search';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import MessageDialog from './MessageDialog';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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
        height: "350px",
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
    },
    menuButton: {
        marginRight: theme.spacing(0),
      },
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


export default function SetOneTouchDialog({
    showProp, setShowProp
}) {
    const classes = useStyles()

    const [isLoadingOpen, setLoadingOpen] = React.useState(false)
    const [storeIdInput, setStoreIdInput] = useState('')
    const [storeIdList, setStoreIdList] = useState([])
    const [now_process , set_now_process] = useState(0)
    const [max_process, set_max_process] = useState(0)
    const [dialogMessage, setDialogMessage] = useState({
        isShow : false,
        title : '',
        message : ''
    })

    function handleDelItem(itemDel) {
        let f = storeIdList.filter((item) => {
            return item.storeId !== itemDel.storeId
        });

        let x = JSON.parse(JSON.stringify(f))

        setStoreIdList(x);
    }

    function renderListStoreId() {

        if (storeIdInput.length === 0) {
            // alert('กรุณาใส่รหัสร้านสาขา')
            setDialogMessage({
                isShow:true,
                title:"ไม่สามารถดำเนินการได้",
                message: "กรุณาใส่รหัสร้านสาขา"
            })
            return
        }
        if (storeIdInput.trim()[storeIdInput.trim().length - 1] === ',') {
            alert('input text ต้องไม่ลงท้ายด้วย comma')
        }

        let _store_list = storeIdInput.trim().split(/[\s|, ]+/)
        let store_list = []

        _store_list.map((ele, index) => {
            if (ele == '') {
                delete _store_list[index]
            }
            if (ele.length < 5) {
                _store_list[index] = ele.padStart(5,0)
            }
            store_list.push({
                "storeId": _store_list[index],
                "storeName": "กำลังรอการดำเนินการ",
                "status": "กำลังรอการดำเนินการ"
            })
        })

        console.log(store_list)
        setStoreIdList(store_list)
        setStoreIdInput('')
    }

    async function handle_request_set_onetouch() {

        try {
            setLoadingOpen(true)



            if (storeIdList.length === 0) {
                // alert('ไม่มีรหัสสาขาที่ต้องการจะ set onetouch')
                setDialogMessage({
                    isShow:true,
                    title:"ไม่สามารถดำเนินการได้",
                    message: "ไม่มีรหัสสาขาที่ต้องการจะ set onetouch"
                })
                return
            }

            let x = JSON.parse(JSON.stringify(storeIdList))

            set_max_process(x.length)

            for (let i = 0; i < x.length; i++) {
                // if (x[i].status != 'ส่งข้อมูลสำเร็จ')
                x[i].status = "กำลังดำเนินการ...";
            }

            setStoreIdList(x)

            for (let i = 0; i < x.length; i++) {

                let apiRequest = {
                    "jsonrpc": "2.0",
                    "result": {
                        "channelinfo": {
                            "channel": "7delivery"
                        },
                        "payload":{
                            "store_id":x[i].storeId
                        }
                    },
                    "id":0
                }

                const apiResponse = await set_one_touch(apiRequest)

                if(apiResponse.data.result == undefined){
                    // x[i].status = apiResponse.data
                    x[i].storeName = 'เกิดข้อผิดพลาด'
                }else{
                    if(apiResponse.data.result.apiresult.issuccess == false){
                        x[i].status = apiResponse.data.result.apiresult.message;
                        x[i].storeName = 'เกิดข้อผิดพลาด'
                    }else{
                        x[i].status = 'ติดตั้ง One touch สำเร็จ'
                        x[i].storeName = apiResponse.data.result.payload.store_name
                    }
                }
                set_now_process(i)
            }
            setStoreIdList(x)



        } catch (err) {
            console.log(err)
            alert(err)

        }
        finally {
            setLoadingOpen(false)
        }

    }

    async function handle_reset_onetouch() {

        try {
            setLoadingOpen(true)

            setStoreIdList([])



        } catch (err) {
            console.log(err)
            alert(err)

        }
        finally {
            setLoadingOpen(false)
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
                    style={{ cursor: 'move' }}
                    id="draggable-dialog-title"
                    className={classes.styledHeader}
                    align={"center"}>
                    โปรแกรมเซตสินค้า Onetouch
                    <IconButton aria-label="close" className={classes.closeButton} onClick={() => setShowProp(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent style={{ marginBottom: '0rem',overflow:"hidden",paddingBottom:"4rem" }} className={classes.tableBody}>
                    <HeaderListStyled
                        align={"right"}>
                        <List >
                            <ListItem>
                                <TextField
                                    id="standard-basic"
                                    label="รหัสร้านสาขา"
                                    fullWidth
                                    value={storeIdInput}
                                    onChange={e => setStoreIdInput(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key == 'Enter') {
                                            renderListStoreId()
                                        }
                                    }}
                                />
                                <IconButton edge="end" color='primary' className={classes.menuButton}
                                    onClick={renderListStoreId}>
                                    <SearchIcon />
                                </IconButton>
                                <IconButton edge="end" color='primary' className={classes.menuButton}
                                    onClick={handle_request_set_onetouch}
                                >
                                    <CloudQueueIcon />
                                </IconButton>
                                <IconButton edge="end" color='primary' className={classes.menuButton}
                                    onClick={handle_reset_onetouch}
                                >
                                    <HighlightOffIcon />
                                </IconButton>
                            </ListItem>
                        </List>


                    </HeaderListStyled>
                    <PaperStyled elevation={0} >
                        {
                            storeIdList.length > 0 && <TableContainerStyled >
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead className={classes.thead}>
                                        <TableRow>
                                            <StyledTableCell
                                                align={'center'}
                                                padding='none'
                                            >
                                                รหัสร้านสาขา
                                        </StyledTableCell>
                                            {/* <StyledTableCell
                                                align={'center'}
                                                padding='none'
                                            >
                                                ชื่อร้านสาขา
                                        </StyledTableCell> */}
                                            <StyledTableCell
                                                align={'center'}
                                                padding='none'
                                            >
                                                สถานะ
                                        </StyledTableCell>
                                            <StyledTableCell
                                                align={'center'}
                                                padding='none'
                                            >
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody
                                    className={classes.tbody}
                                    >
                                        {
                                            storeIdList.map((ele, index) => {
                                                return <StyledTableRow key={'i' + index}>
                                                    <TableCell
                                                        align={'center'}
                                                        padding='none'
                                                    >
                                                        {ele.storeId.length == 5 && ele.storeId}
                                                    </TableCell>
{/* 
                                                    <TableCell
                                                        align={'center'}
                                                        padding='none'
                                                    >
                                                        {ele.storeName}
                                                    </TableCell> */}
                                                    <TableCell
                                                        align={'center'}
                                                        padding='none'
                                                    >
                                                        {ele.status}
                                                    </TableCell>
                                                    <TableCell
                                                        align={'center'}
                                                        padding='none'
                                                    >
                                                        <IconButton color='primary'
                                                            onClick={() => { handleDelItem(ele) }}
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
                        }

                    </PaperStyled>
                </DialogContent>


            </Dialog>
            <MessageDialog showProp={dialogMessage.isShow} setShowProp={(isShow)=>setDialogMessage(isShow)} title={dialogMessage.title} message={dialogMessage.message}/>
            <Loading
                now_process = {now_process}
                max_process = {max_process}
                isOpen={isLoadingOpen} />
        </>
    )

}