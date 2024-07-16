import { Dispatch, SetStateAction } from 'react';
import { Row, Col, Form, Modal } from 'antd';
import {
  inputPlaceholderText,
  inputValidationText,
  minLengthCheck,
  showCloseConfirmationModal
} from '@/utils/functions/functions';
import { t } from 'i18next';
import AppHandledInput from '@/components/forms/input/handled_input';
import AppHandledButton from '@/components/display/button/handle-button';
import { useForm } from 'react-hook-form';

interface IAddConnectorStatusProps {
  showAddConnectorStatusModal: boolean;
  setShowAddConnectorStatusModal: Dispatch<SetStateAction<boolean>>;
}

function AddConnectorStatus({
  showAddConnectorStatusModal,
  setShowAddConnectorStatusModal
}: IAddConnectorStatusProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm();

  const handleClose = () => {
    showCloseConfirmationModal({
      onClose: () => {
        setShowAddConnectorStatusModal(false);
      }
    });
  };

  const onSubmit = () => {};

  return (
    <Modal
      width={700}
      style={{ top: 90 }}
      destroyOnClose
      title={t('AddNewConnectorStatus')}
      open={showAddConnectorStatusModal}
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
        className="addProductTabOneContainer"
        onFinish={handleSubmit(onSubmit)}
      >
        <Row gutter={16}>
          <Col span={24}>
            <div className="pb-10">
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
            <div className="pb-10">
              <AppHandledInput
                label={t('username')}
                name="Username"
                inputProps={{
                  id: 'Username'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('username'))
                  },
                  minLength: {
                    value: 5,
                    message: minLengthCheck(t('username'), '5')
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('username'))}
                errors={errors}
              />
            </div>
            <div className="pb-10">
              <AppHandledInput
                label={t('password')}
                name="Password"
                inputProps={{
                  id: 'Password'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('password'))
                  },
                  minLength: {
                    value: 4,
                    message: minLengthCheck(t('password'), '4')
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('password'))}
                errors={errors}
              />
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default AddConnectorStatus;
