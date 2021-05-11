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
  Collapse , CardActions , CardHeader, colors ,
} from '@material-ui/core'
import AtmIcon from '@material-ui/icons/LocalAtm';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';

//private
import all_online_image from '../../static/image/All-Online.png';
import kudsan_image from '../../static/image/kudson.png';
import allcafe_image from '../../static/image/all_cafe.png';
import drink_image from '../../static/image/Drink.png';
import eat_image from '../../static/image/Eatother.png';
import food_image from '../../static/image/Food.png';
import blend_image from '../../static/image/blender.png';
import bread_image from '../../static/image/bread.png';
import bubble_chat_image from '../../static/image/bubble-chat.png';
import cooking_image from '../../static/image/cooking.png';
import cool_image from '../../static/image/cool.png';
import dimsum_image from '../../static/image/dimsum.png';
import hot_image from '../../static/image/Hot.png';
import mixer_image from '../../static/image/mixer.png';
import pao_image from '../../static/image/pao.png';
import popcorn_image from '../../static/image/popcorn.png';
import sandwich_image from '../../static/image/sandwich.png';
import sausage_image from '../../static/image/sausage.png';
import { numberWithCommas } from '../../utility/formathelper';
import onetouchItems from '../../static/data/onetouch_config.json';
import flash_sale from '../../static/data/data_flashsale.json';
import new_item from '../../static/data/data_newitem.json';
import best_sale from '../../static/data/data_bestsale.json';

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
      paddingLeft: theme.spacing(4),
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
const OnetouchListStyled = styled(List)`
  height: 43.7rem;
  overflow:auto;
  background:white;
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

  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const [open2, setOpen2] = React.useState(false);
  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const [open3, setOpen3] = React.useState(false);
  const handleClick3 = () => {
    setOpen3(!open3);
  };

  const [open4, setOpen4] = React.useState(false);
  const handleClick4 = () => {
    setOpen4(!open4);
  };

  const [open5, setOpen5] = React.useState(false);
  const handleClick5 = () => {
    setOpen5(!open5);
  };

  const [open6, setOpen6] = React.useState(false);
  const handleClick6 = () => {
    setOpen6(!open6);
  };

  const [onetouchIndex, setOnetouchIndex] = React.useState(3);

  const onetouchName = [
    "คัดสรร -> เบเกอรี่",
    "คัดสรร -> ปั่น",
    "คัดสรร -> เย็น",
    "คัดสรร -> ร้อน",
    "คัดสรร -> ท๊อปปิ้ง",
    "ALL Cafe' -> ปั่น",
    "ALL Cafe' -> เย็น",
    "ALL Cafe' -> ร้อน",
    "ALL Cafe' -> ท๊อปปิ้ง",
    "เครื่องดื่ม -> กัฟ",
    "เครื่องดื่ม -> สเลอปี้",
    "เครื่องดื่ม -> เย็น",
    "เครื่องดื่ม -> ร้อน",
    "อาหารรองท้อง -> ไส้กรอก",
    "อาหารรองท้อง -> แซนวิช",
    "อาหารรองท้อง -> ติ่มซำ",
    "อาหารรองท้อง -> ซาลาเปา",
    "อาหารรองท้อง -> ป๊อปคอร์น",
    "Food Place -> ปรุงสด",
    "ALL Online -> Flash Sale",
    "ALL Online -> สินค้าขายดี",
    "ALL Online -> สินค้ามาใหม่",
  ];

  function handleClickOnetouch(barcode){
    //
    props.onClickOnetouch(barcode);
  }

  function handleClickAllOnlineItem(item){
    let sale_item;

    switch(onetouchIndex){
      case 19:{
        sale_item = {
          product_name:item.itemName,
          qty:1,
          unit_price:item.price.value,
          total_amount:item.price.value,
          image_url:item.imageUrl,
          product_code:item.productId,
          pma:"",
          cat:"",
          subcat:"",
          index:0,
          product_type:"allonline",
        }
      }break;
      case 20:
      case 21:{
        sale_item = {
          product_name:item.description.shortDescription,
          qty:1,
          unit_price:item.price.price.amount,
          total_amount:item.price.price.amount,
          image_url:item.attributes[0].value,
          product_code:item.id,
          pma:"",
          cat:"",
          subcat:"",
          index:0,
          product_type:"allonline",
        }
      }break;
    }

    props.onClickAllOnlineItem(sale_item);
  }

  function onetouchOffline(){
    return <div>
      <Typography align='left' variant='h6'>
        {onetouchName[onetouchIndex]}
      </Typography>
      <ItemGridStyled container spacing={1} justify="left">
        {
          onetouchItems[onetouchIndex].map(item=>{
            return <Grid item>
                    <OnetouchCardStyled>
                      <CardActionArea onClick={() => handleClickOnetouch(item.product_barcode)}>
                        <CardContent>
                          <Typography align='center'>
                            {item.product_name}
                          </Typography>
                          <Typography align='center'>
                            {numberWithCommas(item.product_unitprice)+" บาท"}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </OnetouchCardStyled>
                  </Grid>;
          })
        }
      </ItemGridStyled>
    </div>;
  }

  function onetouchAllOnline(){

    // alert(onetouchIndex);

    return <div>
      <Typography align='left' variant='h6'>
        {onetouchName[onetouchIndex]}
      </Typography>
      {
        onetouchIndex==19?flashsale_item():<div/>
      }
      {
        onetouchIndex==20?newsale_item():<div/>
      }
      {
        onetouchIndex==21?bestsale_item():<div/>
      }
    </div>;
  }
  function flashsale_item(){
    return <ALLOnlineItemGridStyled container spacing={1} justify="left">
      {
        flash_sale.campaignItems.map((item)=>{
          return <Grid item>
                  <ALLOnlineItemCardStyled>
                    <CardActionArea onClick={() => handleClickAllOnlineItem(item)}>
                      <CardContent>
                        <CardMedia
                          className={classes.media}
                          image={item.imageUrl}
                        />
                        <Typography align='center'>
                          {item.itemName}
                        </Typography>
                        <Typography className={classes.total} align='right'>
                          {numberWithCommas(item.price.value) + " บาท"}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </ALLOnlineItemCardStyled>
                </Grid>
        })
      }
      </ALLOnlineItemGridStyled>
  }

  function newsale_item(){
    return <ALLOnlineItemGridStyled container spacing={1} justify="left">
      {
        new_item.content.map((item)=>{
          return <Grid item>
                  <ALLOnlineItemCardStyled>
                    <CardActionArea onClick={() => handleClickAllOnlineItem(item)}>
                      <CardContent>
                        <CardMedia
                          className={classes.media}
                          image={item.attributes[0].value}
                        />
                        <Typography align='center'>
                          {item.description.shortDescription}
                        </Typography>
                        <Typography className={classes.total} align='right'>
                          {numberWithCommas(item.price.price.amount) + " บาท"}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </ALLOnlineItemCardStyled>
                </Grid>
        })
      }
      </ALLOnlineItemGridStyled>
  }

  function bestsale_item(){
    return <ALLOnlineItemGridStyled container spacing={1} justify="left">
      {
        best_sale.content.map((item)=>{
          return <Grid item>
                  <ALLOnlineItemCardStyled onClick={() => handleClickAllOnlineItem(item)}>
                    <CardActionArea>
                      <CardContent>
                        <CardMedia
                          className={classes.media}
                          image={item.attributes[0].value}
                        />
                        <Typography align='center'>
                          {item.description.shortDescription}
                        </Typography>
                        <Typography className={classes.total} align='right'>
                          {numberWithCommas(item.price.price.amount) + " บาท"}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </ALLOnlineItemCardStyled>
                </Grid>
        })
      }
      </ALLOnlineItemGridStyled>
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <OnetouchListStyled>
            <ListItem fullwidth='true' align="center">
              <ListItemText primary="รายการสินค้า" />
            </ListItem>
            <Divider />
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                {/* <img src={all_online_image} width="40" height="40"/> */}
              </ListItemIcon>
              <ListItemText primary="ALL Online" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={()=>{setOnetouchIndex(19)}}>
                  <ListItemIcon>
                    {/* <AtmIcon /> */}
                  </ListItemIcon>
                  <ListItemText primary="Flash Sale" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={()=>{setOnetouchIndex(20)}}>
                  <ListItemIcon>
                    {/* <AtmIcon /> */}
                  </ListItemIcon>
                  <ListItemText primary="สินค้าขายดี" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={()=>{setOnetouchIndex(21)}}>
                  <ListItemIcon>
                    {/* <AtmIcon /> */}
                  </ListItemIcon>
                  <ListItemText primary="สินค้ามาใหม่" />
                </ListItem>
              </List>
            </Collapse>
            <Divider/>
            <ListItem button onClick={handleClick2}>
              <ListItemIcon>
                <img src={kudsan_image} width="40" height="40"/>
              </ListItemIcon>
              <ListItemText primary="คัดสรร" />
              {open2 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={()=>{setOnetouchIndex(0)}}>
                  <ListItemIcon>
                    <img src={bread_image} width="40" height="40"/>
                  </ListItemIcon>
                  <ListItemText primary="เบเกอรี่" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={()=>{setOnetouchIndex(1)}}>
                  <ListItemIcon>
                    <img src={blend_image} width="40" height="40"/>
                  </ListItemIcon>
                  <ListItemText primary="ปั่น" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={()=>{setOnetouchIndex(2)}}>
                  <ListItemIcon>
                    <img src={cool_image} width="40" height="40"/>
                  </ListItemIcon>
                  <ListItemText primary="เย็น" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={()=>{setOnetouchIndex(3)}}>
                  <ListItemIcon>
                    <img src={hot_image} width="40" height="40"/>
                  </ListItemIcon>
                  <ListItemText primary="ร้อน" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={()=>{setOnetouchIndex(4)}}>
                  <ListItemIcon>
                    <img src={hot_image} width="40" height="40"/>
                  </ListItemIcon>
                  <ListItemText primary="ท๊อปปิ้ง" />
                </ListItem>
              </List>
            </Collapse>
            <Divider/>
            <ListItem button onClick={handleClick3}>
              <ListItemIcon>
                <img src={allcafe_image} width="40" height="40"/>
              </ListItemIcon>
              <ListItemText primary="ALL Cafe'" />
              {open3 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open3} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={()=>{setOnetouchIndex(5)}}>
                  <ListItemIcon>
                    <img src={blend_image} width="40" height="40"/>
                  </ListItemIcon>
                  <ListItemText primary="ปั่น" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={()=>{setOnetouchIndex(6)}}>
                  <ListItemIcon>
                    <img src={cool_image} width="40" height="40" />
                  </ListItemIcon>
                  <ListItemText primary="เย็น" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={()=>{setOnetouchIndex(7)}}>
                  <ListItemIcon>
                    <img src={hot_image} width="40" height="40"/>
                  </ListItemIcon>
                  <ListItemText primary="ร้อน" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={()=>{setOnetouchIndex(8)}}>
                  <ListItemIcon>
                    <img src={hot_image} width="40" height="40"/>
                  </ListItemIcon>
                  <ListItemText primary="ท๊อปปิ้ง" />
                </ListItem>
              </List>
            </Collapse>
            <Divider/>
            <ListItem button onClick={handleClick4}>
              <ListItemIcon>
                <img src={drink_image} width="40" height="40"/>
              </ListItemIcon>
              <ListItemText primary="เครื่องดื่ม" />
              {open4 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open4} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={()=>{setOnetouchIndex(9)}}>
                  <ListItemIcon>
                    <img src={bubble_chat_image} width="40" height="40"/> 
                  </ListItemIcon>
                  <ListItemText primary="กัฟ" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={()=>{setOnetouchIndex(10)}}>
                  <ListItemIcon>
                    <img src={bubble_chat_image} width="40" height="40"/> 
                  </ListItemIcon>
                  <ListItemText primary="สเลอปี้" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={()=>{setOnetouchIndex(11)}}>
                  <ListItemIcon>
                    <img src={cool_image} width="40" height="40"/> 
                  </ListItemIcon>
                  <ListItemText primary="เย็น" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={()=>{setOnetouchIndex(12)}}>
                  <ListItemIcon>
                    <img src={hot_image} width="40" height="40"/> 
                  </ListItemIcon>
                  <ListItemText primary="ร้อน" />
                </ListItem>
              </List>
            </Collapse>
            <Divider/>
            <ListItem button onClick={handleClick5}>
              <ListItemIcon>
              <img src={eat_image} width="40" height="40"/>
              </ListItemIcon>
              <ListItemText primary="อาหารรองท้อง" />
              {open5 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open5} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={()=>{setOnetouchIndex(13)}}>
                  <ListItemIcon>
                    <img src={sausage_image} width="40" height="40" /> 
                  </ListItemIcon>
                  <ListItemText primary="ไส้กรอก" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={()=>{setOnetouchIndex(14)}}>
                  <ListItemIcon>
                    <img src={sandwich_image} width="40" height="40"/> 
                  </ListItemIcon>
                  <ListItemText primary="แซนวิช" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={()=>{setOnetouchIndex(15)}}>
                  <ListItemIcon>
                    <img src={dimsum_image} width="40" height="40"/> 
                  </ListItemIcon>
                  <ListItemText primary="ติ่มซำ" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={()=>{setOnetouchIndex(16)}}>
                  <ListItemIcon>
                    <img src={pao_image} width="40" height="40"/> 
                  </ListItemIcon>
                  <ListItemText primary="ซาลาเปา" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={()=>{setOnetouchIndex(17)}}>
                  <ListItemIcon>
                    <img src={popcorn_image} width="40" height="40"/> 
                  </ListItemIcon>
                  <ListItemText primary="ป๊อปคอร์น" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={handleClick6}>
              <ListItemIcon>
                <img src={food_image} width="40" height="40"/>
              </ListItemIcon>
              <ListItemText primary="Food Place" />
              {open6 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open6} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={()=>{setOnetouchIndex(18)}}>
                  <ListItemIcon>
                    <img src={cooking_image} width="40" height="40"/>
                  </ListItemIcon>
                  <ListItemText primary="ปรุงสด" />
                </ListItem>
              </List>
            </Collapse>
          </OnetouchListStyled>
        </Grid>
        <Grid item xs={9}>
          {
            onetouchIndex<=18?onetouchOffline():onetouchAllOnline()
          }
        </Grid>
      </Grid>
    </div>
  );
}