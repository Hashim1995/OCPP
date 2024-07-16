import { IGlobalResponse } from '@/models/common';

export interface IModeratorItem {
  Id: number;
  Name: string;
  Surname: string;
  Username: string;
  Email: string;
  CreatedAt: string;
}
export interface IModeratorFilter {
  Name?: string;
  Surname?: string;
  Username?: string;
  Email?: string;
}

export interface IGetModeratorListResponse extends IGlobalResponse {
  Data: IModeratorItem[];
  PageSize: number;
  TotalCount: number;
  TotalPage: number;
  PageIndex: number;
}

export interface IAddModeratorForm {
  Name: string;
  Surname: string;
  Username: string;
  Email: string;
}

export interface IPutModeratorFormData {
  Name?: string;
  Surname?: string;
  Username?: string;
}

// export interface IModeratorUpdateItem extends IPutModeratorFormData {
//   Id?: number;
// }

export interface IPutResponse {
  TraceId: string;
  ErrorCode: string;
  Error: string;
  Data: {
    Message: string;
  };
}
