/* eslint-disable no-unused-vars */
import { Dispatch, SetStateAction, useState } from 'react';
import { Col, Form, Modal, Row } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  inputPlaceholderText,
  inputValidationText,
  minLengthCheck,
  showCloseConfirmationModal
} from '@/utils/functions/functions';

import { ICreateResponse } from '@/models/common';
import { ModeratorServices } from '@/services/moderator-services/moderator-services';
import { toast } from 'react-toastify';

import AppHandledButton from '@/components/display/button/handle-button';
import AppHandledInput from '@/components/forms/input/handled_input';
import { t } from 'i18next';
import { IAddModeratorForm } from '../models';

/**
 * @component
 * @example
 * ```jsx
 * import AddModeratorModal from './AddModeratorModal';
 *
 * function MyComponent() {
 *   const [showAddModeratorModal, setShowAddModeratorModal] = useState(false);
 *   const [refreshComponent, setRefreshComponent] = useState(false);
 *
 *   return (
 *     <div>
 *       <button onClick={() => setShowAddModeratorModal(true)}>Add Book</button>
 *       {showAddModeratorModal && (
 *         <AddModeratorModal
 *           showAddModeratorModal={showAddModeratorModal}
 *           setShowAddModeratorModal={setShowAddModeratorModal}
 *           setRefreshComponent={setRefreshComponent}
 *         />
 *       )}
 *     </div>
 *   );
 * }
 * ```
 *
 * Renders a modal for adding a new book.
 *
 * @prop {boolean} showAddModeratorModal - Flag indicating whether the modal is visible.
 * @prop {Dispatch<SetStateAction<boolean>>} setShowAddModeratorModal - Callback function to control the modal's visibility.
 * @prop {Dispatch<SetStateAction<boolean>>} setRefreshComponent - Callback function to trigger a component refresh after adding a book.
 *
 * @returns {JSX.Element} The rendered add book modal component.
 */

interface IAddModeratorProps {
  showAddModeratorModal: boolean;
  setShowAddModeratorModal: Dispatch<SetStateAction<boolean>>;
  setRefreshComponent: Dispatch<SetStateAction<boolean>>;
}

function AddModeratorModal({
  setRefreshComponent,
  setShowAddModeratorModal,
  showAddModeratorModal
}: IAddModeratorProps) {
  const {
    formState: { errors, isSubmitting },
    control,
    handleSubmit
  } = useForm<IAddModeratorForm>({
    defaultValues: {
      Name: '',
      Surname: '',
      Username: '',
      Email: ''
    },
    mode: 'onChange'
  });

  const handleClose = () => {
    showCloseConfirmationModal({
      onClose: () => {
        setShowAddModeratorModal(false);
      }
    });
  };

  const onSubmit: SubmitHandler<IAddModeratorForm> = async (
    data: IAddModeratorForm
  ) => {
    setShowAddModeratorModal(true);

    try {
      const res = await ModeratorServices.getInstance().addModeratorToList(
        data,
        e => {
          e.preventDefault = true;
          toast.error(e.message?.Error);
        }
      );
      if (res?.Data) {
        toast.success(res?.Data?.Message);
        setRefreshComponent(z => !z);
        setShowAddModeratorModal(false);
      }
    } catch (error) {
      console.error(error);
      Promise.reject();
    }
  };

  return (
    <Modal
      width={700}
      style={{ top: 90 }}
      destroyOnClose
      title={t('addNewModerator')}
      open={showAddModeratorModal}
      onCancel={handleClose}
      cancelText={t('closeBtn')}
      okText={t('addBtn')}
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
                label={t('surname')}
                name="Surname"
                inputProps={{
                  id: 'Surname'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('surname'))
                  },
                  minLength: {
                    value: 4,
                    message: minLengthCheck(t('surname'), '4')
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('surname'))}
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
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default AddModeratorModal;
