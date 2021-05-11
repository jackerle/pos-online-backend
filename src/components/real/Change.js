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
import Numpad from './Numpad'
import Loading from './Loading'
import { numberWithCommas } from '../../utility/formathelper';

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
    styledHeader: {
      background: '#21509B',
      '& h2': {
        color: 'white',
      }
  }
}));

//Styled Component Section
const ChangeListStyled = styled(List)`
  width:16rem;
`;
const DialogStyled = styled(Dialog)`
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
  async function handleCloseChange(){
    props.onCloseChange();
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
      <DialogTitle className={classes.styledHeader} align='center'>รับชำระสำเร็จ</DialogTitle>
      <DialogContent dividers>
        <ChangeListStyled>
          <ListItem>
            <ListItemText primary="เงินทอน"/>
            <ListItemSecondaryAction>
              <ListItemText classes={{primary:classes.total}} 
                primary={numberWithCommas(props.change_amount)}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </ChangeListStyled>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleCloseChange}>
          ปิดหน้าจอ
        </Button>
      </DialogActions>
    </DialogStyled>

    <Loading 
      isOpen={isLoadingOpen}
    />
  </div>
  );
}