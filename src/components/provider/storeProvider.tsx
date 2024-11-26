// context/PageContext.tsx
'use client';

import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';

type StoreContextType = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

const StoreContext = createContext<StoreContextType>({
  currentPage: 1,
  setCurrentPage: () => {},
});

export const PageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <StoreContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => useContext(StoreContext);