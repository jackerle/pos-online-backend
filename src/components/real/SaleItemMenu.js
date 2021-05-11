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
  Backdrop , CircularProgress , 
} from '@material-ui/core'

//private
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { numberWithCommas } from '../../utility/formathelper';
import DeleteIcon from '@material-ui/icons/Delete';
import AlertDeleteSaleItem from './AlertDeleteSaleItem';

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
      fontSize:'2em',
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
const DialogTitleStyled = styled(DialogTitle)`
  color:'#ff0000';
`;

export default function MainUIRender(props) {
  const classes = useStyles();
  // const history = useHistory();

  let [qty, setQty] = React.useState(1);
  function handleAdd(){
    let q = qty>=99?99:qty+1;
    setQty(q);

    setTotalAmount(q*(props.selectedSaleItem==undefined?1:props.selectedSaleItem.unit_price));
  }
  function handleMinus(){
    let q = qty<=1?1:qty-1;
    setQty(q);

    setTotalAmount(q*(props.selectedSaleItem==undefined?1:props.selectedSaleItem.unit_price));
  }

  const [isAlertDeleteOpen, setAlertDeleteOpen] = React.useState(false);
  const handleDeleteClick = () => {
    setAlertDeleteOpen(!isAlertDeleteOpen);
  };
  const handleDeleteItem = () => {
    setAlertDeleteOpen(!isAlertDeleteOpen);

    props.onDeleteItem();
  };

  let [totalAmount, setTotalAmount] = React.useState(0);

  //initial
  useEffect(() => {
    setQty(props.selectedSaleItem==undefined?1:props.selectedSaleItem.qty);
    setTotalAmount(props.selectedSaleItem==undefined?1:props.selectedSaleItem.total_amount);
  }, [props]);

  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.onSaleItemMenuClose}
      >
        <DialogTitleStyled className={classes.styledHeader} align="center">
          {props.selectedSaleItem==undefined?"":props.selectedSaleItem.product_name}
        </DialogTitleStyled>
        <DialogContent dividers>
          <List>
            <ListItem>
            <ListItemText primary="จำนวน (ชิ้น)" />
              <IconButton color='primary' onClick={handleMinus}>
                <RemoveCircleOutlineIcon />
              </IconButton>
              {qty}
              <IconButton color='primary' onClick={handleAdd}>
                <AddCircleOutlineIcon />
              </IconButton>
              <ListItemSecondaryAction>
                <IconButton edge="end" color='primary' onClick={handleDeleteClick}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="ราคาต่อชิ้น"/>
                <ListItemSecondaryAction>
                  <ListItemText 
                  primary={numberWithCommas(props.selectedSaleItem==undefined?0:props.selectedSaleItem.unit_price)}/>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemText primary="ยอดรวม"/>
                <ListItemSecondaryAction>
                  <ListItemText classes={{primary:classes.total}} primary={numberWithCommas(totalAmount)}/>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={props.onSaleItemMenuClose}>
            กลับ
          </Button>
          <Button color="primary" onClick={()=>{props.onConfirmQty(qty)}}>
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>

      <AlertDeleteSaleItem
        isOpen={isAlertDeleteOpen}
        onMenuNo={handleDeleteClick}
        onMenuYes={handleDeleteItem}
      />
    </div>
  );
}