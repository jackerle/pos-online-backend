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
} from '@material-ui/core'

//private
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { numberWithCommas } from '../../utility/formathelper';
import AllMemberSign from './AllMemberSign';
import AlertClearMember from './AlertClearMember';

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
    total:{
      fontSize:'3em',
      color:'#21509B'
    },
    allmembername:{
      fontSize:'1.2em',
      color:'#21509B'
    },
}));

//Styled Component Section
const SummaryListStyled = styled(List)`
  background:white;
`;

export default function MainUIRender(props) {
  const classes = useStyles();
  // const history = useHistory();

  const [isAllMemberOpen, setAllMemberOpen] = React.useState(false);
  const handleAllMemberMenuClick = () => {
    setAllMemberOpen(!isAllMemberOpen);
  };

  const [member, setMember] = React.useState({
    tel_no:"",
    user_name:"",
  });
  const handleAllMemberSign = (memberInfo) => {
    handleAllMemberMenuClick();

    setMember({...member, 
      tel_no:memberInfo.member_code,
      user_name:memberInfo.name+" "+memberInfo.lastname
    });
  };

  const [isAlertClearMemberOpen, setClearMemberOpen] = React.useState(false);
  const handleClearMemberMenuOpen = () => {

    if(member.tel_no == ""){
      setAllMemberOpen(true);
    }else{
      setClearMemberOpen(true);
    }
  };
  const handleClearMemberMenuClose = () => {
    setClearMemberOpen(false);
  };
  const handleClearMember = () => {
    handleClearMemberMenuClose();

    setMember({
      tel_no:"",
      user_name:"",
    });
  }

  return (
    <div className={classes.root}>
        <SummaryListStyled>
          <ListItem button onClick={handleClearMemberMenuOpen}>
            <ListItemText primary="สมาชิก ALL member" />
            {
              member.tel_no==""?
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={handleAllMemberMenuClick}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              :
                <ListItemSecondaryAction>
                  <ListItemText classes={{primary:classes.allmembername}} primary={member.user_name}/>
                </ListItemSecondaryAction>
            }
          </ListItem>
          <ListItem>
            <ListItemText primary="ยอดรวม"/>
            <ListItemSecondaryAction>
              <ListItemText classes={{primary:classes.total}} 
                primary={numberWithCommas(props.subtotal)}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider/>
          <ListItem>
            <Button variant="contained" color="primary" fullWidth="true" onClick={props.onPayment}>ชำระเงิน</Button>
          </ListItem>
        </SummaryListStyled>

        <AllMemberSign 
          isOpen = {isAllMemberOpen}
          handleOnClose = {handleAllMemberMenuClick}
          handleOnSignAllmember = {handleAllMemberSign}
        />
        <AlertClearMember
          isOpen={isAlertClearMemberOpen}
          onMenuNo={handleClearMemberMenuClose}
          onMenuYes={handleClearMember}
        />
    </div>
  );
}