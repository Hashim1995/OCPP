import { IGlobalResponse } from '@/models/common';

export interface ITransactionItem {
  TransactionId: number;
  ConnectorId: number;
  StartTagId: string;
  StartTime: string;
  MeterStart: number;
  StartResult: string;
  StopTagId: string;
  StopTime: string;
  MeterStop: number;
  StopReason: string;
  ChargePointId: string;
  ChargePointName: string;
  FounderId: number;
  FounderName: string;
  FounderSurname: string;
  FounderFin: string;
  FounderPhone: string;
  FounderAddress: string;
  FounderEmail: string;
  FounderCreatedAt: string;
  FounderStatusId: number;
  LegalEntityId: number;
  LegalEntityVoen: number;
  LegalEntityName: string;
  LegalEntityAddress: string;
  LegalEntityMobile: string;
  LegalEntityPhone: string;
  LegalEntityEmail: string;
  LegalEntityToken: string;
  LegalEntityCreatedAt: string;
  LegalEntityStatusId: number;
}

export interface ITransactionsFilter {
  ChargePointName: string;
  FounderName: string;
  FounderSurname: string;
  FounderEmail: string;
  FounderAddress: string;
  FounderFin: string;
  LegalEntityName: string;
  LegalEntityAddress: string;
  LegalEntityEmail: string;
}

export interface IGetTransactionsListResponse extends IGlobalResponse {
  Data: ITransactionItem[];
  PageSize: number;
  TotalCount: number;
  TotalPage: number;
  PageIndex: number;
}
