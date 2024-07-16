/* eslint-disable lines-between-class-members */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { ICreateResponse } from '@/models/common';
import {
  IAddModeratorForm,
  IGetModeratorListResponse,
  IPutModeratorFormData,
  IPutResponse
} from '@/modules/moderator/models';
import {
  IChangePassword,
  IChangePasswordResponse
} from '@/modules/personal-cabinet/models';
import {
  ErrorCallBack,
  HttpUtil,
  IHTTPSParams
} from '../adapter-config/config';

export class ModeratorServices {
  // eslint-disable-next-line no-use-before-define
  private static instance: ModeratorServices | null;
  private constructor() {}

  public static getInstance(): ModeratorServices {
    if (!this.instance) {
      ModeratorServices.instance = new ModeratorServices();
    }
    return ModeratorServices.instance!;
  }

  public async getModeratorList(
    params: IHTTPSParams[],
    onError?: ErrorCallBack
  ): Promise<IGetModeratorListResponse> {
    const res = await HttpUtil.get(
      '/controlpanel/moderator',
      params,
      false,
      onError
    );
    return res;
  }

  public async addModeratorToList(
    body: IAddModeratorForm,
    onError?: ErrorCallBack
  ): Promise<ICreateResponse> {
    const res = await HttpUtil.post('/controlpanel/moderator', body, onError);
    return res;
  }

  public async updateModeratorData(
    id: number,
    body: IPutModeratorFormData,
    onError?: ErrorCallBack
  ): Promise<IPutResponse> {
    const res = await HttpUtil.put(
      `/controlpanel/update-profile/${id}`,
      body,
      onError
    );
    return res;
  }
  public async changePassword(
    body: IChangePassword,
    onError?: ErrorCallBack
  ): Promise<IChangePasswordResponse> {
    const res = await HttpUtil.patch(
      '/controlpanel/change-password',
      body,
      onError
    );
    return res;
  }
}
