import AppHandledButton from '@/components/display/button/handle-button';
import AppHandledDate from '@/components/forms/date/handled-date';
import AppHandledInput from '@/components/forms/input/handled_input';
import AppHandledSelect from '@/components/forms/select/handled-select';
import { LegalEntitiesServices } from '@/services/legal-entities-services/legal-entities-service';
import { maxLengthCheck, minLengthCheck } from '@/utils/constants/validations';
import {
  inputPlaceholderText,
  inputValidationText,
  showCloseConfirmationModal
} from '@/utils/functions/functions';
import { Col, Form, Modal, Row } from 'antd';
import { t } from 'i18next';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { IFounderOption, IPostLegalEntity } from '../models';

interface IAddNewLegalEntityProps {
  showAddNewLegalEntityModal: boolean;
  setShowAddNewLegalEntityModal: Dispatch<SetStateAction<boolean>>;
  setRefreshComponent: Dispatch<SetStateAction<boolean>>;
}
function AddNewLegalEntityModal({
  showAddNewLegalEntityModal,
  setShowAddNewLegalEntityModal,
  setRefreshComponent
}: IAddNewLegalEntityProps) {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<IPostLegalEntity>();

  const [founderOptions, setFounderOptions] = useState<IFounderOption[]>();

  const handleClose = () => {
    showCloseConfirmationModal({
      onClose: () => {
        setShowAddNewLegalEntityModal(false);
      }
    });
  };

  async function onSubmit(data: IPostLegalEntity) {
    try {
      const res = await LegalEntitiesServices.getInstance().addLegalEntity(
        data,
        e => {
          e.preventDefault = true;
          toast.error(e.message?.Error);
        }
      );

      if (res?.Data) {
        toast.success(res.Data.Message);
        setShowAddNewLegalEntityModal(false);
      }
    } finally {
      setRefreshComponent(z => !z);
    }
  }

  async function fetchFoundersOptionsList() {
    try {
      const res = await LegalEntitiesServices.getInstance().getFoundersList(
        e => {
          e.preventDefault = true;
          toast.error(e.message?.Error);
        }
      );
      if (res?.Data) {
        setFounderOptions(res.Data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchFoundersOptionsList();
  }, []);

  return (
    <Modal
      width={700}
      style={{ top: 90 }}
      destroyOnClose
      title={t('AddNewLegalEntity')}
      open={showAddNewLegalEntityModal}
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
      <Form
        id="add-book-modal-form"
        layout="vertical"
        className="addPordductTabOneContainer"
        onFinish={handleSubmit(onSubmit)}
      >
        <Row gutter={16}>
          <Col span={24}>
            <div className="pb-10">
              <AppHandledSelect
                label={t('founderId')}
                name="FounderId"
                selectProps={{
                  id: 'FounderId',
                  options: founderOptions
                    ? founderOptions.map(founder => ({
                        value: founder.Id,
                        label: `${founder.Name} (${founder.Fin})`
                      }))
                    : []
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('founderId'))
                  }
                }}
                required
                control={control}
                placeholder={inputPlaceholderText(t('founderId'))}
                errors={errors}
              />
              <AppHandledInput
                label={t('LegalEntityVoen')}
                name="LegalEntityVoen"
                inputProps={{
                  id: 'LegalEntityVoen'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('LegalEntityVoen'))
                  },
                  maxLength: {
                    value: 10,
                    message: maxLengthCheck(t('LegalEntityVoen'), '10')
                  },
                  minLength: {
                    value: 10,
                    message: minLengthCheck(t('LegalEntityVoen'), '10')
                  }
                }}
                required
                control={control}
                inputType="number"
                placeholder={inputPlaceholderText(t('LegalEntityVoen'))}
                errors={errors}
              />
            </div>

            <div className="pb-10">
              <AppHandledInput
                label={t('LegalEntityName')}
                name="LegalEntityName"
                inputProps={{
                  id: 'LegalEntityName'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('LegalEntityName'))
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('LegalEntityName'))}
                errors={errors}
              />
            </div>

            <div className="pb-10">
              <AppHandledInput
                label={t('LegalEntityAddress')}
                name="LegalEntityAddress"
                inputProps={{
                  id: 'LegalEntityAddress'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('LegalEntityAddress'))
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('LegalEntityAddress'))}
                errors={errors}
              />
            </div>

            <div className="pb-10">
              <AppHandledInput
                label={t('LegalEntityMobile')}
                name="LegalEntityMobile"
                inputProps={{
                  id: 'LegalEntityMobile'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('LegalEntityMobile'))
                  }
                }}
                required
                control={control}
                inputType="tel"
                placeholder={inputPlaceholderText(t('LegalEntityMobile'))}
                errors={errors}
              />
            </div>

            <div className="pb-10">
              <AppHandledInput
                label={t('LegalEntityPhone')}
                name="LegalEntityPhone"
                inputProps={{
                  id: 'LegalEntityPhone'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('LegalEntityPhone'))
                  }
                }}
                required
                control={control}
                inputType="tel"
                placeholder={inputPlaceholderText(t('LegalEntityPhone'))}
                errors={errors}
              />
            </div>

            <div className="pb-10">
              <AppHandledInput
                label={t('LegalEntityEmail')}
                name="LegalEntityEmail"
                inputProps={{
                  id: 'LegalEntityEmail'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('LegalEntityEmail'))
                  }
                }}
                required
                control={control}
                inputType="email"
                placeholder={inputPlaceholderText(t('LegalEntityEmail'))}
                errors={errors}
              />
            </div>

            <div className="pb-10">
              <AppHandledDate
                label={t('LegalEntityCreatedAt')}
                name="LegalEntityCreatedAt"
                dateProps={{
                  id: 'LegalEntityCreatedAt',
                  style: { width: '100%' }
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('LegalEntityCreatedAt'))
                  }
                }}
                required
                control={control}
                errors={errors}
              />
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default AddNewLegalEntityModal;
