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
  InputBase ,
} from '@material-ui/core'

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
import ReceiptIcon from '@material-ui/icons/Receipt';
import LockIcon from '@material-ui/icons/Lock';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DownIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';
import RefreshIcon from '@material-ui/icons/Refresh';
import SaveIcon from '@material-ui/icons/Save';

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
    listItemDetail:{
      fontSize:'1.2em',//Insert your required size
      fontWeight:'regular',
      color:'#438B63'
    },
    input: {
      color:'#438B63',
    },
    inputRight: {
      color:'#438B63',
      textAlign: "right",
      align: "right",
      '& input': {
        textAlign: "right"
      },
    },
}));

//Styled Component Section
const HeaderListStyled = styled(List)`
  // background:orange;
  margin-right:2rem;
`;
const PaperStyled = styled(Paper)`
  width:95%;
  height:80%;
  background:White;
  margin-left:1rem;
  margin-right:1rem;
`;

export default function MainUIRender(props) {
  const classes = useStyles();
  // const history = useHistory();

  const [store_id, setStoreId] = React.useState("");
  const [store_name, setStoreName] = React.useState("");
  const [pos_no, setPOSNo] = React.useState(1);
  const [business_date, setBusinessDate] = React.useState("");
  const [shift_no, setShiftNo] = React.useState(1);
  const [max_shift, setMaxShift] = React.useState(3);
  const [version, setVersion] = React.useState("");
  const [tax_id, setTaxId] = React.useState("");
  const [vat_code, setVatCode] = React.useState("");
  const [start_common_trn, setStartCommonTrn] = React.useState(1000000);
  const [start_receipt_no, setStartReceiptNo] = React.useState(1000000000);
  const [address1, setAddress1] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [address3, setAddress3] = React.useState("");
  const [address4, setAddress4] = React.useState("");

  return (
    <div className={classes.root}>
      <HeaderListStyled>
        <ListItem>
          <ListItemText primary="เพิ่มร้านสาขา"/>
          <ListItemSecondaryAction>
            <IconButton edge="end" color='primary'>
              <SaveIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </HeaderListStyled>
      <PaperStyled elevation={0}>
        <Grid container>
          <Grid item xs={3}>
            <List>
              <ListItem>
                <ListItemText primary="รหัสสาขา" />
                <ListItemSecondaryAction>
                  <InputBase className={classes.inputRight} fullWidth='true'
                    placeholder="คีย์ข้อมูล"
                    value={store_id}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem>
                <ListItemText primary="ชื่อร้าน" />
                <ListItemSecondaryAction>
                  <InputBase className={classes.inputRight} fullWidth='true'
                    placeholder="คีย์ข้อมูล" 
                    value={store_name}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3}>
            <List>
              <ListItem>
                <ListItemText primary="เครื่อง" />
                <ListItemSecondaryAction>
                  <InputBase className={classes.inputRight}
                    placeholder="คีย์ข้อมูล"
                    value={pos_no}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3}>
            <List>
              <ListItem>
                <ListItemText primary="วันที่ปฏิบัติงาน" />
                <ListItemSecondaryAction>
                  <InputBase className={classes.inputRight}
                    placeholder="YYYY-MM-DD"
                    value={business_date}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3}>
            <List>
              <ListItem>
                <ListItemText primary="ผลัด" />
                <ListItemSecondaryAction>
                  <InputBase className={classes.inputRight}
                    placeholder="คีย์ข้อมูล"
                    value={shift_no}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3}>
            <List>
              <ListItem>
                <ListItemText primary="Max Shift" />
                <ListItemSecondaryAction>
                  <InputBase className={classes.inputRight}
                    placeholder="คีย์ข้อมูล"
                    value={max_shift}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3}>
            <List>
              <ListItem>
                <ListItemText primary="เวอร์ชัน" />
                <ListItemSecondaryAction>
                  <InputBase className={classes.inputRight}
                    placeholder="คีย์ข้อมูล"
                    value={version}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3}>
            <List>
              <ListItem>
                <ListItemText primary="POS Tax Id" />
                <ListItemSecondaryAction>
                  <InputBase className={classes.inputRight}
                    placeholder="คีย์ข้อมูล"
                    value={tax_id}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3}>
            <List>
              <ListItem>
                <ListItemText primary="Vat Code" />
                <ListItemSecondaryAction>
                  <InputBase className={classes.inputRight}
                    placeholder="คีย์ข้อมูล"
                    value={vat_code}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3}>
            <List>
              <ListItem>
                <ListItemText primary="Common Trn เริ่มต้น" />
                <ListItemSecondaryAction>
                  <InputBase className={classes.inputRight}
                    placeholder="คีย์ข้อมูล"
                    value={start_common_trn}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3}>
            <List>
              <ListItem>
                <ListItemText primary="เลขที่ใบเสร็จ เริ่มต้น" />
                <ListItemSecondaryAction>
                  <InputBase className={classes.inputRight}
                    placeholder="คีย์ข้อมูล"
                    value={start_receipt_no}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3}>
            <List>
              <ListItem>
                <ListItemText primary="Address1" />
                <ListItemSecondaryAction>
                  <InputBase className={classes.inputRight}
                    placeholder="คีย์ข้อมูล"
                    value={address1}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3}>
            <List>
              <ListItem>
                <ListItemText primary="Address2" />
                <ListItemSecondaryAction>
                  <InputBase className={classes.inputRight}
                    placeholder="คีย์ข้อมูล"
                    value={address2}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3}>
            <List>
              <ListItem>
                <ListItemText primary="Address3" />
                <ListItemSecondaryAction>
                  <InputBase className={classes.inputRight}
                    placeholder="คีย์ข้อมูล"
                    value={address3}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3}>
            <List>
              <ListItem>
                <ListItemText primary="Address4" />
                <ListItemSecondaryAction>
                  <InputBase className={classes.inputRight}
                    placeholder="คีย์ข้อมูล"
                    value={address4}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </PaperStyled>
    </div>
  );
}