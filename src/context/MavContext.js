import React, { createContext, useState } from 'react';
import RequestService from '../services/request-service';

export const MavContext = createContext();

const MavContextProvider = (props) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [document, setDocument] = useState(undefined);
  const [prompts, setPrompts] = useState({});
  const [petitionError, setPetitionError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [promptResponse, setPromptResponse] = useState({});

  const handleCheckedItems = (newCheckedItems) => {
    setCheckedItems(newCheckedItems);
  };

  const handleDocument = (newDocument) => {
    setLoading(true);
    RequestService.put('/document', newDocument)
      .then((res) => {
        setPetitionError(false);
        setDocument(newDocument);
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
            promptObj = ({ ...promptObj, [prompt]: res.data.data });
            setPetitionError(false);
            setPromptResponse(promptObj);
        setPrompts(prompts);
      })
      .catch((error) => {
        setPetitionError(true);
      });
    });
    setLoading(false);
        
  };

  return (
    <MavContext.Provider
      value={{
        petitionError,
        checkedItems,
        document,
        prompts,
        promptResponse,
        loading,
        handleCheckedItems,
        handleDocument,
        handlePrompts,
      }}
    >
      {props.children}
    </MavContext.Provider>
  );
};

export default MavContextProvider;
