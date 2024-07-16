import { Button, Col, Modal, Row, Typography } from 'antd';
import { Dispatch, SetStateAction } from 'react';

import { useTranslation } from 'react-i18next';
import { IMobileAppUsersItem } from '../models';

interface IUpdateLegalEntityProps {
  selectedItem: IMobileAppUsersItem;
  showViewMobileAppUserModal: boolean;
  setShowViewMobileAppUserModal: Dispatch<SetStateAction<boolean>>;
}

function ViewMobileAppUserModal({
  setShowViewMobileAppUserModal,
  selectedItem,
  showViewMobileAppUserModal
}: IUpdateLegalEntityProps) {
  const { Text } = Typography;

  const handleClose = () => {
    setShowViewMobileAppUserModal(false);
  };
  const { MobileNumber, Status } = selectedItem;
  const { t } = useTranslation();

  return (
    <Modal
      width={600}
      destroyOnClose
      title={t('ViewMobileAppUserDetailed')}
      open={showViewMobileAppUserModal}
      onCancel={handleClose}
      cancelText={t('closeBtn')}
      okText={t('save')}
      className="generalModal"
      footer={[
        <Button type="default" key="cancel" onClick={handleClose}>
          {t('closeBtn')}
        </Button>
      ]}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Col span={24}>
            <Text type="secondary">{t('mobile')}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{t('status')}</Text>
          </Col>
        </Col>
        <Col span={12}>
          <Col span={24}>
            <Text strong>{MobileNumber}</Text>
          </Col>
          <Col span={24}>
            <Text strong>{Status}</Text>
          </Col>
        </Col>
      </Row>
    </Modal>
  );
}

export default ViewMobileAppUserModal;
