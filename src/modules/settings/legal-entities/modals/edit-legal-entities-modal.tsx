import AppHandledButton from '@/components/display/button/handle-button';
import AppHandledInput from '@/components/forms/input/handled_input';
import { Dispatch, SetStateAction } from 'react';
import {
  inputPlaceholderText,
  inputValidationText,
  minLengthCheck,
  showCloseConfirmationModal
} from '@/utils/functions/functions';
import { Col, Form, Modal, Row } from 'antd';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { LegalEntitiesServices } from '@/services/legal-entities-services/legal-entities-service';
import { toast } from 'react-toastify';
import { ILegalEntitiesItem, IPutLegalEntitiesFormData } from '../models';

interface IEditLegalEntityModal {
  showUpdateLegalEntityModal: boolean;
  setShowUpdateLegalEntityModal: Dispatch<SetStateAction<boolean>>;
  setRefreshComponent: Dispatch<SetStateAction<boolean>>;
  selectedItem: ILegalEntitiesItem;
}

function EditLegalEntitiesModal({
  showUpdateLegalEntityModal,
  setShowUpdateLegalEntityModal,
  selectedItem,
  setRefreshComponent
}: IEditLegalEntityModal) {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors }
  } = useForm({
    defaultValues: {
      Address: selectedItem.Address,
      Email: selectedItem.Email,
      Mobile: selectedItem.Mobile,
      Name: selectedItem.Name
    }
  });

  const handleClose = () => {
    showCloseConfirmationModal({
      onClose: () => {
        setShowUpdateLegalEntityModal(false);
      }
    });
  };

  const onSubmit = async (data: IPutLegalEntitiesFormData) => {
    try {
      const res = await LegalEntitiesServices.getInstance().updateLegalEntity(
        selectedItem?.Id,
        data,
        e => {
          e.preventDefault = true;
          toast.error(e.message?.Error);
        }
      );
      if (res?.Data) {
        toast.success(res?.Data?.Message);
        setShowUpdateLegalEntityModal(false);
        setRefreshComponent(z => !z);
      }
    } catch (error) {
      console.error(error);
    }
    setShowUpdateLegalEntityModal(false);
  };
  return (
    <Modal
      width={700}
      destroyOnClose
      title={t('editLegalEntitie')}
      open={showUpdateLegalEntityModal}
      onCancel={handleClose}
      cancelText={t('closeBtn')}
      okText={t('save')}
      className="generalModal"
      footer={[
        <AppHandledButton
          form="add-template-modal-form"
          type="primary"
          key="submit"
          htmlType="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {t('save')}
        </AppHandledButton>
      ]}
    >
      <div>
        <Form
          onFinish={handleSubmit(onSubmit)}
          id="add-template-modal-form"
          layout="vertical"
          className="editForm"
        >
          <Row>
            <Col span={24}>
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
            </Col>

            <Col span={24}>
              <AppHandledInput
                label={t('email')}
                name="Email"
                inputProps={{
                  id: 'Email'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('email'))
                  },
                  validate: {
                    checkOnlyEnglishChars: (value: string) =>
                      /^[\w\\.-]+@[\w\\.-]+\.\w+$/.test(value) ||
                      t('enterValidEmailAddressErrorMessage')
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('email'))}
                errors={errors}
              />
            </Col>
            <Col span={24}>
              <AppHandledInput
                label={t('address')}
                name="Address"
                inputProps={{
                  id: 'Address'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('address'))
                  },
                  minLength: {
                    value: 7,
                    message: minLengthCheck(t('address'), '7')
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('name'))}
                errors={errors}
              />
            </Col>
            <Col span={24}>
              <AppHandledInput
                label={t('mobile')}
                name="Mobile"
                inputProps={{
                  id: 'Mobile'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('mobile'))
                  },
                  minLength: {
                    value: 7,
                    message: minLengthCheck(t('mobile'), '7')
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('mobile'))}
                errors={errors}
              />
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
}

export default EditLegalEntitiesModal;
