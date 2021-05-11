import React , {useEffect}  from 'react';
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
  Backdrop , CircularProgress , 
} from '@material-ui/core'

//private
import axios from 'axios';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import Numpad from '../../components/real/Numpad'
import Loading from '../../components/real/Loading'

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
      fontSize:'15px'
    },
    styledHeader: {
        background: '#21509B',
        '& h2': {
          color: 'white',
        }
    }
}));

//Styled Component Section
const SummaryListStyled = styled(List)`
  background:white;
`;
const DialogStyled = styled(Dialog)`
  // width:40rem;
`;

export default function MainUIRender(props) {
  const classes = useStyles();
  // const history = useHistory();

  const [isLoadingOpen, setLoadingOpen] = React.useState(false);

  const [telNo, setTelno] = React.useState("");
  const handleNumberClick = (number) => {
    setTelno(telNo+number);
  }
  const handleBackSpaceClick = () => {
    setTelno(telNo.substring(0,telNo.length-1));
  }
  async function handleEnterClick(){
    //call api here
    try{
      setLoadingOpen(true);

      let apiRequest={
          "jsonrpc": "2.0",
          "result": {
              "channelinfo": {
                  "channel": "posmobile"
              },
              "payload": {
                  "store_id": "03791",
                  "tel_no": telNo,
              }
          },
          "id": 0
      };

      const apiResponse = await axios.post('https://55s5847gd0.execute-api.ap-southeast-1.amazonaws.com/dev/inquirymember'
                                          , apiRequest);
      
      if(apiResponse.data!=undefined)
      {
        if(apiResponse.data.result.apiresult.issuccess==false)
        {
          alert("["+apiResponse.data.result.apiresult.returncode+"] "+
                  apiResponse.data.result.apiresult.message);
        }else
        {
          let userInfo = {
            name:apiResponse.data.result.payload.member_info.name,
            lastname:apiResponse.data.result.payload.member_info.lastname,
            member_id:apiResponse.data.result.payload.member_info.member_id,
            member_code:apiResponse.data.result.payload.member_info.member_code,
          }

          props.handleOnSignAllmember(userInfo);
        }
      }

    }catch(ex)
    {
      //
    }finally
    {
      setLoadingOpen(false);
    }
  }

  useEffect(() => {
    setTelno("");
  }, [props]);

  return (
    <div>
      <DialogStyled 
          open={props.isOpen}
          onClose={props.handleOnClose}
          >
      <DialogTitle className={classes.styledHeader} align="center">กรุณาคีย์หมายเลขโทรศัพท์ลูกค้า</DialogTitle>
      <DialogContent dividers>
        <Grid container>
          <Grid item xs={7}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem>
                <ListItemIcon>
                  <PhoneIphoneIcon />
                </ListItemIcon>
                <TextField fullWidth='true' label="หมายเลขโทรศัพท์" variant="outlined" value={telNo} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={5}>
            <Numpad 
              mode = {"withoutdot"}
              onNumberClick = {handleNumberClick}
              onEnterClick = {handleEnterClick}
              onBackSpaceClick = {handleBackSpaceClick}
            /> 
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleEnterClick}>
          ยืนยันตัวตนสมาชิก
        </Button>
      </DialogActions>
    </DialogStyled>

    <Loading 
      isOpen={isLoadingOpen}
    />
  </div>
  );
}