import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { MavContext } from '../context/MavContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  input: {
    display: 'none',
  },
  button: {
    margin: theme.spacing(1),
  },
  padding: {
    padding: theme.spacing(4),
  },
}));

const UploadDocument = () => {
  const classes = useStyles();
  const { document, handleDocument } = React.useContext(MavContext);
  const [file, setFile] = useState(document);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (document) {
      navigate('/landing');
    }
  }, [document, navigate]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    handleDocument(file);
    setSuccess(true);
  };

  return (
    <div className={classes.root}>
      <input
        accept=".csv"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleFileChange}
      />
      <Typography variant="h4" component="h1" gutterBottom>
        Subida de documentos
      </Typography>
      <Typography variant="body1" className={classes.padding} gutterBottom>
        Selecciona los documentos para que la IA los analice
      </Typography>
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="default"
          component="span"
          startIcon={<CloudUploadIcon />}
          className={classes.button}
        >
          {file ? (
            <Typography variant="body1" gutterBottom>
              Archivo seleccionado: {file.name}
            </Typography>
          ) : (
            'Subir PDF'
          )}
        </Button>
      </label>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!file || success}
        className={classes.button}
      >
        {success ? <CheckCircleOutlineRoundedIcon /> : 'Enviar'}
      </Button>
    </div>
  );
};

export default UploadDocument;
