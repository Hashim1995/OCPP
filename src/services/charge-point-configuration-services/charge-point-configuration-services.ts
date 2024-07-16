/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IGetChargePointSystemInformationResponse } from '@/modules/settings/charge-point-configs/models';
import {
  ErrorCallBack,
  HttpUtil,
  IHTTPSParams
} from '../adapter-config/config';

export class ChargePointConfigServices {
  // eslint-disable-next-line no-use-before-define
  private static instance: ChargePointConfigServices | null;

  private constructor() {}

  public static getInstance(): ChargePointConfigServices {
    if (!this.instance) {
      ChargePointConfigServices.instance = new ChargePointConfigServices();
    }
    return ChargePointConfigServices.instance!;
  }

  public async getChargePointSystemInformation(
    params: IHTTPSParams[],
    onError?: ErrorCallBack
  ): Promise<IGetChargePointSystemInformationResponse> {
    const res = await HttpUtil.get(
      '/controlpanel/charge-point-system-information',
      params,
      false,
      onError
    );
    return res;
  }
}
