import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import taskService from '../../../services/taskService'
import {CButton} from '@coreui/react'
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
const DeleteTaskDialog=({taskId,fetchData}) =>{
  const [open, setOpen] = React.useState(false);
  const handleSubmit = async() =>{
    
    await  taskService.deleteTask(taskId).then(res=> console.log(res));
    fetchData()
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <CButton size="sm" color="danger" className="ml-1" onClick = {handleClickOpen}>
                  Delete
      </CButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"><ReportProblemIcon></ReportProblemIcon>{"Warning!!!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Bạn chắc chắn muốn xoá Task \'"+taskId+"\'"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CButton onClick={handleSubmit} color="success">
            OK
          </CButton>
          <CButton onClick={handleClose} color="danger" autoFocus>
            Cancel
          </CButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default DeleteTaskDialog;