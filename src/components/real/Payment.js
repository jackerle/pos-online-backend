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
  TextField , DialogActions , CardActionArea , CardMedia , CardContent , AppBar , Toolbar , Chip ,
  Backdrop , CircularProgress , Tabs , Tab ,
} from '@material-ui/core'

//private
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { numberWithCommas } from '../../utility/formathelper';
import DeleteIcon from '@material-ui/icons/Delete';
import AlertDeleteSaleItem from './AlertDeleteSaleItem';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Numpad from '../../components/real/Numpad'
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import Change from '../../components/real/Change'

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
      fontSize:'1.5em',
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
const SummaryListStyled = styled(List)`
  background:white;
`;
const DialogStyled = styled(Dialog)`
`;
const TenderPaperStyled = styled(Paper)`
  width:22rem;
  height:25rem;
`;
const PaymentPaperStyled = styled(Paper)`
  width:12.5rem;
  height:17rem;
`;

export default function MainUIRender(props) {
  const classes = useStyles();
  // const history = useHistory();

  //initial
  const [paymentAmount, setPaymentAmount] = React.useState(0);
  const [paymentBarcode, setPaymentBarcode] = React.useState("");
  const [cashAmount, setCashAmount] = React.useState("");
  const [requireAmount, setRequireAmount] = React.useState(0);
  const handleNumberClick = (number) => {

    switch(tabindex){
      case 0:{
        let updateNumber = cashAmount+""+number;

        setCashAmount(updateNumber);
        setPaymentAmount(parseFloat(updateNumber==""?0:updateNumber));
      }break;
      case 1:{
        let updateNumber = paymentBarcode+""+number;

        setPaymentBarcode(updateNumber);
      }break;
    }
  }
  const handleBackSpaceClick = () => {

    switch(tabindex){
      case 0:{
        let updateNumber = cashAmount.substring(0,cashAmount.length-1);

        setCashAmount(updateNumber);
        setPaymentAmount(parseFloat(updateNumber==""?0:updateNumber));
      }break;
      case 1:{
        let updateNumber = paymentBarcode.substring(0,paymentBarcode.length-1);

        setPaymentBarcode(updateNumber);
      }break;
    }
  }
  const handleDotClick = () => {
    if(cashAmount.indexOf(".")!=-1)
      return;

    let updateNumber = cashAmount+".";
    
    setCashAmount(updateNumber);
    setPaymentAmount(parseFloat(updateNumber==""?0:updateNumber));
  }
  const handleEnterClick = () => {
    if(paymentBarcode=="" && tabindex==1)
        return;

    setChangeScreenOpen(true);
  }

  const [tabindex, setTabIndex] = React.useState(0);
  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);

    //clear last data
    setPaymentAmount(0);
    setCashAmount("");
    setPaymentBarcode("");
  };
  function a11yProps(index) {
    return {
      id: `wrapped-tab-${index}`,
      'aria-controls': `wrapped-tabpanel-${index}`,
    };
  }
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const [changeScreenOpen, setChangeScreenOpen] = React.useState(false);
  const handleChangeScreenOpen = () => {

    if((cashAmount<requireAmount && tabindex==0) 
      || (paymentBarcode=="" && tabindex==1))
        return;

    setChangeScreenOpen(true);
  }
  const handleCloseChange = () => {
    setChangeScreenOpen(false);
    props.onCloseChange();
  }

  useEffect(() => {
    setPaymentAmount(0);
    setCashAmount("");
    setPaymentBarcode("");
    setRequireAmount(props.subtotal_amount - props.discount_amount);
  }, [props]);

  return (
    <div>
      <DialogStyled
        open={props.isOpen}
        onClose={props.onSaleItemMenuClose}
      >
        <DialogTitle className={classes.styledHeader} align="center">
          ชำระเงิน ( ทั้งหมด {props.total_qty} ชิ้น {numberWithCommas(props.subtotal_amount)} บาท )
        </DialogTitle>
        <DialogContent dividers>
          <Grid container>
            <Grid item xs={8}>
              <TenderPaperStyled elevation={2}>
                <Tabs 
                  variant="fullWidth"
                  value={tabindex} 
                  onChange={handleChangeTab}
                >
                  <Tab label="ชำระเงินสด" {...a11yProps(0)} />
                  <Tab label="ชำระด้วย True Money Wallet" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={tabindex} index={0}>
                  <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                      <ListItemIcon>
                        <AttachMoneyIcon />
                      </ListItemIcon>
                      <TextField 
                        align='left' 
                        fullWidth='true' 
                        label="ยอดเงินรับมา" 
                        variant="outlined" 
                        value={cashAmount} />
                    </ListItem>
                    <ListItem>
                      <Numpad 
                        mode = {"withdot"}
                        onNumberClick = {handleNumberClick}
                        onBackSpaceClick = {handleBackSpaceClick}
                        onDotClick = {handleDotClick}
                      /> 
                    </ListItem>
                  </List>
                </TabPanel>
                <TabPanel value={tabindex} index={1}>
                  <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                      <ListItemIcon>
                        <HorizontalSplitIcon />
                      </ListItemIcon>
                      <TextField 
                        align='left' 
                        fullWidth='true' 
                        label="บาร์โค้ดรับชำระ" 
                        variant="outlined" 
                        value={paymentBarcode} />
                    </ListItem>
                    <ListItem>
                      <Numpad 
                        mode = {"withoutdot"}
                        onNumberClick = {handleNumberClick}
                        onEnterClick = {handleEnterClick}
                        onBackSpaceClick = {handleBackSpaceClick}
                      /> 
                    </ListItem>
                  </List>
                </TabPanel>
              </TenderPaperStyled>
            </Grid>
            <Grid item xs={4}>
              <PaymentPaperStyled elevation={2}>
                <SummaryListStyled>
                  <ListItem>
                    <ListItemText primary="ยอดรวม"/>
                    <ListItemSecondaryAction>
                      <ListItemText primary={numberWithCommas(props.subtotal_amount)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="ส่วนลด"/>
                    <ListItemSecondaryAction>
                      <ListItemText primary={numberWithCommas(props.discount_amount)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="ยอดที่ต้องชำระ"/>
                    <ListItemSecondaryAction>
                      <ListItemText classes={{primary:classes.total}} primary={numberWithCommas(requireAmount)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider/>
                  <ListItem>
                    <ListItemText primary="ยอดเงินรับมา"/>
                    <ListItemSecondaryAction>
                      <ListItemText classes={{primary:classes.total}} primary={numberWithCommas(paymentAmount)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth="true"
                      onClick={handleChangeScreenOpen}
                    >
                      ยืนยันชำระเงิน
                    </Button>
                  </ListItem>
                </SummaryListStyled>
              </PaymentPaperStyled>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={props.onPaymentClose}>
            กลับ
          </Button>
        </DialogActions>
      </DialogStyled>

      <Change 
        isOpen = {changeScreenOpen}
        change_amount = {tabindex==0?cashAmount-requireAmount:0}
        onCloseChange = {handleCloseChange}
      />
    </div>
  );
}