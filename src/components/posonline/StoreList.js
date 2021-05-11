import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { useHistory , Redirect } from 'react-router-dom';

//Marterial UI Section
import { makeStyles } from '@material-ui/core/styles';
import { 
  Drawer , Grid  , List , ListItem , ListItemIcon , ListItemText , Divider, Paper ,
  Card , Typography , Button , Box , ListItemAvatar , Avatar , IconButton , Badge ,
  ListItemSecondaryAction , ButtonGroup , Container , Dialog , DialogTitle , DialogContent , DialogContentText ,
  TextField , DialogActions , CardActionArea , CardMedia , CardContent , AppBar , Toolbar , Chip ,
  Collapse , CardActions , CardHeader, colors , InputBase , 
} from '@material-ui/core'
import AtmIcon from '@material-ui/icons/LocalAtm';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import Loading from '../../components/posonline/Loading'

//private
import StorefrontIcon from '@material-ui/icons/Storefront';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// import store_list from '../../static/data/posonline/store_data.json'

//css
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    store:{
      font: "7Font"
    },
    nested: {
      paddingLeft: theme.spacing(9),
    },
    media: {
      height: 100,     // as an example I am modifying width and height
      width: '33%',
      marginLeft: '33%'
    },
    total:{
      fontSize:'2em',
      color:'#21509B'
    },
}));

//Styled Component Section
const StoreListStyled = styled(List)`
  overflow:auto;
  background:White;
  // max-height:53rem;
  max-height:44rem;
`;
const ItemGridStyled = styled(Grid)`
  overflow:auto;
  // margin-top:.5rem;
  margin-left:1rem;
  max-height:43rem;
  width: 97%;
  // background:orange;
`;
const OnetouchCardStyled = styled(Card)`
  height: 5rem;
  width: 8rem;
`;
const SuggestPaperStyled = styled(Paper)`
  margin-top:.5rem;
  margin-right:.5rem;
  height:11.2rem;
  background:white;
`;
const ALLOnlinePaperStyled = styled(Paper)`
  margin-top:.5rem;
  margin-right:.5rem;
  height:35rem;
  background:white;
`;
const ALLOnlineItemGridStyled = styled(Grid)`
  overflow:auto;
  // margin-top:.5rem;
  margin-left:1rem;
  max-height:43rem;
  width: 97%;
  // background:orange;
`;
const ALLOnlineItemCardStyled = styled(Card)`
  width: 13rem;
`;

export default function MainUIRender(props) {
  const classes = useStyles();
  // const history = useHistory();

  // const [menuIndex, setMenuIndex] = React.useState(1);
  const handleClick = (index) => {
    // setOpen(!open);

    props.onClickMenu(index);
  };
  const handleClickMenuSub = (index) => {
    // setOpen(!open);

    props.onClickMenuSub(index);
  };

  // const [open, setOpen] = React.useState(false);
  // const handleClick = (index) => {
  //   setOpen(!open);
  // };

  const [isLoadingOpen, setLoadingOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");

  async function handleSearch(s_text){
    // if(searchText=="")
    //   return;

    // try{
    //   setLoadingOpen(true);

    //   //
    // }catch(Exception)
    // {
    //   alert(Exception);
    // }finally{
    //   setLoadingOpen(false);
    // }

    props.onClickSearch(s_text);
  }
  function handleSearchKeyDown(e){
    if(e.key == 'Enter'){
      handleSearch(searchText);
    }
  }
  function handleRefresh(){
    handleSearch("");
    setSearchText("");
  }

  return (
    <div className={classes.root}>
      <StoreListStyled>
        {/* <ListItem button align="center" onClick={()=>{props.onClickAddStore()}}>
          <ListItemIcon>
            <AddCircleOutlineIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary="เพิ่มร้านสาขา" />
        </ListItem> */}

        <List>
          <ListItem>
           <InputBase 
              placeholder="รหัสร้านสาขา" 
              value = {searchText}
              onChange={e => setSearchText(e.target.value)}
              onKeyPress={handleSearchKeyDown} 
            />
            <ListItemSecondaryAction>
              <ListItem>
                <IconButton edge="end" color='primary' onClick={() => {handleSearch(searchText)}} className={classes.menuButton}>
                  <SearchIcon />
                </IconButton>
                <IconButton edge="end" color='primary' onClick={handleRefresh}  className={classes.menuButton}>
                  <RefreshIcon />
                </IconButton>
              </ListItem>
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        {
          props.storeList.map(store=>{
            return <div>
              <Divider />
              <ListItem button align="center" onClick={()=>{handleClick(store.index)}}>
                <ListItemIcon>
                  <StorefrontIcon color='primary' />
                </ListItemIcon>
                <ListItemText primary={store.store_id+" "+store.store_name} />
                {(props.menuIndex==store.index) ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={props.menuIndex==store.index} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested} onClick={()=>{handleClickMenuSub(1)}}>
                    <ListItemText primary="รายการขายย้อนหลัง" />
                  </ListItem>
                </List>
              </Collapse>
            </div>
          })
        }
      </StoreListStyled>

      <Loading 
        isOpen={isLoadingOpen}
      />
    </div>
  );
}