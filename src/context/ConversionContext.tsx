import React from 'react';
import { MeasurementType } from '../utils/conversionUtils';

interface ConversionState {
  measurementType: MeasurementType
  servings: number
}

interface ConversionActions {
  setMeasurementType: (data: MeasurementType) => void;
  setServings: (data: number) => void;
}

type ConversionContextType = ConversionState & ConversionActions;

const initialContextValue: ConversionContextType = {
  measurementType: MeasurementType.metric,
  servings: 1,
  setMeasurementType: () => { },
  setServings: () => { },
};

const ConversionContext = React.createContext<ConversionContextType>(initialContextValue);

export default ConversionContext;
export type { ConversionContextType };
