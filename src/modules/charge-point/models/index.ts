import { IGlobalResponse } from '@/models/common';

export interface ICoordinates {
  Latitude: number;
  Longitude: number;
}

export interface IConnectorType {
  Id: number;
  Type: string;
  ImagePath: string;
}

export interface IChargePointItem {
  ChargePointId: string;
  Address: string;
  Name: string;
  Comment: string;
  UserName: string;
  Password: string;
  ClientCertThumb: string;
  ConnectorTypes: IConnectorType[];
  Coordinates: ICoordinates;
  FounderId: number;
  LegalEntityId: number;
  FounderFullName: string;
  LegalEntityVoen: number;
  LegalEntityName: string;
  PlugAndChargeMode: boolean;
  HourlyBillingEnabled: boolean;
  Text: string;
  Title: string;
  ImagePath: string;
  HourlyPrice: number;
}

export interface IPutChargePointFormData {
  Address: string;
  Name: string;
  Comment: string;
  ConnectorTypeIds: number[];
  Latitude: number;
  Longitude: number;
  HourlyBillingEnabled: boolean;
  Text: string;
  Title: string;
  HourlyPrice: number;
}

export interface IGetChargePointsResponse extends IGlobalResponse {
  Data: IChargePointItem[];
  PageSize: number;
  TotalCount: number;
  TotalPage: number;
  PageIndex: number;
}

export interface IchargePointFilter {
  Name?: string;
  Comment?: string;
  FounderFullName?: string;
  LegalEntityName?: string;
}

export interface IAddChargePointForm {
  ChargePointId: string;
  Name: string;
  Comment: string;
  LegalEntityId: number | null;
  HourlyBillingEnabled: boolean;
  ConnectorTypeIds: number[];
}

export interface IPutChargePointResponse {
  TraceId: string;
  ErrorCode: string;
  Error: string;
  Data: {
    Message: string;
  };
}

export interface IGetConnectorTypesResponse {
  Count: number;
  Data: IConnectorType[];
  TraceId: string;
  ErrorCode: null;
  Error: null;
}

export interface ICreateChargePointResponse extends IGlobalResponse {
  Data?: {
    Message?: string | string[];
  };
}
