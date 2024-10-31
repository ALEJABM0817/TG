import React, { createContext, useContext, useState } from 'react';

const GoogleMapsContext = createContext();

export const GoogleMapsProvider = ({ children }) => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    return (
        <GoogleMapsContext.Provider value={{ isScriptLoaded, setIsScriptLoaded }}>
            {children}
        </GoogleMapsContext.Provider>
    );
};

export const useGoogleMaps = () => useContext(GoogleMapsContext);