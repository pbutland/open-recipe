export interface OpenApiObject {
  type: string,
  format?: string,
  '$ref'?: string,
  items?: OpenApiObject,
}

export interface OpenApiEnum {
  type: string,
  enum: string[],
}

export interface OpenApiNumber extends OpenApiObject {
  minimum: number,
  maximum: number,
}