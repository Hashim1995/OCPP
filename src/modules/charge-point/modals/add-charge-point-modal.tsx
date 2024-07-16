import AppHandledInput from '@/components/forms/input/handled_input';
import {
  inputPlaceholderText,
  inputValidationText,
  minLengthCheck,
  selectPlaceholderText,
  showCloseConfirmationModal
} from '@/utils/functions/functions';
import { Col, Form, Modal, Row, Spin } from 'antd';
import { t } from 'i18next';
import { Dispatch, SetStateAction, useEffect } from 'react';
import AppHandledButton from '@/components/display/button/handle-button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { ChargePointServices } from '@/services/charge-point-services/charge-point-services';
import AppHandledSelect from '@/components/forms/select/handled-select';
import { RootState } from '@/redux/store';
import { fetchLegalEntitiesData } from '@/redux/legal-entites-slice';
import AppHandledSwitch from '@/components/forms/switch/handled-switch';
import { IAddChargePointForm, IConnectorType } from '../models/index';

interface IAddChargePointProps {
  showAddChargePointModal: boolean;
  setShowAddChargePointModal: Dispatch<SetStateAction<boolean>>;
  setRefreshComponent: Dispatch<SetStateAction<boolean>>;
  connectorTypes: IConnectorType[] | null;
  loading: boolean;
}

function AddChargePointModal({
  setShowAddChargePointModal,
  showAddChargePointModal,
  setRefreshComponent,
  connectorTypes,
  loading
}: IAddChargePointProps) {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<IAddChargePointForm>({
    defaultValues: {
      ChargePointId: '',
      Name: '',
      Comment: '',
      LegalEntityId: null,
      HourlyBillingEnabled: false,
      ConnectorTypeIds: []
    }
  });

  const dispatch = useDispatch();

  const legalEntitesData = useSelector(
    (state: RootState) => state.legalEntites.data
  );

  useEffect(() => {
    dispatch<any>(fetchLegalEntitiesData());
  }, []);

  const handleClose = () => {
    showCloseConfirmationModal({
      onClose: () => {
        setShowAddChargePointModal(false);
      }
    });
  };

  const onSubmit: SubmitHandler<IAddChargePointForm> = async (
    data: IAddChargePointForm
  ) => {
    try {
      const res = await ChargePointServices.getInstance().addChargePoint(
        { ...data },
        e => {
          e.preventDefault = true;
          toast.error(e.message?.Error);
        }
      );

      if (res?.Data) {
        toast.success(res?.Data?.Message);
        setRefreshComponent(z => !z);
        setShowAddChargePointModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      width={700}
      style={{ top: 90 }}
      destroyOnClose
      title={t('AddNewChargePoint')}
      open={showAddChargePointModal}
      onCancel={handleClose}
      cancelText={t('closeBtn')}
      okText={t('save')}
      className="generalModal"
      footer={[
        <AppHandledButton
          form="add-book-modal-form"
          type="primary"
          key="submit"
          htmlType="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {t('addBtn')}
        </AppHandledButton>
      ]}
    >
      {!loading ? (
        <Form
          id="add-book-modal-form"
          layout="vertical"
          className="addPordductTabOneContainer"
          onFinish={handleSubmit(onSubmit)}
        >
          <Row gutter={16}>
            <Col span={24}>
              <div>
                <AppHandledInput
                  label={t('ChargePointId')}
                  name="ChargePointId"
                  inputProps={{
                    id: 'ChargePointId'
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText(t('ChargePointId'))
                    }
                  }}
                  required
                  control={control}
                  inputType="text"
                  placeholder={inputPlaceholderText(t('ChargePointId'))}
                  errors={errors}
                />
              </div>
              <div>
                <AppHandledInput
                  label={t('name')}
                  name="Name"
                  inputProps={{
                    id: 'Name'
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText(t('name'))
                    },
                    minLength: {
                      value: 3,
                      message: minLengthCheck(t('name'), '3')
                    }
                  }}
                  required
                  control={control}
                  inputType="text"
                  placeholder={inputPlaceholderText(t('name'))}
                  errors={errors}
                />
              </div>
              <div>
                <AppHandledInput
                  label={t('Comment')}
                  name="Comment"
                  inputProps={{
                    id: 'Comment'
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText(t('Comment'))
                    },
                    minLength: {
                      value: 4,
                      message: minLengthCheck(t('Comment'), '4')
                    }
                  }}
                  required
                  control={control}
                  inputType="text"
                  placeholder={inputPlaceholderText(t('Comment'))}
                  errors={errors}
                />
              </div>
              <div>
                <AppHandledSelect
                  label={t('LegalEntity')}
                  name="LegalEntityId"
                  control={control}
                  placeholder={inputPlaceholderText(t('LegalEntity'))}
                  required
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText(t('LegalEntity'))
                    }
                  }}
                  errors={errors}
                  selectProps={{
                    allowClear: true,
                    showSearch: true,
                    id: 'LegalEntity',
                    placeholder: selectPlaceholderText(t('LegalEntity')),
                    className: 'w-full',
                    size: 'large',
                    options: legalEntitesData
                      ? legalEntitesData.map(entity => ({
                          value: entity.Id,
                          label: entity.Name
                        }))
                      : []
                  }}
                />
              </div>
              <div>
                <AppHandledSelect
                  label={t('connectorType')}
                  name="ConnectorTypeIds"
                  control={control}
                  placeholder={selectPlaceholderText(t('connectorType'))}
                  errors={errors}
                  required
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText(t('connectorType'))
                    }
                  }}
                  selectProps={{
                    loading,
                    disabled: loading,
                    mode: 'multiple',
                    showSearch: true,
                    id: 'ConnectorTypeIds',
                    className: 'w-full',
                    options: connectorTypes
                      ? connectorTypes?.map(item => ({
                          value: item?.Id,
                          label: item?.Type
                        }))
                      : [],
                    size: 'large'
                  }}
                  formItemProps={{
                    labelAlign: 'left',
                    labelCol: { span: 8, sm: 12, md: 10, lg: 8 }
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <AppHandledSwitch
                  label={t('changeHourlyBillingStatus')}
                  name="HourlyBillingEnabled"
                  control={control}
                  errors={errors}
                  formItemProps={{
                    id: 'HourlyBillingEnabled'
                  }}
                />
              </div>
            </Col>
          </Row>
        </Form>
      ) : (
        <Spin />
      )}
    </Modal>
  );
}

export default AddChargePointModal;
