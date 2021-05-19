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
const SummaryListStyled = styled(List)`
  background:white;
`;

export default function MainUIRender(props) {
  const classes = useStyles();
  // const history = useHistory();
  const {now_process , max_process} = props

  return (
    <Dialog
      open={props.isOpen}
    >
      <DialogContent align={"center"}>
        <CircularProgress color="inherit" />
        <DialogContentText >
          Process : {now_process} / {max_process}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}