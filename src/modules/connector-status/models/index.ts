import { IGlobalResponse } from '@/models/common';
import { IConnectorType } from '@/modules/charge-point/models';

export interface IConnectorStatus {
  ConnectorId: number;
  CurrentStatus: string;
  ConnectorType: string;
  ConnectorTypeId: number;
  ConnectorName: string;
  ImagePath: string;
}

export interface ICoordinates {
  Latitude: number;
  Longitude: number;
}

export interface IConnectorStatusItem {
  AvailableConnectorsCount: number;
  ChargePointId: string;
  Address: string;
  ChargePointName: string;
  ChargePointText: string;
  ChargePointTitle: string;
  ConnectorTypes: IConnectorType[];
  ConnectorStatuses: IConnectorStatus[];
  Coordinates: ICoordinates;
  LegalEntityId: number;
  LegalEntityName: string;
  HourlyPrice: number;
  ShowInMap: boolean;
  Voen: number;
}

export interface IPutConnectorStatusResponse {
  Data: {
    Message: string;
  };
}
export interface IPutConnectorStatusFormData {}

export interface IConnectorStatusResponse extends IGlobalResponse {
  Data: IConnectorStatusItem[];
  PageSize: number;
  TotalCount: number;
  TotalPage: number;
  PageIndex: number;
}

export interface IConnectorStatusFilter {
  ChargePointName?: string;
  FounderName?: string;
  Surname?: string;
  Fin?: string;
  LastStatus?: string;
}
