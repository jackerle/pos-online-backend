import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { useHistory , useLocation  , Redirect } from 'react-router-dom';

//Marterial UI Section
import { makeStyles } from '@material-ui/core/styles';
import { 
  Drawer , Grid  , List , ListItem , ListItemIcon , ListItemText , Divider, Paper ,
  Card , Typography , Button , Box , ListItemAvatar , Avatar , IconButton , Badge ,
  ListItemSecondaryAction , ButtonGroup , Container , Dialog , DialogTitle , DialogContent , DialogContentText ,
  TextField , DialogActions , CardActionArea , CardMedia , CardContent , AppBar , Toolbar ,
  Backdrop , CircularProgress ,
} from '@material-ui/core'

//Private Section
import axios from 'axios';
import APPBar from '../../components/real/AppBar'
import Onetouch from '../../components/real/Onetouch'
import SaleSummary from '../../components/real/SaleSummary'
import SaleItems from '../../components/real/SaleItems'
import Loading from '../../components/real/Loading'
import Payment from '../../components/real/Payment'

//css
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background:'#eff6ff',
  },
  grid: {
  },
  backdrop:{
    background:'red',
  }
}));

//Styled Component Section
const GridStyled = styled(Grid)`
`;

export default function MainUIRender(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  let user_info=location.state.user_info;
  let store_info=location.state.store_info;

  const [isLoadingOpen, setLoadingOpen] = React.useState(false);

  const [saleData, setSaleData] = React.useState(
    {
      total_qty:0,
      total_amount:0,
      subtotal_amount:0,
      discount_amount:0,
      sale_items:[
      ]
    });

  const handleClearItems = () => {
      setSaleData({...saleData, 
        total_qty:0,
        total_amount:0,
        subtotal_amount:0,
        discount_amount:0,
        sale_items:[
      ]});
    };

  const handleOnConfirmQty = (selectedSaleItem , qty) => {
    
    let saleItems = saleData.sale_items;

    //edit qty
    let index = selectedSaleItem.index-1;
    saleItems[index].qty = qty;
    saleItems[index].total_amount = qty * saleItems[index].unit_price;

    var subtotal_amount = 0;
    var total_qty = 0;
    for (var i = 0; i < saleItems.length; i++)
    {
      subtotal_amount += saleItems[i].total_amount;
      total_qty += saleItems[i].qty;
    }

    setSaleData({...saleData, 
      subtotal_amount:subtotal_amount,
      total_amount:subtotal_amount,
      total_qty:total_qty,
      sale_items:saleItems});
  }

  const handleOnDeleteItem = (selectedSaleItem) => {
    let saleItems = saleData.sale_items;

    //remove specific index
    let index = selectedSaleItem.index-1;
    saleItems = saleItems.filter(function(item) {
        return item.index !== (index+1)
    });

    var subtotal_amount = 0;
    var total_qty = 0;
    for (var i = 0; i < saleItems.length; i++)
    {
      subtotal_amount += saleItems[i].total_amount;
      total_qty += saleItems[i].qty;
      saleItems[i].index = i+1;
    }

    setSaleData({...saleData, 
      subtotal_amount:subtotal_amount,
      total_amount:subtotal_amount,
      total_qty:total_qty,
      sale_items:saleItems});
  }

  async function handleScanItem(barcode)
  {
    // setSaleData({...saleData, sale_items:[]});
    setLoadingOpen(true);

    let apiRequest={
                    "jsonrpc": "2.0",
                    "result": {
                        "channelinfo": {
                            "channel": "posmobile"
                        },
                        "payload": {
                            "store_id": "03791",
                            "barcode": barcode
                        }
                    },
                    "id": 0
                };

    try {
      const apiResponse = await axios.post('https://55s5847gd0.execute-api.ap-southeast-1.amazonaws.com/dev/sale'
                                          , apiRequest);
      
      if(apiResponse.data!=undefined)
      {
        if(apiResponse.data.result.apiresult.issuccess==false)
        {
          alert("["+apiResponse.data.result.apiresult.returncode+"] "+
                  apiResponse.data.result.apiresult.message);
        }else
        {
          let sale_item = {
            product_name:apiResponse.data.result.payload.products.name,
            qty:1,
            unit_price:apiResponse.data.result.payload.products.unitprice,
            total_amount:apiResponse.data.result.payload.products.unitprice,
            image_url:apiResponse.data.result.payload.products.image_url,
            product_code:apiResponse.data.result.payload.products.code,
            pma:apiResponse.data.result.payload.products.pma,
            cat:apiResponse.data.result.payload.products.cat,
            subcat:apiResponse.data.result.payload.products.subcat,
            index:saleData.sale_items.length+1,
            barcode:barcode,
            product_type:"7-eleven",
          }

          let saleItems = saleData.sale_items;
          saleItems.push(sale_item);
          var subtotal_amount = 0;
          for (var i = 0; i < saleItems.length; i++)
          {
            subtotal_amount += saleItems[i].total_amount;
          }

          //replace
          // https://d20udxyymuja1w.cloudfront.net/image/3800328/3800328.png => prd
          //https://d32b1e4i25wpmh.cloudfront.net/image/8700308/8700308.png => dev
          sale_item.image_url = sale_item.image_url.replace("d32b1e4i25wpmh.","d20udxyymuja1w.");

          setSaleData({...saleData, 
            subtotal_amount:subtotal_amount,
            total_amount:subtotal_amount,
            total_qty:saleItems.length,
            sale_items:saleItems});
        }
      }
    } catch (err) {
      alert(err);
    }finally
    {
      setLoadingOpen(false);
    }
  }

  function handleClickAllOnlineItem(sale_item){
    //

    //set index
    sale_item.index=saleData.sale_items.length+1;

    let saleItems = saleData.sale_items;
    saleItems.push(sale_item);
    var subtotal_amount = 0;
    for (var i = 0; i < saleItems.length; i++)
    {
      subtotal_amount += saleItems[i].total_amount;
    }

    setSaleData({...saleData, 
      subtotal_amount:subtotal_amount,
      total_amount:subtotal_amount,
      total_qty:saleItems.length,
      sale_items:saleItems});
  }

  const [isPaymentOpen, setPaymentOpen] = React.useState(false);
  const handlePaymentOpen = () => {
    setPaymentOpen(true);
  }
  const handlePaymentClose = () => {
    setPaymentOpen(false);
  }
  async function handlePayment(){
    try{
      if(saleData.sale_items.length<=0)
        return;

      setLoadingOpen(true);

      let apiRequest = {
          "jsonrpc": "2.0",
          "result": {
              "channelinfo": {
                  "channel": "posmobile"
              },
              "payload": {
                  "storeid": "03791",
                  "saledate": "2020-12-14 18:23:06.000",
                  "products": [
                  ],
                  "payments": [
                    {
                      "tender_type": "cash",
                      "receive_amount": 0,
                      "change_amount": 0,
                      "barcode": ""
                    }
                  ],
                  "redeems": {},
                  "issue": {
                      "stamp_type": "physical"
                  },
                  "coupons": [],
                  "tel_no": "",
                  "member_id": "",
                  "total_amount": 0
              }
          },
          "id": 0
      };

      let total_amt = 0;
      for(let i=0;i<saleData.sale_items.length;i++)
      {
        if(saleData.sale_items[i].product_type != "7-eleven")
          continue;

        let product = {
          "name": saleData.sale_items[i].product_name,
          "code": saleData.sale_items[i].product_code,
          "barcode": saleData.sale_items[i].barcode,
          "unitprice": saleData.sale_items[i].unit_price,
          "pma": saleData.sale_items[i].pma,
          "cat": saleData.sale_items[i].cat,
          "subcat": saleData.sale_items[i].subcat,
          "qty": saleData.sale_items[i].qty,
          "image_url": ""
        }

        total_amt += saleData.sale_items[i].unit_price;

        apiRequest.result.payload.products.push(product);
      }
      apiRequest.result.payload.total_amount = total_amt;
      apiRequest.result.payload.payments[0].receive_amount = total_amt;

      //call api
      const apiResponse = await axios.post('https://55s5847gd0.execute-api.ap-southeast-1.amazonaws.com/dev/inquirypromotion'
                                          , apiRequest);

      if(apiResponse.data!=undefined)
      {
        if(apiResponse.data.result.apiresult.issuccess==false)
        {
          alert("["+apiResponse.data.result.apiresult.returncode+"] "+
                  apiResponse.data.result.apiresult.message);
        }else
        {
          let discount_amt = 0;
          for(let i=0;i<apiResponse.data.result.payload.promotions.length;i++){
            discount_amt += apiResponse.data.result.payload.promotions[i].discount_amount;
          } 

          setSaleData({...saleData, 
            discount_amount:discount_amt});

          handlePaymentOpen();
        }
      }
    }catch(ex){
      //
    }finally{
      setLoadingOpen(false);
    }
  }

  const handleCloseChange = () => {
    handlePaymentClose();
    handleClearItems();
  }

  const [suspendItem, setSuspendItem] = React.useState("");
  const handleSuspendClick = () => {

    if(suspendItem=="")
    {
      if(saleData.sale_items.length<=0)
        return;
        
      //suspend
      let susItem = JSON.stringify(saleData);
      handleClearItems();
      setSuspendItem(susItem);
    }else
    {
      //resume
      let resumeData = JSON.parse(suspendItem);

      let saleItems = saleData.sale_items;
      for(let i=0;i<resumeData.sale_items.length;i++)
      {
        saleItems.push(resumeData.sale_items[i]);
      }

      var subtotal_amount = 0;
      var total_qty = 0;
      for (var i = 0; i < saleItems.length; i++)
      {
        subtotal_amount += saleItems[i].total_amount;
        total_qty += saleItems[i].qty;
        saleItems[i].index = i+1;
      }

      setSaleData({...saleData, 
        subtotal_amount:subtotal_amount,
        total_amount:subtotal_amount,
        total_qty:saleItems.length,
        sale_items:saleItems});

      setSuspendItem("");
    }
  }

  return (
    <div className={classes.root}>
      <APPBar 
        store_name={"ร้าน 7-Eleven "+store_info.id + " " + store_info.name}
        user={user_info}
        onScanBarcode = {handleScanItem}
        suspend_item = {suspendItem}
        onSuspendItemClick = {handleSuspendClick}
        >
      </APPBar>
      <GridStyled container>
        <Grid item xs={9}>
          <Onetouch
            onClickOnetouch={handleScanItem}
            onClickAllOnlineItem={handleClickAllOnlineItem}
          />
        </Grid>
        <Grid item xs={3}>
          <SaleSummary 
            subtotal={saleData.subtotal_amount}
            discount={saleData.discount_amount}
            total={saleData.total_amount}
            onPayment={handlePayment}
          />
          <SaleItems
            totalqty={saleData.total_qty}
            saleitems={saleData.sale_items}
            onClearItems={handleClearItems}
            onConfirmQty = {handleOnConfirmQty}
            onDeleteItem = {handleOnDeleteItem}
          />
        </Grid>
      </GridStyled>

      <Loading 
        isOpen={isLoadingOpen}
      />
      <Payment 
        isOpen={isPaymentOpen}
        total_qty={saleData.total_qty}
        subtotal_amount={saleData.subtotal_amount}
        discount_amount={saleData.discount_amount}
        onPaymentClose={handlePaymentClose}
        onCloseChange={handleCloseChange}
      />
    </div>
  );
}