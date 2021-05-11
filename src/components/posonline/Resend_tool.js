import React , {useEffect} from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { useHistory , Redirect } from 'react-router-dom';

//Marterial UI Section
import { makeStyles , withStyles , useTheme } from '@material-ui/core/styles';
import { 
  Drawer , Grid  , List , ListItem , ListItemIcon , ListItemText , Divider, Paper ,
  Card , Typography , Button , Box , ListItemAvatar , Avatar , IconButton , Badge ,
  ListItemSecondaryAction , ButtonGroup , Container , Dialog , DialogTitle , DialogContent , DialogContentText ,
  TextField , DialogActions , CardActionArea , CardMedia , CardContent , AppBar , Toolbar , Chip , 
  TableContainer , TableHead , TableRow , TableCell , Table , TableBody , InputBase , TablePagination ,
  Radio , FormControl , FormLabel , RadioGroup , FormControlLabel
} from '@material-ui/core'
import PropTypes from 'prop-types';

//private
import FaceIcon from '@material-ui/icons/Face';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InboxIcon from '@material-ui/icons/Inbox';
import MailIcon from '@material-ui/icons/Mail';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MoneyIcon from '@material-ui/icons/Money';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import LockIcon from '@material-ui/icons/Lock';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DownIcon from '@material-ui/icons/GetApp';
import RedoIcon from '@material-ui/icons/Redo';
import EditIcon from '@material-ui/icons/Edit';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import RefreshIcon from '@material-ui/icons/Refresh';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ReplayIcon from '@material-ui/icons/Replay';
import SearchIcon from '@material-ui/icons/Search';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { numberWithCommas , dateWithoutTime , timeWithoutDate } from '../../utility/formathelper';
import Loading from './Loading'
import axios from 'axios';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Receipt from './Receipt'
import { resend_by_receiptno_api } from '../../utility/apihelper'
import Checkbox from '@material-ui/core/Checkbox';
import CancelIcon from '@material-ui/icons/Cancel';

//css
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
    store:{
        font: "7Font"
    },
    listItemText:{
      fontSize:'1.4em',//Insert your required size
      color:'#438B63'
    },
    channelText:{
      fontSize:'1.4em',//Insert your required size
      color:'#438B63',
      marginRight: theme.spacing(1),
    },
    radioText:{
      color:'#438B63',
    },
    listItemDetail:{
      fontSize:'1.2em',//Insert your required size
      fontWeight:'regular',
      color:'#438B63'
    },
    radio: {
      '&$checked': {
        color: '#438B63'
      }
    },
    checked: {}
}));
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

