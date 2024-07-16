import {
  Breadcrumb,
  Card,
  Col,
  Collapse,
  Dropdown,
  Form,
  Row,
  Space,
  Spin,
  Table,
  theme,
  Tooltip,
  Typography
} from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, UndoOutlined, MoreOutlined } from '@ant-design/icons';
import AppHandledButton from '@/components/display/button/handle-button';
import { AiOutlinePlus } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { ChargePointServices } from '@/services/charge-point-services/charge-point-services';
import { ColumnsType } from 'antd/es/table';
import AppPagination from '@/components/display/pagination/pagination';
import AppEmpty from '@/components/display/empty/app-empty';
import AppHandledInput from '@/components/forms/input/handled_input';
import {
  convertFormDataToQueryParams,
  inputPlaceholderText
  // showCloseConfirmationModal
} from '@/utils/functions/functions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IHTTPSParams } from '@/services/adapter-config/config';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { MenuClickEvent } from '@/models/common';
import { ConnectorTypeServices } from '@/services/connector-type-services/connector-type-services';
import AppHandledEllipsisText from '@/components/display/ellipsisText/AppHandledEllipsisText';
import {
  IchargePointFilter,
  IChargePointItem,
  IConnectorType
} from '../models';
import AddChargePointModal from '../modals/add-charge-point-modal';
import EditChargePointModal from '../modals/edit-charge-point-modal';
import ViewChargePointModal from '../modals/view-charge-point-modal';
import SetConnectorTypeModal from '../modals/set-connector-type-modal';

