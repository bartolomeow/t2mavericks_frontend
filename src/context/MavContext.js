import React, { createContext, useState } from 'react';
import RequestService from '../services/request-service';

export const MavContext = createContext();

const MavContextProvider = (props) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [documentJSON, setDocument] = useState(undefined);
  const [prompts, setPrompts] = useState({});
  const [petitionError, setPetitionError] = useState(false);
  const [promptResponse, setPromptResponse] = useState({});

  const handleCheckedItems = (newCheckedItems) => {
    setCheckedItems(newCheckedItems);
  };

  const handleDocument = (newDocument) => {
    setLoading(true);
    let formData = new FormData();
    formData.append('file', newDocument);
    RequestService.postDocument(
      'https://868xnggv-8080.uks1.devtunnels.ms/generate',
      formData
    )
      .then((res) => {
        setPetitionError(false);
        setDocument(res.data.data);
      })
      .catch((error) => {
        setPetitionError(true);
      });
    setLoading(false);
  };

  const handlePrompts = (prompts) => {
    setLoading(true);
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
    setLoading(false);
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
        handleCheckedItems,
        handleDocument,
        handlePrompts,
        addFeatures,
        cleanContext,
      }}
    >
      {props.children}
    </MavContext.Provider>
  );
};

export default MavContextProvider;
