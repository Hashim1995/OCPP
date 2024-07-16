import { SetStateAction, Dispatch } from 'react';
import { Col, Modal, Row, Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { IConnectorStatusItem } from '../models';

interface IViewConnectorStatusModalProps {
  selectedItem: IConnectorStatusItem;
  setShowViewConnectorStatusModal: Dispatch<SetStateAction<boolean>>;
  showViewConnectorStatusModal: boolean;
}

function ViewConnectorStatusModal({
  selectedItem,
  showViewConnectorStatusModal,
  setShowViewConnectorStatusModal
}: IViewConnectorStatusModalProps) {
  const handleClose = () => {
    setShowViewConnectorStatusModal(false);
  };
  const { ConnectorStatuses, Coordinates } = selectedItem;

  const { t } = useTranslation();
  const { Text } = Typography;
  return (
    <Modal
      width={600}
      destroyOnClose
      title={t('connectorStatus')}
      open={showViewConnectorStatusModal}
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
          {ConnectorStatuses.map(connector => (
            <Col span={24} key={connector.ConnectorId}>
              <Text type="secondary">
                {t('Connector')} {connector.ConnectorId}:
              </Text>
            </Col>
          ))}
          <Col span={24}>
            <Text type="secondary">{t('Latitude')}:</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{t('Longitude')}:</Text>
          </Col>
        </Col>
        <Col span={12}>
          {ConnectorStatuses.map(connector => (
            <Col span={24} key={connector.ConnectorId}>
              <Text strong> {connector.CurrentStatus}</Text>
            </Col>
          ))}
          <Col span={24}>
            <Text strong>{Coordinates?.Latitude}</Text>
          </Col>
          <Col span={24}>
            <Text strong>{Coordinates?.Longitude}</Text>
          </Col>
        </Col>
      </Row>
    </Modal>
  );
}
export default ViewConnectorStatusModal;
