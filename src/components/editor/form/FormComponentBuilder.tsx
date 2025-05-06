import React from 'react';
import ChipSelect from './ChipSelect';
import SimpleBoolean from './SimpleBoolean';
import SimpleDateInput from './SimpleDateInput';
import SimpleTextInput from './SimpleTextInput';
import SimpleSelect from './SimpleSelect';
import TooltipWrapper from '../../common/TooltipWrapper';
import { getEntityFromRef } from '../../../utils/utils';
import { OpenApiEnum, OpenApiObject } from '../../../types/openapi';

const FormComponentBuilder: React.FC<{ name: string, value: any, openApiComponents: any, changeHandler?: (field: string, value: string, index?: number) => void, index?: number, id?: string }> = ({ name, value, openApiComponents, changeHandler, index, id }) => {
  const typedValue = value as OpenApiObject;
  const type = typedValue.type;
  const description = typedValue.description;

  if (typedValue.format === 'date') {
    return (
      <TooltipWrapper description={description}>
        <SimpleDateInput name={name} />
        </TooltipWrapper>
    );
  } else if (type === 'string' || type === 'integer' || type === 'number') {
    return (
      <TooltipWrapper description={description}>
        <SimpleTextInput id={id} name={name} type={type} entity={value} changeHandler={changeHandler} index={index} />
      </TooltipWrapper>
    );
  } else if (type === 'boolean') {
    return (
      <SimpleBoolean name={name} type={type} entity={value} changeHandler={changeHandler} index={index} />
    );
  } else if (type === 'array') {
    if (typedValue.items && typedValue.items['$ref']) {
      const entityName = getEntityFromRef(typedValue.items['$ref']);
      const entity = openApiComponents.components.schemas[entityName];
      const typedEntity = entity as OpenApiEnum;
      if (typedEntity.enum) {
        // single value enum
        return (
          <TooltipWrapper description={description}>
            <ChipSelect name={name} options={typedEntity.enum} />
          </TooltipWrapper>
        );
      }
    }
  } else if (type === undefined) {
    const objName = getEntityFromRef(value['$ref']);
    const obj = openApiComponents.components.schemas[objName];
    const typedObj = obj as OpenApiEnum;
    if (typedObj.enum && typedObj.enum.length > 0) {
      return (
        <TooltipWrapper description={description}>
          <SimpleSelect id={id} name={name} values={typedObj.enum} changeHandler={changeHandler} index={index} />
        </TooltipWrapper>
      );
    }
  }
  return null;
};

export default FormComponentBuilder;
