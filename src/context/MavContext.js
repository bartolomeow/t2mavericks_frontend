import React, { createContext, useState } from 'react';

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

  return (
    <MavContext.Provider
      value={{
        checkedItems,
        handleCheckedItems,
        document,
        handleDocument,
        prompts, handlePrompts
      }}
    >
      {props.children}
    </MavContext.Provider>
  );
};

export default MavContextProvider;
