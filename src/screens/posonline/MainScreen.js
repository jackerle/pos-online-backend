import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { useHistory, Redirect } from 'react-router-dom';

//Marterial UI Section
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer, Grid, List, ListItem, ListItemIcon, ListItemText, Divider, Paper,
  Card, Typography, Button, Box, ListItemAvatar, Avatar, IconButton, Badge,
  ListItemSecondaryAction, ButtonGroup, Container, Dialog, DialogTitle, DialogContent, DialogContentText,
  TextField, DialogActions, CardActionArea, CardMedia, CardContent, AppBar, Toolbar,
} from '@material-ui/core'

//Private Section
// import APPBar from '../../components/posonline/AppBar'
import APPBar from '../../components/posonline/AppBar_tool'
import StoreList from '../../components/posonline/Added/StoreList'
import useWindowDimensions from '../../hooks/useWindowDimensions';
import logo from '../../static/image/all_one_pos.png';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DownIcon from '@material-ui/icons/GetApp';
import StoreGeneral from '../../components/posonline/StoreInfo_general'
import StoreTransaction from '../../components/posonline/StoreInfo_transaction'
import StoreAdd from '../../components/posonline/StoreInfo_add'
import store_list_mock from '../../static/data/posonline/store_data.json'
import Loading from '../../components/posonline/Loading'
import MessageDialog from './../../components/Dialog/MessageDialog'
import { get_store_api, get_transaction_by_store_api, get_store_info_api , get_transaction_count } from '../../utility/apihelper'
import axios from 'axios';
import ResendReceiptDialog from '../../components/Dialog/ResendReceiptDialog';
import SetOneTouchDialog from '../../components/Dialog/SetOneTouchDialog';

//css
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
  }
}));

//Styled Component Section

const GridStoreListStyled = styled(Grid)`
// overflow:auto;
// height:55rem;
// height:46rem;
width: 100%;
margin-right:3rem;
background:WhiteSmoke;
`;

const GridStyled = styled(Grid)`
  overflow:auto;
  min-height:34rem;
  max-height:100vh;
  // height:46rem;
  width: 100%;
  background:WhiteSmoke;
`;
const PaperStyled = styled(Paper)`
  width:95%;
  height:80%;
  background:White;
  margin-left:1rem;
  margin-right:1rem;
`;
const HeaderListStyled = styled(List)`
  // background:orange;
  margin-right:2rem;
`;

