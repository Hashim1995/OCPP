import { IGlobalResponse } from '@/models/common';

interface IPersonalData {
  Name?: string;
  Surname?: string;
  Username?: string;
  RoleName?: string;
  Email?: string;
  CreatedAt?: string;
}

interface IChangePassword {
  CurrentPassword?: string;
  NewPassword?: string;
  ConfirmationPassword?: string;
}
interface IChangePasswordResponse extends IGlobalResponse {
  Data: {
    Message?: string;
  };
}

export type { IPersonalData, IChangePassword, IChangePasswordResponse };
