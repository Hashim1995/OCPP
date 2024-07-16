import { Dispatch, SetStateAction } from 'react';
import { Button, Col, Modal, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { ITransactionItem } from '../models';

interface IViewTransactionsProps {
  selectedItem: ITransactionItem;
  setShowViewTransactionsModal: Dispatch<SetStateAction<boolean>>;
  showViewTransactionsModal: boolean;
}

function ViewTransactionsModal({
  setShowViewTransactionsModal,
  selectedItem,
  showViewTransactionsModal
}: IViewTransactionsProps) {
  const { Text } = Typography;
  const { t } = useTranslation();

  const handleClose = () => {
    setShowViewTransactionsModal(false);
  };

  const { FounderName, FounderSurname, FounderFin } = selectedItem;

  return (
    <Modal
      width={600}
      destroyOnClose
      title={t('transactions')}
      open={showViewTransactionsModal}
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
            <Text type="secondary">{t('FounderName')}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{t('FounderSurname')}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{t('FounderFin')}</Text>
          </Col>
        </Col>
        <Col span={12}>
          <Col span={24}>
            <Text strong>{FounderName}</Text>
          </Col>
          <Col span={24}>
            <Text strong>{FounderSurname}</Text>
          </Col>
          <Col span={24}>
            <Text strong>{FounderFin}</Text>
          </Col>
        </Col>

        {/* <Col span={12}>
          <Col span={24}>
            <Text type="secondary" style={{ fontWeight: 600 }}>
              {dictionary.az.legalEntity}
            </Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{dictionary.az.voen}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{dictionary.az.name}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{dictionary.az.email}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{dictionary.az.contactNumber}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{dictionary.az.activityField}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{dictionary.az.address}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{dictionary.az.createdAt}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary" style={{ fontWeight: 600 }}>
              {dictionary.az.AuthorizedUser}
            </Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{dictionary.az.finCode}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{dictionary.az.name}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{dictionary.az.surname}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{dictionary.az.FathersName}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{dictionary.az.status}</Text>
          </Col>
        </Col> */}
        {/* <Col span={12}>
          <Col span={24}>
            <Text type="secondary" strong>
              &nbsp;
            </Text>
          </Col>
          <Col span={24}>
            <Text strong>{Voen}</Text>
          </Col>
          <Col span={24}>
            <Text strong>{Name}</Text>
          </Col>
          <Col span={24}>
            <Text strong>{Email}</Text>
          </Col>
          <Col span={24}>
            <Text strong>{PhoneNumber}</Text>
          </Col>
          <Col span={24}>
            <Text strong>{ActivityField}</Text>
          </Col>
          <Col span={24}>
            <Text strong>{Address}</Text>
          </Col>
          <Col span={24}>
            <Text strong>{CreatedDate}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary" strong>
              &nbsp;
            </Text>
          </Col>
          <Col span={24}>
            <Text strong>{FinCode}</Text>
          </Col>
          <Col span={24}>
            <Text strong>{FounderName}</Text>
          </Col>
          <Col span={24}>
            <Text strong>{FounderSurname}</Text>
          </Col>
          <Col span={24}>
            <Text strong>{FathersName}</Text>
          </Col>
          <Col span={24}>
            <Text strong>{Status}</Text>
          </Col>
        </Col> */}
      </Row>
    </Modal>
  );
}

export default ViewTransactionsModal;
