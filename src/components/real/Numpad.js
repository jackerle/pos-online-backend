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
  Backdrop , CircularProgress , 
} from '@material-ui/core'

//private
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { numberWithCommas } from '../../utility/formathelper'

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
}));

//Styled Component Section
const PaperStyled = styled(Paper)`
  // width:10rem;
`;
const ButtonStyled = styled(Button)`
  height:3rem;
`;

export default function MainUIRender(props) {
  const classes = useStyles();
  // const history = useHistory();

  const handleNumberClick = (number) => {
    props.onNumberClick(number);
  }

  const handleBackSpaceClick = () => {
    props.onBackSpaceClick();
  }

  const handleDotClick = () => {
    props.onDotClick();
  }

  const handleEnterClick = () => {
    props.onEnterClick();
  }

  return (
    <PaperStyled elevation={0}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <ButtonStyled variant="outlined" color="primary" onClick={()=>{handleNumberClick(7)}}>7</ButtonStyled>
        </Grid>
        <Grid item xs={4}>
          <ButtonStyled variant="outlined" color="primary" onClick={()=>{handleNumberClick(8)}}>8</ButtonStyled>
        </Grid>
        <Grid item xs={4}>
          <ButtonStyled variant="outlined" color="primary" onClick={()=>{handleNumberClick(9)}}>9</ButtonStyled>
        </Grid>
        <Grid item xs={4}>
          <ButtonStyled variant="outlined" color="primary" onClick={()=>{handleNumberClick(4)}}>4</ButtonStyled>
        </Grid>
        <Grid item xs={4}>
          <ButtonStyled variant="outlined" color="primary" onClick={()=>{handleNumberClick(5)}}>5</ButtonStyled>
        </Grid>
        <Grid item xs={4}>
          <ButtonStyled variant="outlined" color="primary" onClick={()=>{handleNumberClick(6)}}>6</ButtonStyled>
        </Grid>
        <Grid item xs={4}>
          <ButtonStyled variant="outlined" color="primary" onClick={()=>{handleNumberClick(1)}}>1</ButtonStyled>
        </Grid>
        <Grid item xs={4}>
          <ButtonStyled variant="outlined" color="primary" onClick={()=>{handleNumberClick(2)}}>2</ButtonStyled>
        </Grid>
        <Grid item xs={4}>
          <ButtonStyled variant="outlined" color="primary" onClick={()=>{handleNumberClick(3)}}>3</ButtonStyled>
        </Grid>
        <Grid item xs={4}>
          <ButtonStyled variant="outlined" color="primary" onClick={()=>{handleNumberClick(0)}}>0</ButtonStyled>
        </Grid>
        <Grid item xs={4}>
          <ButtonStyled variant="outlined" color="primary" onClick={()=>{handleBackSpaceClick()}}>ลบ</ButtonStyled>
        </Grid>
        {
          props.mode=="withdot"
          ?<Grid item xs={4}>
            <ButtonStyled variant="outlined" color="primary" onClick={()=>{handleDotClick()}}>.</ButtonStyled>
          </Grid>
          :<Grid item xs={4}>
            <ButtonStyled variant="outlined" color="primary" onClick={()=>{handleEnterClick()}}>Enter</ButtonStyled>
          </Grid>
        }
      </Grid>
    </PaperStyled>
  );
}