import {
  IFileServerResponse,
  IGlobalResponse,
  selectOption
} from '@/models/common';

export interface IAddProductModalOneForm {
  name: string;
  nomenclaturaType: number | null;
  category: number | null;
  mainGroup: number | null;
}

export interface ILegalEntitiesItem {
  Id: number;
  Voen: number;
  Name: string;
  Address: string;
  Mobile: string;
  Phone: string;
  Email: string;
  Token: string;
  StatusId: number;
  StatusName: string;
  CreatedAt: string;
}

export interface IPutLegalEntitiesFormData {}

export interface IPutLegalEntitiesResponse {
  Data: {
    Message: '';
  };
}
export interface IAddBookForm {
  id?: number;
  name: string;
  author: string;
  description: string;
  price: number | null;
  coverPhoto: string | null;
  audioFile: IFileServerResponse | number | null;
  pdfFile: IFileServerResponse | null | number;
  showOnFirstScreen: boolean | null;
  language?: string | number | selectOption;
}

export interface ILegalEntitiesFilter {
  Name?: string;
  Voen?: string;
  Email?: string;
  Address?: string;
  Mobile?: string;
}

export interface IBookStatus {
  isActive: boolean;
}

export interface IGetLegalEntitiesResponse extends IGlobalResponse {
  Data: ILegalEntitiesItem[];
  PageSize: number;
  TotalCount: number;
  TotalPage: number;
  PageIndex: number;
}

export interface IPostLegalEntity {
  FounderId: string;
  LegalEntityVoen: string;
  LegalEntityName: string;
  LegalEntityAddress: string;
  LegalEntityMobile: string;
  LegalEntityPhone: string;
  LegalEntityEmail: string;
  LegalEntityCreatedAt: string;
}

export interface IPostLegalEntityResponse extends IGlobalResponse {
  TraceId: string;
  ErrorCode: number;
  Error: string;
  Data: {
    Message: string;
  };
}

export interface IFounderOption {
  Id: number;
  Name: string;
  Fin: string;
}

export interface IGetFounderOptionsListResponse extends IGlobalResponse {
  TraceId: string;
  ErrorCode: number;
  Error: string;
  Count: number;
  Data: IFounderOption[];
}
