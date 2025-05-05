import React from 'react';
import { Divider, Typography } from '@mui/material';
import LabelValue from './LabelValue';
import NutritionInfo from '../../../types/NutritionInfo';
import { toSentenceCase } from '../../../utils/utils';

const NutritionInfoList: React.FC<{ info: NutritionInfo[] | undefined }> = ({ info }) => {

  return (
    <div>
      {info !== undefined && info.length > 0 && (
        <Typography id="preview-recipe-nutrition-title" variant="h5" color="primary">
          Nutritional Info Per Serve
        </Typography>
      )}
      {info?.map(item => {
        const sanitisedLabel = toSentenceCase(item.valueType);
        const valueType = sanitisedLabel ?? '';
        const value = item.percent !== undefined ? `${item.percent} %` : item.value !== undefined ? `${item.value} ${item.valueUnit}` : undefined;
        return <LabelValue label={valueType} value={value} />
      })}
      {info && info.length > 0 && (<Divider />)}

    </div>
  );
};

export default NutritionInfoList;
