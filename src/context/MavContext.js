import React, { createContext, useState } from 'react';
import RequestService from '../services/request-service';

export const MavContext = createContext();

const MavContextProvider = (props) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [document, setDocument] = useState(undefined);
  const [prompts, setPrompts] = useState({});
  const [petitionError, setPetitionError] = useState(false);
  const [promptResponse, setPromptResponse] = useState({});

  const handleCheckedItems = (newCheckedItems) => {
    setCheckedItems(newCheckedItems);
  };

  const handleDocument = (newDocument) => {
    RequestService.put('/document', newDocument)
      .then((res) => {
        setPetitionError(false);
        setDocument(newDocument);
      })
      .catch((error) => {
        setPetitionError(true);
      });
  };

  const handlePrompts = (prompts) => {
    Object.keys(prompts).map((prompt) => {
      if (prompt !== 'general')
        RequestService.post('/prompts', prompts[prompt])
          .then((res) => {
            //!TODO hacer set de cada prompt bien hecho, separando por cada prompt su respuesta correspondiente
            setPromptResponse({ ...promptResponse, prompt: res.data });
            setPetitionError(false);
          })
          .catch((error) => {
            setPetitionError(true);
          });
    });

    setPrompts(prompts);
  };

  return (
    <MavContext.Provider
      value={{
        petitionError,
        checkedItems,
        document,
        prompts,
        promptResponse,
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
