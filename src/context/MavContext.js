import React, { createContext, useState } from 'react';
import RequestService from '../services/request-service';

export const MavContext = createContext();

const MavContextProvider = (props) => {
  let loading = false;
  const [documentJSON, setDocument] = useState(undefined);
  const [petitionError, setPetitionError] = useState({});
  const [rallyZip, setRallyZip] = useState(undefined);
  const [confluZip, setConfluZip] = useState(undefined);

  const handleDocument = (newDocument) => {
    loading = true;
    let formData = new FormData();
    formData.append('file', newDocument);
    RequestService.postDocument(
      'https://868xnggv-8080.uks1.devtunnels.ms/generate',
      formData
    )
      .then((res) => {
        setPetitionError({});
        setDocument(res.data);
      })
      .catch((error) => {
        setPetitionError(error);
      });
    loading = false;
  };

  const handleFeatures = (features) => {
    loading = true;
    RequestService.postDocument(
      'https://868xnggv-8080.uks1.devtunnels.ms/generate/rally',
      features,
      'arraybuffer'
    )
      .then((res) => {
        setPetitionError({});
        const zip = res.data;
        const blob = new Blob([zip], { type: 'application/octet-stream' });
        setRallyZip(blob);
      })
      .catch((error) => {
        setPetitionError(error);
      });
    loading = false;
  };

  const handleConflu = (features) => {
    loading = true;
    RequestService.postDocument(
      'https://868xnggv-8080.uks1.devtunnels.ms/generateDocumentation',
      features,
      'arraybuffer'
    )
      .then((res) => {
        setPetitionError({});
        const zip = res.data;
        const blob = new Blob([zip], { type: 'application/octet-stream' });
        setConfluZip(blob);
      })
      .catch((error) => {
        setPetitionError(error);
        setConfluZip(undefined);
      });
    loading = false;
  };

  const addFeatures = (feature) => {
    let newDocumentJSON = documentJSON;
    const indexDeleteItem = documentJSON.aiFeatures.indexOf(feature);
    if (indexDeleteItem > -1)
      newDocumentJSON.aiFeatures.splice(indexDeleteItem, 1);

    setDocument({
      ...newDocumentJSON,
      features: [...newDocumentJSON.features, feature],
    });
  };

  const cleanContext = () => {
    setDocument(undefined);
    setRallyZip(undefined);
    setConfluZip(undefined);
    setPetitionError({});
  };

  return (
    <MavContext.Provider
      value={{
        petitionError,
        documentJSON,
        loading,
        rallyZip,
        confluZip,
        handleDocument,
        addFeatures,
        handleFeatures,
        handleConflu,
        cleanContext,
      }}
    >
      {props.children}
    </MavContext.Provider>
  );
};

export default MavContextProvider;
