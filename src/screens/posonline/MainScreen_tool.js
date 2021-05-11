import React , {useEffect} from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { useHistory , Redirect } from 'react-router-dom';

//Marterial UI Section
import { makeStyles } from '@material-ui/core/styles';
import { 
  Drawer , Grid  , List , ListItem , ListItemIcon , ListItemText , Divider, Paper ,
  Card , Typography , Button , Box , ListItemAvatar , Avatar , IconButton , Badge ,
  ListItemSecondaryAction , ButtonGroup , Container , Dialog , DialogTitle , DialogContent , DialogContentText ,
  TextField , DialogActions , CardActionArea , CardMedia , CardContent , AppBar , Toolbar ,
} from '@material-ui/core'

//Private Section
import APPBar from '../../components/posonline/AppBar_tool'
import Resend_tool from '../../components/posonline/Resend_tool'
import StoreList from '../../components/posonline/StoreList'
import useWindowDimensions from '../../hooks/useWindowDimensions';
import logo from '../../static/image/all_one_pos.png';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DownIcon from '@material-ui/icons/GetApp';
import StoreGeneral from '../../components/posonline/StoreInfo_general'
import StoreTransaction from '../../components/posonline/StoreInfo_transaction'
import StoreAdd from '../../components/posonline/StoreInfo_add'
import store_list_mock from '../../static/data/posonline/store_data.json'
import Loading from '../../components/posonline/Loading'
import {get_store_api , get_transaction_by_store_api} from '../../utility/apihelper'
import axios from 'axios';

//css
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header:{
  }
}));

//Styled Component Section
const GridStyled = styled(Grid)`
  overflow:auto;
  // height:55rem;
  height:46rem;
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
  const {userInfo, logout} = props
  const classes = useStyles();
  const history = useHistory();

  const [isLoadingOpen, setLoadingOpen] = React.useState(false);

  function handleClickSearchStore(search_text){
    try{
      setLoadingOpen(true);

      // if(search_text === "")
      // {
      //   setStoreList(JSON.parse(JSON.stringify(storeListBk)));
      // }else{

      //   let st = JSON.parse(JSON.stringify(storeListBk));
      //   st = st.filter(item => item.store_id.indexOf(search_text) != -1);

      //   setStoreList(st);
      // }
    }catch(Exception)
    {
      alert(Exception);
    }finally{
      setLoadingOpen(false);
    }
  }

  useEffect(() => {

  }, [props]);

  return (
    <div className={classes.root}>
      <APPBar isLogin={true} userInfo={userInfo} logout={logout}>
      </APPBar>

      <Resend_tool/>

      <Loading 
        isOpen={isLoadingOpen}
      />
    </div>
  );
}