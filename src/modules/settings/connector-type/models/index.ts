import { IGlobalResponse } from '@/models/common';
import { RcFile } from 'antd/es/upload';

export interface IConnectorType {
  Id: number;
  Type: string;
  ImagePath: string;
}

export interface IConnectorTypeResponse extends IGlobalResponse {
  Data: IConnectorType[];
  PageSize: number;
  TotalCount: number;
  TotalPage: number;
  PageIndex: number;
}
// edit to any type
export interface IAddConnectorTypeForm {
  Type: string;
  ImageFile: any;
}

export interface IAddConnectorTypeResponse {
  Data: {
    Message: string;
  };
  TraceId: string;
  ErrorCode: string;
  Error: string;
}
export interface IPatchConnectorTypeFormData {
  Id: number;
  Type: string;
  ImageFile: string | RcFile | null;
}
export interface IPatchConnectorTypeResponse {
  Data: {
    Message: string;
  };
  TraceId: string;
  ErrorCode: string;
  Error: string;
}
export interface IPutRenameConnectorStatusResponse {
  Data: {
    Message: string;
  };
  TraceId: string;
  ErrorCode: string | null;
  Error: string | null;
}
export interface IPutConnectorRenameFormData {
  ChargePointId: string;
  ConnectorId: number;
  ConnectorName: string;
}
