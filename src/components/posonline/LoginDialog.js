import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import MessageDialog from '../Dialog/MessageDialog';


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
    store: {
        font: "7Font"
    },
    total: {
        fontSize: '15px'
    },
    styledHeader: {
        background: '#438B63',
        '& h2': {
            color: 'white',
        }
    }
}));


export default function LoginDialog(props){

    const {
        loginOpen , handleLoginClose , login, username , password , handleUsername , handlePassword ,showError , setShowError
    } = props

    const classes = useStyles();




    return(
        <>
            <Dialog open={loginOpen} onClose={handleLoginClose} aria-labelledby="form-dialog-title">
                <form className={"form-login"} onSubmit={login}>
                    <DialogTitle className={classes.styledHeader} align={"center"} id="login-form-dialog-title">Login</DialogTitle>
                    <DialogContent> 

                        <TextField
                            autoFocus
                            margin="dense"
                            id="username-login"
                            label="Username"
                            type="text"
                            value={username}
                            onChange={handleUsername}
                            fullWidth
                            required
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password-login"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={handlePassword}
                            fullWidth
                            required
                        />

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleLoginClose} color="primary">
                            Cancel
                    </Button>
                        <Button color="primary" type="submit">
                            Login
                    </Button>
                    </DialogActions>
                </form>
            </Dialog>


            {/* Error Dialog */}
            <MessageDialog 
                showProp={showError} 
                setShowProp={setShowError} 
                title={"ไม่สามารถ Login ได้"}
                message={"ไม่สามารถเข้าสู่ระบบกรุณาตรวจสอบ Username และรหัสผ่าน"}
            />
        </>
    )
}