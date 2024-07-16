/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import {
  IAddChargePointForm,
  ICreateChargePointResponse,
  IGetChargePointsResponse,
  // IGetConnectorTypesResponse,
  IPutChargePointFormData,
  IPutChargePointResponse
} from '@/modules/charge-point/models';
import {
  ErrorCallBack,
  HttpUtil,
  IHTTPSParams
} from '../adapter-config/config';

export class ChargePointServices {
  // eslint-disable-next-line no-use-before-define
  private static instance: ChargePointServices | null;

  private constructor() {}

  public static getInstance(): ChargePointServices {
    if (!this.instance) {
      ChargePointServices.instance = new ChargePointServices();
    }
    return ChargePointServices.instance!;
  }

  public async getChargePoints(
    params: IHTTPSParams[],
    onError?: ErrorCallBack
  ): Promise<IGetChargePointsResponse> {
    const res = await HttpUtil.get(
      '/controlpanel/charge-point',
      params,
      false,
      onError
    );
    return res;
  }

  public async addChargePoint(
    body: IAddChargePointForm,
    onError?: ErrorCallBack
  ): Promise<ICreateChargePointResponse> {
    const res = await HttpUtil.post(
      '/controlpanel/charge-point',
      body,
      onError
    );
    return res;
  }

  public async updateChargePoint(
    id: string,
    body: IPutChargePointFormData,
    onError?: ErrorCallBack
  ): Promise<IPutChargePointResponse> {
    const res = await HttpUtil.put(
      `/controlpanel/charge-point/${id}`,
      body,
      onError
    );
    return res;
  }

  // public async getConnectorTypes(
  //   onError?: ErrorCallBack
  // ): Promise<IGetConnectorTypesResponse> {
  //   const res = await HttpUtil.get(
  //     `/controlpanel/connector-type`,
  //     null,
  //     false,
  //     onError
  //   );
  //   return res;
  // }
}
