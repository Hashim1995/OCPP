import { IGlobalResponse } from '@/models/common';

export interface IFoundersItem {
  Id: number;
  Name: string;
  Surname: string;
  Address: string;
  Fin: string;
  Phone: string;
  Email: string;
  StatusId: number | null;
  StatusName: string;
  CreatedAt: string;
}
export interface IFounderFilter {
  Name?: string;
  Surname?: string;
  Email?: string;
  Address?: string;
  Mobile?: string;
  Phone?: string;
  Fin?: string;
}

export interface IPostFounderForm {
  Name: string;
  Surname: string;
  Fin: string;
  Phone: string;
  Address: string;
  Email: string;
  Password: string;
  ConfirmationPassword: string;
  LegalEntityVoen: number;
  LegalEntityName: string;
  LegalEntityAddress: string;
  LegalEntityMobile: string;
  LegalEntityPhone: string;
  LegalEntityEmail: string;
  LegalEntityCreatedAt: string;
}
export interface IPostFounderFormResponse {
  TraceId: string;
  ErrorCode: number;
  Error: string;
  Data: {
    Message: string;
  };
}

export interface IGetFoundersListResponse extends IGlobalResponse {
  Data: IFoundersItem[];
  PageSize: number;
  TotalCount: number;
  TotalPage: number;
  PageIndex: number;
}
