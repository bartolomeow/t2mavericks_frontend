import React, { createContext, useState } from 'react';
import RequestService from '../services/request-service';

export const MavContext = createContext();

const MavContextProvider = (props) => {
  const [checkedItems, setCheckedItems] = useState([]);
  let loading = false;
  const [documentJSON, setDocument] = useState(undefined);
  const [prompts, setPrompts] = useState({});
  const [petitionError, setPetitionError] = useState(false);
  const [promptResponse, setPromptResponse] = useState({});
  const [rallyZip, setRallyZip] = useState(undefined);
  const [confluZip, setConfluZip] = useState(undefined);

  const handleCheckedItems = (newCheckedItems) => {
    setCheckedItems(newCheckedItems);
  };

  const handleDocument = (newDocument) => {
    loading = true;
    let formData = new FormData();
    formData.append('file', newDocument);
    RequestService.postDocument(
      'https://868xnggv-8080.uks1.devtunnels.ms/generate',
      formData
    )
      .then((res) => {
        setPetitionError(false);
        setDocument(res.data);
      })
      .catch((error) => {
        setPetitionError(true);
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
        setPetitionError(false);
        const zip = res.data;
        const blob = new Blob([zip], { type: 'application/octet-stream' });
        setRallyZip(blob);
      })
      .catch((error) => {
        setPetitionError(true);
      });
    loading = false;
  };

  const handleConflu = (features) => {
    loading = true;
    RequestService.postDocument(
      'https://868xnggv-8080.uks1.devtunnels.ms/generate/conflu',
      features,
      'arraybuffer'
    )
      .then((res) => {
        setPetitionError(false);
        const zip = res.data;
        const blob = new Blob([zip], { type: 'application/octet-stream' });
        setConfluZip(blob);
      })
      .catch((error) => {
        setPetitionError(true);
      });
    loading = false;
  };

  const handlePrompts = (prompts) => {
    loading = true;
    let promptObj = {};
    Object.keys(prompts).map((prompt) => {
      if (prompt !== 'general')
        RequestService.post('/prompts', prompts[prompt])
          .then((res) => {
            promptObj = { ...promptObj, [prompt]: res.data.data };
            setPetitionError(false);
            setPromptResponse(promptObj);
            setPrompts(prompts);
          })
          .catch((error) => {
            setPetitionError(true);
          });
      return promptObj;
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
    setCheckedItems([]);
    setDocument(undefined);
    setPrompts({});
    setPetitionError(false);
    setPromptResponse({});
    setRallyZip(undefined);
    setConfluZip(undefined);
  };

  return (
    <MavContext.Provider
      value={{
        petitionError,
        checkedItems,
        documentJSON,
        prompts,
        promptResponse,
        loading,
        rallyZip,
        confluZip,
        handleCheckedItems,
        handleDocument,
        handlePrompts,
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
