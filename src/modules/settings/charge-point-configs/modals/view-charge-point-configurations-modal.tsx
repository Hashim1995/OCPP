import { SetStateAction, Dispatch } from 'react';
import { Col, Modal, Row, Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { IChargePointItemConfig } from '../models';

interface IViewConnectorStatusModalProps {
  selectedItem: IChargePointItemConfig;
  setShowViewChargePointItemConfigurationsModal: Dispatch<
    SetStateAction<boolean>
  >;
  showViewChargePointItemConfigurationsModal: boolean;
}

function ViewChargePointConfigurationModal({
  selectedItem,
  showViewChargePointItemConfigurationsModal,
  setShowViewChargePointItemConfigurationsModal
}: IViewConnectorStatusModalProps) {
  const handleClose = () => {
    setShowViewChargePointItemConfigurationsModal(false);
  };
  const { Text } = Typography;
  const {
    ChargePointSerialNumber,
    Imsi,
    Iccid,
    FirmwareVersion,
    MeterSerialNumber,
    MeterType,
    Model,
    Vendor
  } = selectedItem;

  const { t } = useTranslation();
  return (
    <Modal
      width={600}
      destroyOnClose
      title={t('connectorStatus')}
      open={showViewChargePointItemConfigurationsModal}
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
            <Text type="secondary">{t('ChargePointSerialNumber')}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{t('Imsi')}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{t('Iccid')}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{t('FirmwareVersion')}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{t('MeterSerialNumber')}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{t('MeterType')}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{t('Model')}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{t('Vendor')}</Text>
          </Col>
        </Col>
        <Col span={12}>
          <Col span={24}>
            <Text strong>{ChargePointSerialNumber}</Text>
          </Col>
          <Col span={24}>
            <Text strong>{Imsi}</Text>
          </Col>
          <Col span={24}>
            <Text strong>{Iccid}</Text>
          </Col>
          <Col span={24}>
            <Text strong>{FirmwareVersion}</Text>
          </Col>
          <Col span={24}>
            <Text strong>{MeterSerialNumber}</Text>
          </Col>
          <Col span={24}>
            <Text strong>{MeterType}</Text>
          </Col>
          <Col span={24}>
            <Text strong>{Model}</Text>
          </Col>
          <Col span={24}>
            <Text strong>{Vendor}</Text>
          </Col>
        </Col>
      </Row>
    </Modal>
  );
}
export default ViewChargePointConfigurationModal;
