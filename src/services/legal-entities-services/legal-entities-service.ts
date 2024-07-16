/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

// import { IGlobalResponse } from '@/models/common';

import { IGlobalResponse } from '@/models/common';
import {
  IGetFounderOptionsListResponse,
  IGetLegalEntitiesResponse,
  IPostLegalEntity,
  IPostLegalEntityResponse,
  IPutLegalEntitiesFormData,
  IPutLegalEntitiesResponse
} from '@/modules/settings/legal-entities/models';
import {
  ErrorCallBack,
  HttpUtil,
  IHTTPSParams
} from '../adapter-config/config';

export class LegalEntitiesServices {
  // eslint-disable-next-line no-use-before-define
  private static instance: LegalEntitiesServices | null;

  private constructor() {}

  public static getInstance(): LegalEntitiesServices {
    if (!this.instance) {
      LegalEntitiesServices.instance = new LegalEntitiesServices();
    }
    return LegalEntitiesServices.instance!;
  }

  public async getAllLegalEntities(
    params: IHTTPSParams[],
    onError?: ErrorCallBack
  ): Promise<IGetLegalEntitiesResponse> {
    const res = await HttpUtil.get(
      '/controlpanel/legal-entities',
      params,
      false,
      onError
    );
    return res;
  }

  public async changeLegalEntityStatus(
    id: number,
    statusId: number,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.patch(
      `/controlpanel/legal-entity/${id}?statusId=${statusId}`,
      null,
      onError
    );
    return res;
  }

  public async legalEntities(
    onError?: ErrorCallBack
  ): Promise<IGetLegalEntitiesResponse> {
    const res = await HttpUtil.get(
      `/controlpanel/legal-entity-combo`,
      null,
      false,
      onError
    );
    return res;
  }

  public async deleteLegalEntity(
    id: number,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.delete(`/Book/${id}`, onError);
    return res;
  }

  public async updateLegalEntity(
    Id: number,
    body: IPutLegalEntitiesFormData,
    onError?: ErrorCallBack
  ): Promise<IPutLegalEntitiesResponse> {
    const res = await HttpUtil.patch(
      `/controlpanel/legal-entities/${Id}`,
      body,
      onError
    );
    return res;
  }

  public async addLegalEntity(
    body: IPostLegalEntity,
    onError?: ErrorCallBack
  ): Promise<IPostLegalEntityResponse> {
    const res = await HttpUtil.post(
      '/controlpanel/legal-entity-register',
      body,
      onError
    );
    return res;
  }

  public async getFoundersList(
    onError?: ErrorCallBack
  ): Promise<IGetFounderOptionsListResponse> {
    const res = await HttpUtil.get(
      '/controlpanel/founder-combo',
      null,
      false,
      onError
    );
    return res;
  }
}