//Styled Component Section
const HeaderListStyled = styled(List)`
  // background:orange;
  margin-right:2rem;
`;
const FormControlLabelStyled = styled(FormControlLabel)`
  color: '#438B63'
`;
const PaperStyled = styled(Paper)`
  width:95%;
  // height:80%;
  background:White;
  margin-left:1rem;
  margin-right:1rem;
`;
//TableContainer
const TableContainerStyled = styled(TableContainer)`
  overflow:auto;
  background:White;
  // max-height:42rem;
  // max-height:33rem;
`;
const StyledTableRow = withStyles((theme) => ({
  root: {
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

export default function MainUIRender(props) {
  const classes = useStyles();
  // const history = useHistory();

  const [isLoadingOpen, setLoadingOpen] = React.useState(false);
  const [receiptNo, setReceiptNo] = React.useState("");
  const [receiptNo2, setReceiptNo2] = React.useState("");
  const [storeId, setStoreId] = React.useState("");
  const [channel, setChannel] = React.useState("7delivery");
  const handleChange = (event) => {
    setChannel(event.target.value);
  };

  const [itemList, setItemList] = React.useState([]);

  async function handleResendMessage(){
    try{
      setLoadingOpen(true);

      if(itemList.length === 0){
        alert("กรุณาเพิ่มข้อมูลใบเสร็จ ในรายการใบเสร็จ");
        return;
      }

      let x = JSON.parse(JSON.stringify(itemList))

      for(let i=0;i<x.length;i++){
        x[i].status = "รอดำเนินการ";
      }
      setItemList(x);

      for(let i=0;i<x.length;i++){
        
        //1. Prepare request
        let apiRequest={
          "channel": x[i].channel,
          "store_id": x[i].store_id,
          "receipt_no": x[i].receipt_no
        };

        //2. Call API
        const apiResponse = await resend_by_receiptno_api(apiRequest);

        //3. Update Result
        if(apiResponse.data.result === undefined)
        {
          x[i].status = apiResponse.data.body.error.message;
        }else{
          if(apiResponse.data.result.apiresult.issuccess==false)
          {
            x[i].status = apiResponse.data.result.apiresult.message;
          }else
          {
            x[i].status = "ส่งข้อมูลสำเร็จ";
          }
        }
      }
      setItemList(x);
    }catch(Exception)
    {
      alert(Exception);
    }finally{
      setLoadingOpen(false);
    }
  }

  function handleAddItem(){

    //check input
    if(storeId === ""){
      alert("กรุณาคีย์ รหัสสาขา");
      return;
    }
    if(storeId.length != 5){
      alert("กรุณาคีย์ รหัสสาขา 5 หลัก");
      return;
    }
    if(receiptNo === ""){
      alert("กรุณาคีย์ เลขที่ใบเสร็จเริ่มต้น");
      return;
    }
    if(receiptNo.length != 10){
      alert("กรุณาคีย์ เลขที่ใบเสร็จเริ่มต้น 10 หลัก");
      return;
    }
    // if(receiptNo2 === ""){
    //   alert("กรุณาคีย์ เลขที่ใบเสร็จสิ้นสุด");
    //   return;
    // }
    if(receiptNo2 !== "" && receiptNo2.length != 10){
      alert("กรุณาคีย์ เลขที่ใบเสร็จสิ้นสุด 10 หลัก");
      return;
    }

    //check dup
    // let f = itemList.filter((item)=>{
    //   return item.store_id === storeId
    //             && (item.receipt_no === receiptNo || (receiptNo2 !== "" && item.receipt_no === receiptNo2))});
    // if(f.length > 0){
    //   alert("กรุณาคีย์ ข้อมูลใบเสร็จไม่ซ้ำกับในรายการเดิม");
    //   return;
    // }

    let receiptStart = parseInt(receiptNo);
    let receiptEnd = parseInt(receiptNo);
    receiptEnd = (receiptNo2 !== "")?parseInt(receiptNo2):parseInt(receiptNo);

    let x = JSON.parse(JSON.stringify(itemList));
    for(let i=receiptStart;i<=receiptEnd;i++){

      let f = itemList.filter((item)=>{
          return item.store_id === storeId
                    && item.receipt_no === i});
      if(f.length > 0){
        //skip
        continue;
      }

      let item = {
        channel:channel,
        store_id:storeId,
        receipt_no:i,
        status:"รอดำเนินการ",
      }
  
      
      x.push(item)
      x.sort((a, b) => (a.store_id > b.store_id) ? 1 : (a.store_id === b.store_id) ? ((a.receipt_no > b.receipt_no) ? 1 : -1) : -1 )
    }
    setItemList(x);

    setReceiptNo("");
    setReceiptNo2("");
  }

  function handleDelItem(itemDel){
    let f = itemList.filter((item)=>{
      return item.store_id !== itemDel.store_id
                || item.receipt_no !== itemDel.receipt_no});

    let x = JSON.parse(JSON.stringify(f))

    setItemList(x);
  }

  useEffect(() => {
    setItemList([]);
  }, [props]);

  return (
    <div className={classes.root}>
      <HeaderListStyled>
        <ListItem>
          <ListItemText primary="โปรแกรมส่งข้อมูลยอดขายลงร้านสาขา"/>
          <ListItemSecondaryAction>
          </ListItemSecondaryAction>
        </ListItem>
      </HeaderListStyled>
      <PaperStyled elevation={0}>
        <List>
          <ListItem>
            <ListItemText primary={"รายการใบเสร็จ"} classes={{primary:classes.listItemText}}/>
            <ListItemSecondaryAction>
              <ListItem> 
                <ListItemText primary={"แชนแนล"} classes={{primary:classes.channelText}}/>
                <RadioGroup row aria-label="gender" name="gender1" value={channel} onChange={handleChange}>
                  <FormControlLabel value="7delivery" 
                    control={<Radio disableRipple classes={{root: classes.radio, checked: classes.checked}} />} 
                    label={<Typography className={classes.radioText}>7-Delivery</Typography>} />
                  <FormControlLabel value="posmobile" 
                    control={<Radio disableRipple classes={{root: classes.radio, checked: classes.checked}} />} 
                    label={<Typography className={classes.radioText}>POS Mobile</Typography>} />
                </RadioGroup>
                <InputBase 
                  placeholder="รหัสร้าน" 
                  value = {storeId}
                  onChange={e => setStoreId(e.target.value)}
                />
                <InputBase 
                  placeholder="เลขที่ใบเสร็จเริ่มต้น" 
                  value = {receiptNo}
                  onChange={e => setReceiptNo(e.target.value)}
                />
                <InputBase 
                  placeholder="เลขที่ใบเสร็จสิ้นสุด" 
                  value = {receiptNo2}
                  onChange={e => setReceiptNo2(e.target.value)}
                />
                <IconButton edge="end" color='primary' onClick={handleAddItem} className={classes.menuButton}>
                  <AddCircleIcon />
                </IconButton>
                <IconButton edge="end" color='primary' onClick={handleResendMessage} className={classes.menuButton}>
                  <CloudDownloadIcon />
                </IconButton>
              </ListItem>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Divider/>
        <TableContainerStyled className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
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
            <TableBody>
            {
                itemList.map(transaction=>{
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
                            key={1}
                            align={'center'}
                            padding='none'
                          >
                          {transaction.receipt_no}
                        </TableCell>
                        <TableCell
                            key={1}
                            align={'center'}
                            padding='none'
                          >
                          {transaction.status}
                        </TableCell>
                        <TableCell
                            align={'center'}
                            padding='none'
                          >
                            <IconButton color='primary' onClick={()=>{handleDelItem(transaction)}}>
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

      <Loading 
        isOpen={isLoadingOpen}
      />
    </div>
  );
}