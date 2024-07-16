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

export interface IMobileAppUsersItem {
  Id: number;
  Voen: number;
  Name: string;
  MobileNumber: string;
  Phone: string;
  Email: string;
  Status: string;
  StatusId: number;
  CreatedAt: string;
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

export interface IMobileAppUsersFilter {
  Name?: string;
  Voen?: string;
  Address?: string;
  Mobile?: string;
  Phone?: string;
}

export interface IBookStatus {
  isActive: boolean;
}

export interface IGetMobileAppUsersResponse extends IGlobalResponse {
  Data: IMobileAppUsersItem[];
  PageSize: number;
  TotalCount: number;
  TotalPage: number;
  PageIndex: number;
}
export interface IChangeStatusMobileAppUsersResponse {
  Data: {
    Message: string;
  };
  TraceId: string;
  ErrorCode: null;
  Error: null;
}
