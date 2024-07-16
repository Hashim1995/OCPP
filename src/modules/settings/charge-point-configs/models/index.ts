import { IGlobalResponse } from '@/models/common';

interface IChargePointItemConfig {
  Id: number;
  ChargePointId: string;
  Model: string;
  Vendor: string;
  ChargeBoxSerialNumber: string;
  ChargePointSerialNumber: string;
  FirmwareVersion: string;
  Iccid: string;
  Imsi: string;
  MeterSerialNumber: string;
  MeterType: string;
  CreatedAt: string;
  UpdatedAt: string;
}
interface IChargePointItemConfigurationFilter {
  Id?: number;
}

export interface IGetChargePointSystemInformationResponse
  extends IGlobalResponse {
  Data: IChargePointItemConfig[];
  PageSize: number;
  TotalCount: number;
  TotalPage: number;
  PageIndex: number;
}

export type { IChargePointItemConfig, IChargePointItemConfigurationFilter };
