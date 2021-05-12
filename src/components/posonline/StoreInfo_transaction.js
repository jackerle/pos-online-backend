import React, { useEffect } from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { useHistory, Redirect } from 'react-router-dom';

//Marterial UI Section
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import {
  Drawer, Grid, List, ListItem, ListItemIcon, ListItemText, Divider, Paper,
  Card, Typography, Button, Box, ListItemAvatar, Avatar, IconButton, Badge,
  ListItemSecondaryAction, ButtonGroup, Container, Dialog, DialogTitle, DialogContent, DialogContentText,
  TextField, DialogActions, CardActionArea, CardMedia, CardContent, AppBar, Toolbar, Chip,
  TableContainer, TableHead, TableRow, TableCell, Table, TableBody, InputBase, TablePagination
} from '@material-ui/core'
import PropTypes from 'prop-types';

//private
import FaceIcon from '@material-ui/icons/Face';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InboxIcon from '@material-ui/icons/Inbox';
import MailIcon from '@material-ui/icons/Mail';
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
import RefreshIcon from '@material-ui/icons/Refresh';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ReplayIcon from '@material-ui/icons/Replay';
import SearchIcon from '@material-ui/icons/Search';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { numberWithCommas, dateWithoutTime, timeWithoutDate } from '../../utility/formathelper';
import Loading from '../../components/posonline/Loading'
import axios from 'axios';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Receipt from '../../components/posonline/Receipt'
import { get_receipt_by_receiptno_api, get_transaction_by_store_api } from '../../utility/apihelper'
import Checkbox from '@material-ui/core/Checkbox';
import MessageDialog from '../Dialog/MessageDialog';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';

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
  store: {
    font: "7Font"
  },
  listItemText: {
    fontSize: '1.4em',//Insert your required size
    color: '#438B63'
  },
  listItemDetail: {
    fontSize: '1.2em',//Insert your required size
    fontWeight: 'regular',
    color: '#438B63'
  }
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
const PaperStyled = styled(Paper)`
  
  margin-top:1rem;
  width:95%;
  max-height:100%
  background:White;
  margin-left:1rem;
  margin-right:1rem;
  margin-bottom:3rem;
`;
//TableContainer


