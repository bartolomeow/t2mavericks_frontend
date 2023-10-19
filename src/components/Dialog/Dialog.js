import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@material-ui/core';
import { Typography, ListItem, List, Divider, Box } from '@material-ui/core';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  codeblock: {
    margin: '10px',
    borderRadius: '5px',
    border: 'solid 1px black',
    backgroundColor: '#fff',
  },
  whiteText: {
    color: '#fff',
  },
  margin: {
    margin: theme.spacing(2),
  },
}));

const DialogComponent = (props) => {
  const { open, onClose, item, handleCopy } = props;
  const classes = useStyles();

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="md"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {item.name}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Typography variant="body1">{item.description}</Typography>
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            display: 'list-item',
          }}
        >
          {item.userStories.map((us, i) => (
            <>
              <Divider className={classes.margin} key={'dividermodal' + i} />
              <ListItem disableGutters>
                <Typography variant="h6">
                  <Box display="inline" component="span">
                    <b>{us.name}</b>
                  </Box>
                </Typography>
              </ListItem>
              <ListItem disableGutters>
                <Typography variant="body1">
                  <Box display="inline" component="span">
                    <b>Descripción: </b>
                  </Box>
                  {us.description}
                </Typography>
              </ListItem>
              <ListItem disableGutters>
                <Typography variant="body1">
                  <Box display="inline" component="span">
                    <b>DoR: </b>
                  </Box>
                  {us.definitionOfReady}
                </Typography>
              </ListItem>
              <ListItem disableGutters>
                <Typography variant="body1">
                  <Box display="inline" component="span">
                    <b>DoD: </b>
                  </Box>
                  {us.definitionOfDone}
                </Typography>
              </ListItem>
              <ListItem disableGutters>
                <Typography variant="body1">
                  <Box display="inline" component="span">
                    <b>Horas estimadas: </b>
                  </Box>
                  {us.hours}
                </Typography>
              </ListItem>
            </>
          ))}
        </List>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default DialogComponent;
