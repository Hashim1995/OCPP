/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

// import { IGlobalResponse } from '@/models/common';

import { IGlobalResponse } from '@/models/common';
import {
  IChangeStatusMobileAppUsersResponse,
  IGetMobileAppUsersResponse
} from '@/modules/mobile-app-settings/mobile-app-users/models';
import {
  ErrorCallBack,
  HttpUtil,
  IHTTPSParams
} from '../adapter-config/config';

export class MobileAppUsersServices {
  // eslint-disable-next-line no-use-before-define
  private static instance: MobileAppUsersServices | null;

  private constructor() {}

  public static getInstance(): MobileAppUsersServices {
    if (!this.instance) {
      MobileAppUsersServices.instance = new MobileAppUsersServices();
    }
    return MobileAppUsersServices.instance!;
  }

  public async getAllMobileAppUsers(
    params: IHTTPSParams[],
    onError?: ErrorCallBack
  ): Promise<IGetMobileAppUsersResponse> {
    const res = await HttpUtil.get(
      '/controlpanel/mobile-users',
      params,
      false,
      onError
    );
    return res;
  }

  public async MobileAppUserChangeStatus(
    Id: number,
    statusId: number,
    onError?: ErrorCallBack
  ): Promise<IChangeStatusMobileAppUsersResponse> {
    const res = await HttpUtil.patch(
      `/controlpanel/mobile-user/${Id}?statusId=${statusId}`,
      null,
      onError
    );
    return res;
  }

  public async deleteMobileAppUser(
    id: number,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.delete(`/Book/${id}`, onError);
    return res;
  }
}
