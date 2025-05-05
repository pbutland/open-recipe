import React from 'react';
import ChipSelect from './ChipSelect';
import SimpleBoolean from './SimpleBoolean';
import SimpleDateInput from './SimpleDateInput';
import SimpleTextInput from './SimpleTextInput';
import SimpleSelect from './SimpleSelect';
import { getEntityFromRef } from '../../../utils/utils';
import { OpenApiEnum, OpenApiObject } from '../../../types/openapi';

const FormComponentBuilder: React.FC<{ name: string, value: any, openApiComponents: any, changeHandler?: (field: string, value: string, index?: number) => void, index?: number, id?: string }> = ({ name, value, openApiComponents, changeHandler, index, id }) => {
  const typedValue = value as OpenApiObject;
  const type = typedValue.type;
  if (typedValue.format === 'date') {
    return (
      <SimpleDateInput name={name} />
    );
  } else if (type === 'string' || type === 'integer' || type === 'number') {
    return (
      <SimpleTextInput id={id} name={name} type={type} entity={value} changeHandler={changeHandler} index={index} />
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
          <ChipSelect name={name} options={typedEntity.enum} />
        );
      }
    }
  } else if (type === undefined) {
    const objName = getEntityFromRef(value['$ref']);
    const obj = openApiComponents.components.schemas[objName];
    const typedObj = obj as OpenApiEnum;
    if (typedObj.enum && typedObj.enum.length > 0) {
      return (
        <SimpleSelect id={id} name={name} values={typedObj.enum} changeHandler={changeHandler} index={index} />
      );
    }
  }
  return null;
};

export default FormComponentBuilder;