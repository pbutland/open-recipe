import React from 'react';
import { Divider } from '@mui/material';
import { DurationType, RecipeTag } from '../../../types/api';
import LabelValue from './LabelValue';
import { toSentenceCase } from '../../../utils/utils';

interface GeneralInfoProps {
  tags?: RecipeTag[];
  creator?: string;
  source?: string;
  sourceUrl?: string;
  datePublished?: string;
  dateModified?: string;
  license?: string;
  complexity?: string;
  type?: string;
  cuisine?: string;
  duration?: { durationType: DurationType; timeInMinutes: number }[];
}

const GeneralInfo: React.FC<{ generalInfo: GeneralInfoProps }> = ({ generalInfo }) => {

  const {
    tags,
    creator,
    source,
    sourceUrl,
    datePublished,
    dateModified,
    license,
    complexity,
    type,
    cuisine,
    duration,
  } = generalInfo;

  const datePublishedAsString = datePublished ? (new Date(datePublished)).toDateString() : undefined;
  const dateModifiedAsString = dateModified ? (new Date(dateModified)).toDateString() : undefined;

  return (
    <div>
      <LabelValue label='Creator' value={creator} />
      <LabelValue label='Source' value={source} />
      <LabelValue label='Source URL' value={sourceUrl} />
      <LabelValue label='Date published' value={datePublishedAsString} />
      <LabelValue label='Date modified' value={dateModifiedAsString} />
      <LabelValue label='License' value={license} />
      {duration?.map((item, i) => {
        const label = `${toSentenceCase(item.durationType)} time (in minutes)`;
        return <LabelValue key={`duration-${i}`} label={label} value={item.timeInMinutes?.toString()} />
      })}
      <LabelValue label='Complexity' value={toSentenceCase(complexity)} />
      <LabelValue label='Type' value={toSentenceCase(type)} />
      <LabelValue label='Cuisine' value={toSentenceCase(cuisine)} />
      <LabelValue label='Tags' value={tags} />
      <Divider />
    </div>
  );
};

export default GeneralInfo;
export type { GeneralInfoProps };
