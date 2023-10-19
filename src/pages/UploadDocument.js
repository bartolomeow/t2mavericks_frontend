import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from 'react-router-dom';
import { MavContext } from '../context/MavContext';
import Loading from '../components/Loading/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '85vh',
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
  const { documentJSON, handleDocument, loading } =
    React.useContext(MavContext);
  const [file, setFile] = useState(documentJSON);
  const navigate = useNavigate();

  useEffect(() => {
    if (documentJSON) {
      navigate('/features');
    }
  }, [documentJSON, navigate]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // const handleDownload = () => {
  //   const json = JSON.stringify(documentJSON);
  //   const blob = new Blob([json], { type: 'application/json' });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.setAttribute('href', url);
  //   link.setAttribute('download', 'document.json');
  //   link.style.visibility = 'hidden';
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const handleUpload = () => {
    handleDocument(file);
  };

  return !loading ? (
    <div className={classes.root}>
      <input
        accept=".xlsx"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleFileChange}
      />
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        align="center"
        className={classes.gradientText}
      >
        ¡Hola, soy Maverick! 🤖
      </Typography>
      <Typography variant="body1" className={classes.padding} gutterBottom>
        Selecciona los documentos resultantes de la Inception para que la IA los
        analice en formato Excel.
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
            'Subir archivo'
          )}
        </Button>
      </label>
      {file && !documentJSON && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!file || loading}
          className={classes.button}
        >
          Enviar
        </Button>
      )}
      {/* {documentJSON && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownload}
          className={classes.button}
        >
          Descargar CSV para Rally
        </Button>
      )}
      {documentJSON && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownload}
          className={classes.button}
        >
          Importar a Rally
        </Button>
      )} */}
    </div>
  ) : (
    <Loading />
  );
};

export default UploadDocument;
