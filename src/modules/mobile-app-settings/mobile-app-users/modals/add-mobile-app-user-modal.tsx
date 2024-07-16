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
import { strongPasswordValidationText } from '@/utils/constants/validations';

interface IAddMobileAppUserModalProps {
  showAddMobileAppUserModal: boolean;
  setShowAddMobileAppUserModal: Dispatch<SetStateAction<boolean>>;
}

function AddMobileAppUserModal({
  showAddMobileAppUserModal,
  setShowAddMobileAppUserModal
}: IAddMobileAppUserModalProps) {
  const {
    control,
    watch,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const handleClose = () => {
    showCloseConfirmationModal({
      onClose: () => {
        setShowAddMobileAppUserModal(false);
      }
    });
  };
  const onSubmit = () => {};
  return (
    <Modal
      width={700}
      style={{ top: 90 }}
      destroyOnClose
      title={t('AddNewMobileAppUser')}
      open={showAddMobileAppUserModal}
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
            {/* <div className="pb-10">
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
            </div> */}
            <div>
              <AppHandledInput
                label={t('password')}
                name="Password"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('confirmPassword'))
                  },
                  minLength: {
                    value: 8,
                    message: strongPasswordValidationText(t('password'))
                  },
                  validate: {
                    RequireDigit: value =>
                      /[0-9]/.test(value) ||
                      strongPasswordValidationText(t('password')),
                    RequireLowercase: value =>
                      /[a-z]/.test(value) ||
                      strongPasswordValidationText(t('password')),
                    RequireUppercase: value =>
                      /[A-Z]/.test(value) ||
                      strongPasswordValidationText(t('password')),
                    RequireSpecialCharacter: value =>
                      /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\/?]/.test(value) ||
                      strongPasswordValidationText(t('password'))
                  }
                }}
                onChangeApp={() => {
                  if (watch('NewPassword') !== watch('confirmPassword')) {
                    setError('NewPassword', {
                      message: t('confirm')
                    });
                    setError('ConfirmPassword', {
                      message: t('confirm')
                    });
                  } else {
                    clearErrors('NewPassword');
                    clearErrors('ConfirmPassword');
                  }
                }}
                inputProps={{ id: 'NewPassword' }}
                required
                control={control}
                inputType="password"
                placeholder={inputPlaceholderText(t('newPassowrd'))}
                errors={errors}
              />
            </div>

            <AppHandledInput
              label={t('confirmPassword')}
              name="ConfirmPassword"
              rules={{
                required: {
                  value: true,
                  message: inputValidationText(t('confirmPassword'))
                }
              }}
              onChangeApp={() => {
                if (watch('NewPassword') !== watch('ConfirmPassword')) {
                  setError('NewPassword', {
                    message: dictionary.az.passwordsDoNotMatch
                  });
                  setError('ConfirmPassword', {
                    message: dictionary.az.passwordsDoNotMatch
                  });
                } else {
                  clearErrors('NewPassword');
                  clearErrors('ConfirmPassword');
                }
              }}
              inputProps={{ id: 'ConfirmPassword' }}
              required
              control={control}
              inputType="password"
              placeholder={inputPlaceholderText(dictionary.az.confirmPassword)}
              errors={errors}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default AddMobileAppUserModal;