export default function MainUIRender(props) {
  const { userInfo, logout } = props
  const classes = useStyles();
  const history = useHistory();
  const [item_selected, set_item_selected] = useState([])
  const [showNotItemSelected, setShowNotItemSelected] = useState(false)
  const [showSetOnetouch , setShowSetOnetouch] = useState(false)
  let user_info = {
    id: "",
    name: "",
    surname: ""
  };

  let store_info = {
    id: "04275",
    name: "ปุณวิถี 20 ( สุขุมวิท 101 )",
  };

  const [menuIndex, setMenuIndex] = React.useState(1);
  const handleClickStore = (index) => {
    // setOpen(!open);

    setMenuIndex(index);
    setMenuSubIndex(0);
  };
  const [menuSubIndex, setMenuSubIndex] = React.useState(0);
  const [maxTransactionCount, setMaxTransactionCount] = React.useState(0);
  const [showStoreNotExist, setShowStoreNotExist] = React.useState(false)
  async function handleClickStoreSub(store_id) {
    // setOpen(!open);

    try {

      let apiRequest = {
        "channel": "posmobile",
        // "store_id": storeListBk[menuIndex - 1].store_id,
        "store_id": store_id,
        "offset": 0
      };

      // console.log(apiRequest)
      const apiResponse = await get_transaction_by_store_api(apiRequest);
      const apiResponseCount  = await get_transaction_count(apiRequest)

      // console.log(apiResponse)
      if (apiResponse.data != undefined && apiResponseCount.data != undefined) {
        if (apiResponse.data.result.apiresult.issuccess == false) {
          alert("[" + apiResponse.data.result.apiresult.returncode + "] " +
            apiResponse.data.result.apiresult.message);
        } else {
          let trn_list = apiResponse.data.result.payload.transactions;
          let trn_count = apiResponseCount.data.result.payload.totalrecords;

          setMaxTransactionCount(trn_count)
          setTransactionList(trn_list);
          // sort
          // setTransactionList(trn_list.sort((next,prev)=>{
          //   return new Date(next.system_date).getTime() - new Date(prev.system_date).getTime() 
          // }));
        }
      }
    } catch (Exception) {
      // console.log(Exception)
      alert(Exception);
    } finally {
      setLoadingOpen(false);
      setMenuSubIndex(1);
    }
  };


  const handleCheckedItem = (event) => {

    let isChecked = event.target.checked
    let transaction = JSON.parse(event.target.value)
    transaction.status = "กำลังรอการดำเนินการ"
    let item = JSON.parse(JSON.stringify(item_selected))

    if (isChecked) {
      item.push(transaction)
      item.sort((a, b) => (a.store_id > b.store_id) ? 1 : (a.store_id === b.store_id) ? ((a.receipt_no > b.receipt_no) ? 1 : -1) : -1)
      // console.log(item_selected)
    } else {
      item = item.filter(el => el.trans_id != transaction.trans_id)
    }
    console.log(item)
    set_item_selected(item)

  }

  const handleShowResendReceipt = () => {
    if (item_selected.length === 0)
      setShowNotItemSelected(true)
    else
      setShowResendReceipt(true)
  }

  const handleSignOn = (user) => {
    user_info = user;
    // history.push('/sale');
    history.push({
      pathname: '/sale',
      state:
      {
        user_info: user_info,
        store_info: store_info
      }
    });
  };

  const [isLoadingOpen, setLoadingOpen] = React.useState(false);
  const [showResendReceipt, setShowResendReceipt] = React.useState(false)

  const [storeList, setStoreList] = React.useState([]);
  const [storeListBk, setStoreListBk] = React.useState([]);
  const [storeSelected, setStoreSelected] = React.useState(undefined)
  const [transactionList, setTransactionList] = React.useState([]);



  const handleClickAddStore = () => {
    //

    setMenuSubIndex(2);
  }

  const isCheckedItem = (transaction)=>{

    return item_selected.filter(el=>el.trans_id==transaction.trans_id).length > 0

  }

  async function initScreen() {
    try {
      setLoadingOpen(true);

      let apiRequest = {
        "channel": "posmobile"
      };

      const apiResponse = await get_store_api(apiRequest);

      if (apiResponse.data != undefined) {
        if (apiResponse.data.result.apiresult.issuccess == false) {
          alert("[" + apiResponse.data.result.apiresult.returncode + "] " +
            apiResponse.data.result.apiresult.message);
        } else {
          let store_list = apiResponse.data.result.payload.store_info;

          for (let i = 0; i < store_list.length; i++) {
            store_list[i].index = i + 1;
          }

          setStoreList(store_list);
          setStoreListBk(JSON.parse(JSON.stringify(store_list)));
        }
      }
    } catch (Exception) {
      // console.log(Exception)
      alert(Exception);
    } finally {
      setLoadingOpen(false);
    }
  }


  const getStoreInfo = (store_id) => {
    return new Promise(async (resolve, reject) => {
      let st
      setLoadingOpen(true);
      try {
        //For Mock
        // st = JSON.parse(JSON.stringify(storeListBk));
        // st = st.filter(item => item.store_id === store_id);
        // if (!st.length > 0) {
        //   setShowStoreNotExist(true)
        //   setLoadingOpen(false);
        //   resolve({})
        // } else {

        let getStoreInfo = {
          jsonrpc: "2.0",
          method: "getstoreinfo",
          params: {
            storeId: store_id,
            channelInfo: {
              channel: 'posmobile',
              accessToken: 'tqb4s5q7k25234eabbvs11dp02'
            }
          },
          id: 0
        };

        const storeInfo = await get_store_info_api(getStoreInfo)
        // console.log(storeInfo)
        // console.log(apiResponse)
        //set StoreInfo
        if (storeInfo.data != undefined) {
          if (storeInfo.data.body.error) {
            setShowStoreNotExist(true)
            setLoadingOpen(false)
            return
          }
          setStoreSelected({
            "store_id": storeInfo.data.body.result.storeId,
            "store_name": storeInfo.data.body.result.storeName,
            "pos_no": storeInfo.data.body.result.posNo,
            "business_date": storeInfo.data.body.result.businessDate,
            "shift_no": storeInfo.data.body.result.shiftNo,
            "posTaxId": storeInfo.data.body.result.posTaxId
          })
        }
        //

        handleClickStoreSub(store_id)
        resolve()
        //End Mock
      } catch (error) {
        reject('Error from getStoreInfo')
      }

    })
  }


  async function handleClickSearchStore(search_text) {

    try {
      if (search_text === "") {
        return
        // setStoreList(JSON.parse(JSON.stringify(storeListBk)));
      }
      await getStoreInfo(search_text)
      
    } catch (Exception) {
      console.log(Exception)
      alert("here", Exception);
    } finally {
      // setLoadingOpen(false);
    }
  }

  useEffect(() => {
    // initScreen();

    //Mock
    let store_list = store_list_mock.result.payload.store_info;
    for (let i = 0; i < store_list.length; i++) {
      store_list[i].index = i + 1;
    }
    setStoreList(store_list);
    setStoreListBk(JSON.parse(JSON.stringify(store_list)));
    //End Mock

  }, [props]);

  return (
    <div className={classes.root}>
      <APPBar
        store_name={"ร้าน 7-Eleven " + store_info.id + " " + store_info.name}
        user={user_info}
        after_signon_callback={handleSignOn}
        setShowSetOnetouch={setShowSetOnetouch}
        // Added
        isLogin={true} userInfo={userInfo} logout={logout}
      >
      </APPBar>
      <GridStoreListStyled container>
        <Grid xs={8}></Grid>
        <Grid item xs={4}>
          <StoreList
            menuIndex={menuIndex}
            onClickMenu={handleClickStore}
            onClickMenuSub={handleClickStoreSub}
            onClickAddStore={handleClickAddStore}
            storeList={storeList}
            onClickSearch={handleClickSearchStore}
          />
        </Grid>
      </GridStoreListStyled>
      <GridStyled container>

        <Grid item xs={12}>
          {
            menuSubIndex == 0 ?
              <StoreGeneral
                // store_info={storeListBk[menuIndex - 1]}
                store_info={storeSelected}
              />
              : (
                menuSubIndex == 1 ?
                  <StoreTransaction
                    // store_info={storeListBk[menuIndex - 1]}
                    store_info={storeSelected}
                    transaction_list={transactionList}
                    transaction_count={maxTransactionCount}
                    setShowResendReceipt={handleShowResendReceipt}
                    handleCheckedItem={handleCheckedItem}
                    isCheckedItem={isCheckedItem}
                  />
                  :
                  <StoreAdd
                    store_info={storeListBk[menuIndex - 1]}
                  />
              )
          }
        </Grid>
      </GridStyled>

      <Loading
        isOpen={isLoadingOpen}
      />
      <ResendReceiptDialog
        showProp={showResendReceipt}
        setShowProp={setShowResendReceipt}
        itemList={item_selected}
        setItemList={set_item_selected}
      />
      <SetOneTouchDialog 
        showProp={showSetOnetouch}
        setShowProp={setShowSetOnetouch}
      />
      <MessageDialog showProp={showNotItemSelected} setShowProp={setShowNotItemSelected} title={"ไม่พบใบเสร็จที่เลือก"} message={"ไม่พบรายการใบเสร็จที่เลือก กรุณาเลือกรายการใบเสร็จที่ต้องการทำรายการ"} />
      <MessageDialog showProp={showStoreNotExist} setShowProp={setShowStoreNotExist} title={"ไม่พบร้านค้า"} message={"ไม่พบร้านค้านี้ในระบบจากรหัสสาขาที่กรอกมา กรุณากรอกรหัสสาขาให้ถูกต้อง"} />
    </div>
  );
}