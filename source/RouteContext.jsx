import React, { createContext, useContext, useEffect, useState } from "react";

export const RouteContext = createContext();

const RouteContextProvider = (props) => {
  const [loadingStatus, setLoadingStatus] = useState("idle");

  const updateRouteStatus = (value) => {
    setLoadingStatus(value);
  };

  return (
    <RouteContext.Provider value={{
      updateRouteStatus,
      loadingStatus}}>
      {props.children}
    </RouteContext.Provider>
  );
};

export const useRouteStatus = () => useContext(RouteContext);

export default RouteContextProvider;
