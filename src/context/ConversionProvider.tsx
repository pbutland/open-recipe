import React, { PropsWithChildren, useState } from 'react';
import ConversionContext, { ConversionContextType } from './ConversionContext';
import { MeasurementType } from '../utils/conversionUtils';

const ConversionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [measurementType, setMeasurementType] = useState(MeasurementType.metric);
  const [servings, setServings] = useState(1);

  const value: ConversionContextType = {
    measurementType,
    setMeasurementType,
    servings,
    setServings
  };

  return (
    <ConversionContext.Provider value={value}>
      {children}
    </ConversionContext.Provider>
  );
};

export default ConversionProvider;
