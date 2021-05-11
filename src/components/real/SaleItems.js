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
import bread_image from '../../static/image/bread.png';
import { numberWithCommas } from '../../utility/formathelper'
import AlertClearSaleItem from './AlertClearSaleItem'
import DeleteIcon from '@material-ui/icons/Delete';
import SaleItemMenu from './SaleItemMenu'
import default_noimage from '../../static/image/no_image.png';

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
    total:{
      fontSize:'15px'
    },
}));

//Styled Component Section
// const SaleItemListStyled = styled(Paper)`
//   background:white;
//   height: 17.5rem;
// `;
const CancelListStyled = styled(List)`
  background:white;
`;

const SaleItemListStyled = styled(List)`
  height: 29rem;
  overflow:auto;
  background:white;
`;

export default function MainUIRender(props) {
  const classes = useStyles();
  // const history = useHistory();

  const [isAlertClearOpen, setAlertClearOpen] = React.useState(false);
  const handleClearClick = () => {

    if(props.totalqty<=0) return;
    
    setAlertClearOpen(!isAlertClearOpen);
  };
  const handleClearItems = () => {
    setAlertClearOpen(!isAlertClearOpen);

    props.onClearItems();
  };

  const [isSaleItemMenuOpen, setIsSaleItemMenuOpen] = React.useState(false);
  const [selectedSaleItem, setSelectedSaleItem] = React.useState(undefined);
  const handleSaleItemClick = (saleItem) => {
    setIsSaleItemMenuOpen(true);

    setSelectedSaleItem(saleItem);
  };
  const handleSaleItemClose = () => {
    setIsSaleItemMenuOpen(false);
  };

  const handleOnConfirmQty = (qty) => {
    handleSaleItemClose();

    props.onConfirmQty(selectedSaleItem , qty);
  }

  const handleOnDeleteItem = () => {
    handleSaleItemClose();

    props.onDeleteItem(selectedSaleItem);
  }

  const onMediaFallback = event => event.target.src = default_noimage;

  return (
    <div className={classes.root}>
      <Divider/>
      <SaleItemListStyled>
        {
          props.saleitems.length<=0?
          <div/>
          :
          props.saleitems.map(item=>{
            return <ListItem button onClick={()=>{handleSaleItemClick(item)}}>
                    <ListItemIcon>
                      <img src={item.image_url} width="40" height="40" onError={onMediaFallback}/>
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.product_name} 
                      secondary={item.qty +" x "
                        + numberWithCommas(item.unit_price) +" บาท"} />
                    <ListItemSecondaryAction>
                      <ListItemText primary={numberWithCommas(item.total_amount)} />
                    </ListItemSecondaryAction>
                  </ListItem>;
          })
        }
      </SaleItemListStyled>
      <CancelListStyled>
        <Divider/>
        <ListItem>
          <Button variant="outlined" color="primary" fullWidth="true" onClick={handleClearClick}>
            ยกเลิกทั้งหมด ({props.totalqty} ชิ้น)
          </Button>
        </ListItem>
      </CancelListStyled>

      <AlertClearSaleItem
        isOpen={isAlertClearOpen}
        onMenuNo={handleClearClick}
        onMenuYes={handleClearItems}
      />
      <SaleItemMenu 
        isOpen={isSaleItemMenuOpen}
        onSaleItemMenuClose = {handleSaleItemClose}
        selectedSaleItem = {selectedSaleItem}
        onConfirmQty = {handleOnConfirmQty}
        onDeleteItem = {handleOnDeleteItem}
      />
    </div>
  );
}