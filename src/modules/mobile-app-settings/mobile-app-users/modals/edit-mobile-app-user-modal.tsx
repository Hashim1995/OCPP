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
import { IMobileAppUsersItem } from '../models';

interface IEditMobileAppUserModalProps {
  selectedItem: IMobileAppUsersItem;
  showEditMobileAppUserModal: boolean;
  setShowEditMobileAppUserModal: Dispatch<SetStateAction<boolean>>;
}

function EditMobileAppUserModal({
  selectedItem,
  showEditMobileAppUserModal,
  setShowEditMobileAppUserModal
}: IEditMobileAppUserModalProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm();

  const handleClose = () => {
    showCloseConfirmationModal({
      onClose: () => {
        setShowEditMobileAppUserModal(false);
      }
    });
  };
  const onSubmit = () => {};
  console.log(selectedItem);
  return (
    <Modal
      width={700}
      destroyOnClose
      title={t('editMobileAppUser')}
      open={showEditMobileAppUserModal}
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
            </Col>
            <Col span={24}>
              <AppHandledInput
                label={t('chargePointName')}
                name="ChargePointName"
                inputProps={{
                  id: 'ChargePointName'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('chargePointName'))
                  },
                  minLength: {
                    value: 3,
                    message: minLengthCheck(t('chargePointName'), '3')
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('chargePointName'))}
                errors={errors}
              />
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
}

export default EditMobileAppUserModal;
