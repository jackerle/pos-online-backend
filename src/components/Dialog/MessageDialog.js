import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button';

export default function MessageDialog({
    showProp , setShowProp , title , message
}){



    return(
        <Dialog open={showProp} onClose={() => setShowProp(false)} aria-labelledby="dialog-title">
        <DialogTitle id="login-form-dialog-title">{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {message}
            </DialogContentText>
        </DialogContent>

        <DialogActions>
            <Button onClick={() => setShowProp(false)} color="primary" type="submit">
                OK
            </Button>
        </DialogActions>
    </Dialog>
    )
}