function ChargePoint() {
  const [chargePoints, setChargePoints] = useState<null | IChargePointItem[]>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setCurrentPage] = useState<number>(1);
  const [queryParams, setQueryParams] = useState<IHTTPSParams[]>([]);
  const [totalCount, setTotalDataCount] = useState<number>(1);
  const [refreshComponent, setRefreshComponent] = useState<boolean>(false);
  const [showAddChargePointModal, setShowAddChargePointModal] =
    useState<boolean>(false);
  const [showUpdateChargePointModal, setShowUpdateChargePointModal] =
    useState<boolean>(false);
  const [showViewChargePointModal, setShowViewChargePointModal] =
    useState<boolean>(false);
  const [showDefineConnectorTypeModal, setShowDefineConnectorTypeModal] =
    useState<boolean>(false);
  const [connectorTypes, setConnectorTypes] = useState<null | IConnectorType[]>(
    null
  );
  const [selectedItem, setSelectedItem] = useState<IChargePointItem | null>();
  const { useToken } = theme;
  const { token } = useToken();
  const { Text } = Typography;

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { t } = useTranslation();

  const items = [
    {
      label: <Typography.Text>{t('editBtn')}</Typography.Text>,
      key: '0'
    },
    {
      label: <Typography.Text>{t('viewDetailed')}</Typography.Text>,
      key: '1'
    }
    // {
    //   label: <Typography.Text>{t('delete')}</Typography.Text>,
    //   key: '2'
    // }
    // {
    //   label: <Typography.Text>{t('setConnectorTypes')}</Typography.Text>,
    //   key: '3'
    // }
  ];
  // const handleDelete = async (Id: string) => {
  //   try {
  //     setLoading(true);
  //     // const res: IGlobalResponse = await PoolServices.getInstance().deletePool(
  //     //   id
  //     // );
  //     // if (res.IsSuccess) {
  //     //   toast.success(dictionary.az.successTxt);
  //     //   fetchPool();
  //     // } else {
  //     //   toast.error(dictionary.az.errorOccurred);
  //     // }
  //     console.log(Id);
  //   } catch (error) {
  //     console.error('error', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleMenuClick = (e: MenuClickEvent, raw: IChargePointItem) => {
    if (e?.key === '0') {
      setSelectedItem(raw);
      setShowUpdateChargePointModal(true);
    }
    if (e?.key === '1') {
      setSelectedItem(raw);
      setShowViewChargePointModal(true);
    }
    // if (e?.key === '2') {
    //   showCloseConfirmationModal({
    //     titleText: t('confirmTitle'),
    //     descriptionText: t('confirmDelete'),
    //     okText: t('yesTxt'),
    //     onClose: () => {
    //       handleDelete(raw.ChargePointId);
    //     }
    //   });
    // }
    if (e?.key === '3') {
      setShowDefineConnectorTypeModal(true);
    }
  };

  const columns: ColumnsType<IChargePointItem> = [
    {
      title: t('ChargePointId'),
      dataIndex: 'ChargePointId',
      key: 'ChargePointId',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('name'),
      dataIndex: 'Name',
      key: 'Name',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('Comment'),
      dataIndex: 'Comment',
      key: 'Comment',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('founderId'),
      dataIndex: 'FounderId',
      key: 'FounderId',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('LegalEntityId'),
      dataIndex: 'LegalEntityId',
      key: 'LegalEntityId',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('FounderFullName'),
      dataIndex: 'FounderFullName',
      key: 'FounderFullName',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('LegalEntityVoen'),
      dataIndex: 'LegalEntityVoen',
      key: 'LegalEntityVoen',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('LegalEntityName'),
      dataIndex: 'LegalEntityName',
      key: 'LegalEntityName',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('createdAt'),
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
      render: (date: string) => {
        const formattedDate = dayjs(date)?.format('YYYY-MM-DD HH:mm:ss');
        return <AppHandledEllipsisText record={formattedDate} />;
      }
    },
    {
      title: '',
      align: 'right',
      key: 'actions',
      render: (record: IChargePointItem) => (
        <Space>
          <Dropdown
            menu={{
              items,
              onClick: e => handleMenuClick(e, record)
            }}
            key={record?.ChargePointId}
            trigger={['click']}
          >
            <AppHandledButton icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      )
    }
  ];

  const onSubmit: SubmitHandler<IchargePointFilter> = (
    data: IchargePointFilter
  ) => {
    setCurrentPage(1);
    const queryParamsData: IHTTPSParams[] =
      convertFormDataToQueryParams<IchargePointFilter>(data);
    setQueryParams(queryParamsData);
    setRefreshComponent(!refreshComponent);
  };

  const getChargePoints = async () => {
    setLoading(true);

    try {
      const res = await ChargePointServices.getInstance().getChargePoints([
        ...queryParams,
        { name: 'PageIndex', value: page }
      ]);
      setChargePoints(res?.Data);
      setTotalDataCount(res?.TotalCount);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const getConnectorTypes = async () => {
    setLoading(true);
    try {
      const res = await ConnectorTypeServices.getInstance().getConnectorTypes([
        ...queryParams,
        { name: 'PageIndex', value: page }
      ]);
      setConnectorTypes(res?.Data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getConnectorTypes();
    getChargePoints();
  }, [page, refreshComponent]);

  return (
    <div>
      <Card size="small" className="box box-margin-y">
        <Row justify="space-between" align="middle">
          <Breadcrumb
            items={[
              {
                title: (
                  <Link to="/home">
                    <HomeOutlined rev={undefined} />
                  </Link>
                )
              },
              {
                title: t('chargePoint')
              }
            ]}
          />
          <Tooltip placement="right" title={t('addBtn')}>
            <AppHandledButton
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              loading={loading}
              onClick={() => {
                setShowAddChargePointModal(true);
              }}
              icon={<AiOutlinePlus />}
            />
          </Tooltip>
        </Row>
      </Card>

      <Card size="small" className="box box-margin-y ">
        <div className="generalFilter">
          <Collapse
            expandIconPosition="end"
            ghost
            style={{
              padding: '0'
            }}
            defaultActiveKey="1"
            size="small"
          >
            <Collapse.Panel
              key={1}
              className="p-0"
              header={<Text type="secondary">{t('filter')}</Text>}
            >
              <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
                <Row gutter={16}>
                  <Col
                    className="gutter-row"
                    style={{ marginBottom: token.marginSM }}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                  >
                    <AppHandledInput
                      label={t('ChargePointId')}
                      name="ChargePointId"
                      inputProps={{
                        id: 'ChargePointId'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('ChargePointId'))}
                      errors={errors}
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    style={{ marginBottom: token.marginSM }}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                  >
                    <AppHandledInput
                      label={t('name')}
                      name="Name"
                      inputProps={{
                        id: 'Name'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('name'))}
                      errors={errors}
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    style={{ marginBottom: token.marginSM }}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                  >
                    <AppHandledInput
                      label={t('Comment')}
                      name="Comment"
                      inputProps={{
                        id: 'Comment'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('Comment'))}
                      errors={errors}
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    style={{ marginBottom: token.marginSM }}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                  >
                    <AppHandledInput
                      label={t('founderId')}
                      name="FounderId"
                      inputProps={{
                        id: 'FounderId'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('founderId'))}
                      errors={errors}
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    style={{ marginBottom: token.marginSM }}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                  >
                    <AppHandledInput
                      label={t('LegalEntityId')}
                      name="LegalEntityId"
                      inputProps={{
                        id: 'LegalEntityId'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('LegalEntityId'))}
                      errors={errors}
                    />
                  </Col>
                </Row>
                <Row justify="end">
                  <div style={{ textAlign: 'right' }}>
                    <Space size="small">
                      <Tooltip title={t('resetTxt')}>
                        <AppHandledButton
                          onClick={() => {
                            reset();
                            setCurrentPage(1);
                            setQueryParams([]);
                            setRefreshComponent(r => !r);
                          }}
                          type="dashed"
                          icon={<UndoOutlined rev={undefined} />}
                        />
                      </Tooltip>
                      <AppHandledButton type="primary" htmlType="submit">
                        {t('searchTxt')}
                      </AppHandledButton>
                    </Space>
                  </div>
                </Row>
              </Form>
            </Collapse.Panel>
          </Collapse>
        </div>
      </Card>

      <Spin size="large" spinning={loading}>
        <Row className="pb-10">
          <Col span={24}>
            <Table
              pagination={false}
              rowKey={'Id'}
              locale={{
                emptyText: <AppEmpty />
              }}
              scroll={{ x: 768 }}
              columns={columns}
              dataSource={chargePoints !== null ? chargePoints : []}
              className="generalTable"
            />
          </Col>
        </Row>
        <Row justify="end" className="generalPagination">
          <Col>
            <AppPagination
              current={page}
              total={totalCount}
              onChange={(z: number) => setCurrentPage(z)}
            />
          </Col>
        </Row>
      </Spin>

      {showAddChargePointModal && chargePoints && (
        <AddChargePointModal
          setShowAddChargePointModal={setShowAddChargePointModal}
          showAddChargePointModal={showAddChargePointModal}
          setRefreshComponent={setRefreshComponent}
          connectorTypes={connectorTypes}
          loading={loading}
        />
      )}
      {showUpdateChargePointModal && selectedItem && (
        <EditChargePointModal
          setShowUpdateChargePointModal={setShowUpdateChargePointModal}
          setRefreshComponent={setRefreshComponent}
          showUpdateChargePointModal={showUpdateChargePointModal}
          selectedItem={selectedItem}
          connectorTypes={connectorTypes}
        />
      )}

      {showViewChargePointModal && selectedItem && (
        <ViewChargePointModal
          selectedItem={selectedItem}
          showViewChargePointModal={showViewChargePointModal}
          setShowViewChargePointModal={setShowViewChargePointModal}
        />
      )}

      {showDefineConnectorTypeModal && (
        <SetConnectorTypeModal
          showDefineConnectorTypeModal={showDefineConnectorTypeModal}
          setShowDefineConnectorTypeModal={setShowDefineConnectorTypeModal}
        />
      )}
    </div>
  );
}

export default ChargePoint;
