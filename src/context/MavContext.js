import React, { createContext, useState } from 'react';
import AIService from '../services/AIservice';
import MermaidService from '../services/MermaidService';

export const MavContext = createContext();

const MavContextProvider = (props) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [document, setDocument] = useState(undefined);
  const [prompts, setPrompts] = useState({});

  const handleCheckedItems = (newCheckedItems) => {
    setCheckedItems(newCheckedItems);
  };

  const handleDocument = (newDocument) => {
    setDocument(newDocument);
  };

  const handlePrompts = (prompts) => {
    setPrompts(prompts);
  };

  const getAIresponse = (body) => {
    AIService.post(body)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation: ', error);
      });
  };

  const getMermaidResponse = (body) => {
    MermaidService.post(body)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation: ', error);
      });
  };

  return (
    <MavContext.Provider
      value={{
        checkedItems,
        document,
        prompts,
        handleCheckedItems,
        handleDocument,
        handlePrompts,
        getAIresponse,
        getMermaidResponse,
      }}
    >
      {props.children}
    </MavContext.Provider>
  );
};

export default MavContextProvider;
