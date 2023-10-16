import React, { createContext, useState } from 'react';

export const MavContext = createContext();

const MavContextProvider = (props) => {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckedItems = (newCheckedItems) => {
    setCheckedItems(newCheckedItems);
  };

  return (
    <MavContext.Provider value={{ checkedItems, handleCheckedItems }}>
      {props.children}
    </MavContext.Provider>
  );
};

export default MavContextProvider;
