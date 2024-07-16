import { Button, Col, Modal, Row, Typography } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { t } from 'i18next';
import { IChargePointItem } from '../models';

interface IViewChargePointModalProps {
  selectedItem: IChargePointItem;
  setShowViewChargePointModal: Dispatch<SetStateAction<boolean>>;
  showViewChargePointModal: boolean;
}

function ViewChargePointModal({
  selectedItem,
  showViewChargePointModal,
  setShowViewChargePointModal
}: IViewChargePointModalProps) {
  const handleClose = () => {
    setShowViewChargePointModal(false);
  };
  const {
    Coordinates,
    PlugAndChargeMode,
    ConnectorTypes,
    Title,
    Text,
    Address
  } = selectedItem;
  const typesString = ConnectorTypes?.map(
    connectorType => connectorType?.Type
  ).join(', ');
  return (
    <Modal
      width={600}
      destroyOnClose
      title={t('ViewChargePointDetailed')}
      open={showViewChargePointModal}
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
            <Typography.Text type="secondary">{t('Title')}</Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text type="secondary">{t('Text')}</Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text type="secondary">{t('Latitude')}</Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text type="secondary">{t('Longitude')}</Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text type="secondary">
              {t('PlugAndChargeMode')}
            </Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text type="secondary">{t('Types')}</Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text type="secondary">{t('Address')}</Typography.Text>
          </Col>
        </Col>
        <Col span={12}>
          <Col span={24}>
            <Typography.Text strong>{Title ?? '-'}</Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text strong>{Text ?? '-'}</Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text strong>
              {Coordinates?.Latitude ?? '-'}
            </Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text strong>
              {Coordinates?.Longitude ?? '-'}
            </Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text strong>
              {PlugAndChargeMode ? t('active') : t('deactive')}
            </Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text strong>{typesString ?? '-'}</Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text strong>{Address ?? '-'}</Typography.Text>
          </Col>
        </Col>
      </Row>
    </Modal>
  );
}

export default ViewChargePointModal;