const TableContainerStyled = styled(TableContainer)`
  background:White;
  @media (min-width: ${1900}px) {
    max-height:65vh
  }
  max-height:50vh
 
`;
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: '#f7fdfa',
    },
  },
}))(TableRow);

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        color='primary'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} color='primary' aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        color='primary'
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        color='primary'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

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

  const [pageIndex, setPageIndex] = React.useState(0);
  const itemPerPage = 50;

  const [isLoadingOpen, setLoadingOpen] = React.useState(false);
  const [transactionList, setTransactionList] = React.useState([]);
  const [maxTransactionCount, setMaxTransactionCount] = React.useState(0);

  const [isReceiptOpen, setReceiptOpen] = React.useState(false);
  const [receiptLine, setReceiptLine] = React.useState([]);
  const [receiptNo, setReceiptNo] = React.useState(0);
  const [showReciepError, setShowReciepError] = React.useState({
    isShow: false
  });

  const handleReceiptOpen = () => {
    setReceiptOpen(true);
  }
  const handleReceiptClose = () => {
    setReceiptOpen(false);
  }

  const [searchText, setSearchText] = React.useState("");


  async function handleChangePage(event, pageNumber) {
    //

    try {
      setLoadingOpen(true);

      let apiRequest = {
        "channel": "posmobile",
        "store_id": props.store_info.store_id,
        "offset": (pageNumber * itemPerPage) + 1
      };

      const apiResponse = await get_transaction_by_store_api(apiRequest);
      console.log(apiResponse)
      if (apiResponse.data != undefined) {
        if (apiResponse.data.result.apiresult.issuccess == false) {
          alert("[" + apiResponse.data.result.apiresult.returncode + "] " +
            apiResponse.data.result.apiresult.message);
        } else {
          let trn_list = apiResponse.data.result.payload.transactions;
          let trn_count = apiResponse.data.result.payload.totalrecords;

          setMaxTransactionCount(trn_count)
          setTransactionList(trn_list);
          setPageIndex(pageNumber);
        }
      }
    } catch (Exception) {
      // alert(Exception);
      console.log(Exception)
    } finally {
      setLoadingOpen(false);
    }
  }

  async function handleReceiptClick(receipt_no, receipt_id) {
    try {
      setLoadingOpen(true);

      let apiRequest = {
        "channel": "posmobile",
        "receipt_id": receipt_id
      };

      const apiResponse = await get_receipt_by_receiptno_api(apiRequest);
      // console.log(apiResponse)
      if (apiResponse.data != undefined) {

        if (apiResponse.data.result.apiresult.issuccess == false) {
          setShowReciepError({
            isShow: true,
            message: "[" + apiResponse.data.result.apiresult.returncode + "] " +
              apiResponse.data.result.apiresult.message
          })
          console.log("[" + apiResponse.data.result.apiresult.returncode + "] " +
            apiResponse.data.result.apiresult.message);
        } else {
          console.log(apiResponse.data.result)
          setReceiptNo(receipt_no);
          setReceiptLine(apiResponse.data.result.payload.slip.receiptLines);
          setReceiptOpen(true)
        }
      }
    } catch (Exception) {
      setShowReciepError(true)
      // alert(Exception);
    } finally {
      setLoadingOpen(false);
    }
  }

  async function handleSearch(s_text) {
    // if(searchText=="")
    //   return;

    try {
      setLoadingOpen(true);

      let apiRequest = {
        "channel": "posmobile",
        "store_id": props.store_info.store_id,
        "offset": 0,
        "search_text": s_text
      };

      const apiResponse = await get_transaction_by_store_api(apiRequest);

      if (apiResponse.data != undefined) {
        if (apiResponse.data.result.apiresult.issuccess == false) {
          alert("[" + apiResponse.data.result.apiresult.returncode + "] " +
            apiResponse.data.result.apiresult.message);
        } else {
          let trn_list = apiResponse.data.result.payload.transactions;
          let trn_count = apiResponse.data.result.payload.totalrecords;

          setMaxTransactionCount(trn_count)
          setTransactionList(trn_list);
          setPageIndex(0);
        }
      }
    } catch (Exception) {
      alert(Exception);
    } finally {
      setLoadingOpen(false);
    }
  }
  function handleSearchKeyDown(e) {
    if (e.key == 'Enter') {
      handleSearch(searchText);
    }
  }
  function handleRefresh() {
    handleSearch("");
    setSearchText("");
  }

  useEffect(() => {
    setMaxTransactionCount(props.transaction_count);
    setTransactionList(props.transaction_list);
    setPageIndex(0);
    setSearchText("");
  }, []);

  // console.log(transactionList)

  return (
    <div className={classes.root}>
      {/* <HeaderListStyled>
        <ListItem>
          <ListItemText primary="รายการขายย้อนหลัง"/>
          <ListItemSecondaryAction>
          </ListItemSecondaryAction>
        </ListItem>
      </HeaderListStyled> */}
      <PaperStyled elevation={0}>
        <List>
          <ListItem>
            <ListItemText primary={props.store_info === undefined ? '' : props.store_info.store_id + " " + props.store_info.store_name} classes={{ primary: classes.listItemText }} />
            <ListItemSecondaryAction>
              <ListItem>
                <InputBase
                  placeholder="เลขที่ใบเสร็จ"
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  onKeyPress={handleSearchKeyDown}
                />
                <IconButton edge="end" color='primary' onClick={() => { handleSearch(searchText) }} className={classes.menuButton}>
                  <SearchIcon />
                </IconButton>
                <IconButton edge="end" color='primary' onClick={()=>{
                  props.setShowResendReceipt()
                }} className={classes.menuButton}>
                  <CloudQueueIcon />
                </IconButton>
              </ListItem>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Divider />
        <TableContainerStyled className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  align={'center'}
                  padding='none'
                />
                <StyledTableCell
                  align={'center'}
                  padding='none'
                >
                  วัน-เดือน-ปี
                </StyledTableCell>
                <StyledTableCell
                  align={'center'}
                  padding='none'
                >
                  เวลา
                </StyledTableCell>
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
                  ReferenceID
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
                  ชนิด
                </StyledTableCell>
                <StyledTableCell
                  align={'center'}
                  padding='none'
                >
                  ใบเสร็จอ้างอิง
                </StyledTableCell>
                <StyledTableCell
                  align={'center'}
                  padding='none'
                >
                  ยอดรวม
                </StyledTableCell>
                <StyledTableCell
                  align={'center'}
                  padding='none'
                >
                  ส่วนลด
                </StyledTableCell>
                <StyledTableCell
                  align={'center'}
                  padding='none'
                >
                  ยอดสุทธิ
                </StyledTableCell>
                <StyledTableCell
                  align={'center'}
                  padding='none'
                >
                  Operation
                </StyledTableCell>
              </TableRow>
            </TableHead>  
            <TableBody>
              {
                transactionList.map((transaction,index) => {
                  return <StyledTableRow key={'i'+index}>
                    <TableCell
                      align={'center'}
                      padding='none'
                    >
                      <Checkbox
                        checked={props.isCheckedItem(transaction)}
                        onChange={props.handleCheckedItem}
                        color="primary"
                        value={JSON.stringify(transaction)}
                      />
                    </TableCell>
                    <TableCell
                      align={'center'}
                      padding='none'
                    >
                      {dateWithoutTime(transaction.system_date)}
                    </TableCell>
                    <TableCell
                      align={'center'}
                      padding='none'
                    >
                      {timeWithoutDate(transaction.system_date)}
                    </TableCell>
                    <TableCell
                      align={'center'}
                      padding='none'
                    >
                      {transaction.channel}
                    </TableCell>
                    <TableCell
                      // key={'i'+index}
                      align={'center'}
                      padding='none'
                    >
                      {transaction.reference_id}
                      </TableCell>
                    <TableCell
                      // key={'i'+index}
                      align={'center'}
                      padding='none'
                    >
                      {transaction.receipt_no}
                    </TableCell>
                    <TableCell
                      // key={'i'+index}
                      align={'center'}
                      padding='none'
                    >
                      {transaction.trans_type}
                    </TableCell>
                    <TableCell
                      // key={'i'+index}
                      align={'center'}
                      padding='none'
                    >
                      {transaction.ref_receipt_no}
                    </TableCell>
                    <TableCell
                      // key={'i'+index}
                      align={'right'}
                      padding='none'
                    >
                      {numberWithCommas(transaction.sub_total_amt)}
                    </TableCell>
                    <TableCell
                      // key={'i'+index}
                      align={'right'}
                      padding='none'
                    >
                      {numberWithCommas(transaction.discount_amt)}
                    </TableCell>
                    <TableCell
                      // key={'i'+index}
                      align={'right'}
                      padding='none'
                    >
                      {numberWithCommas(transaction.total_amt)}
                    </TableCell>
                    <TableCell
                      // key={'i'+index}
                      align={'center'}
                      padding='none'
                    >
                      <IconButton color='primary' onClick={() => {
                        console.log(transaction)
                        handleReceiptClick(transaction.receipt_no, transaction.receipt_id)
                      }}>
                        <ReceiptIcon />
                      </IconButton>
                      {/* <IconButton color='primary'>
                        <RedoIcon />
                      </IconButton> */}
                    </TableCell>
                  </StyledTableRow>
                })
              }
            </TableBody>
          </Table>
        </TableContainerStyled>
        <TablePagination
          rowsPerPageOptions={[itemPerPage]}
          component="div"
          count={maxTransactionCount}
          rowsPerPage={itemPerPage}
          page={pageIndex}
          onChangePage={handleChangePage}
          ActionsComponent={TablePaginationActions}
        />
      </PaperStyled>

      <Loading
        isOpen={isLoadingOpen}
      />
      <Receipt
        isOpen={isReceiptOpen}
        onClose={handleReceiptClose}
        receipt_line={receiptLine}
        receipt_no={receiptNo}
      />
      <MessageDialog showProp={showReciepError.isShow} setShowProp={(bool) => setShowReciepError(bool)} title={"เกิดข้อผิดพลาด"} message={"ไม่สามารถเรียกข้อมูลใบเสร็จได้ : " + showReciepError.message} />
    </div>
  );
}