import AppHandledButton from '@/components/display/button/handle-button';
import AppPagination from '@/components/display/pagination/pagination';
import AppHandledInput from '@/components/forms/input/handled_input';
import { IHTTPSParams } from '@/services/adapter-config/config';
import { ConnectorStatusServices } from '@/services/connector-status-services/connector-status-services';
import {
  convertFormDataToQueryParams,
  inputPlaceholderText
} from '@/utils/functions/functions';
import { HomeOutlined, MoreOutlined, UndoOutlined } from '@ant-design/icons';
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
  TableColumnsType,
  Tooltip,
  Typography,
  theme
} from 'antd';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { t } from 'i18next';
import { MenuClickEvent } from '@/models/common';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import AppHandledEllipsisText from '@/components/display/ellipsisText/AppHandledEllipsisText';
import EditConnectorStatusModal from '../modals/edit-connector-status';
import {
  IConnectorStatus,
  IConnectorStatusFilter,
  IConnectorStatusItem
} from '../models';

function ConnectorStatus() {
  const [connectorStatuses, setConnectorStatuses] = useState<
    IConnectorStatusItem[] | null
  >(null);

  const [queryParams, setQueryParams] = useState<IHTTPSParams[]>([]);
  const [totalCount, setTotalDataCount] = useState<number>(1);
  const [page, setCurrentPage] = useState<number>(1);
  const [refreshComponent, setRefreshComponent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IConnectorStatus | null>();
  const [chargePointId, setChargePointId] = useState<string>();
  // const [showViewConnectorStatusModal, setShowViewConnectorStatusModal] =
  //   useState<boolean>(false);
  // const [showAddConnectorStatusModal, setShowAddConnectorStatusModal] =
  //   useState<boolean>(false);
  const [showUpdateConnectorStatusModal, setShowUpdateConnectorStatusModal] =
    useState<boolean>(false);

  const { useToken } = theme;
  const { token } = useToken();
  const { Text } = Typography;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const items = [
    {
      label: <Typography.Text>{t('editBtn')}</Typography.Text>,
      key: '0'
    }
    // {
    //   label: <Typography.Text>{t('view')}</Typography.Text>,
    //   key: '1'
    // }
  ];

  const handleMenuClick = (
    e: MenuClickEvent,
    raw: IConnectorStatus,
    ID: any
  ) => {
    if (e?.key === '0') {
      console.log(raw, 'lol');
      setSelectedItem(raw);
      setChargePointId(ID);
      setShowUpdateConnectorStatusModal(true);
    }
    if (e?.key === '1') {
      setSelectedItem(raw);
      // setShowViewConnectorStatusModal(true);
    }
  };

  const expandedRowRender = (a: IConnectorStatusItem) => {
    const columns: TableColumnsType<IConnectorStatus> = [
      {
        title: t('connectorId'),
        dataIndex: 'ConnectorId',
        key: 'ConnectorId',
        render: record => <AppHandledEllipsisText record={record} />
      },
      {
        title: t('connectorType'),
        dataIndex: 'ConnectorType',
        key: 'ConnectorType',
        render: record => <AppHandledEllipsisText record={record} />
      },
      {
        title: t('connectorTypeId'),
        dataIndex: 'ConnectorTypeId',
        key: 'ConnectorTypeId',
        render: record => <AppHandledEllipsisText record={record} />
      },
      {
        title: t('connectorStatus'),
        dataIndex: 'CurrentStatus',
        key: 'CurrentStatus',
        render: record => <AppHandledEllipsisText record={record} />
      },
      {
        title: '',
        align: 'right',
        key: 'actions',
        render: (record: IConnectorStatus) => (
          <Space>
            <Dropdown
              menu={{
                items,
                onClick: e => handleMenuClick(e, record, a?.ChargePointId)
              }}
              key={record?.ConnectorId}
              trigger={['click']}
            >
              <AppHandledButton icon={<MoreOutlined />} />
            </Dropdown>
          </Space>
        )
      }
    ];

    // const data: ExpandedDataType[] = [];
    // // eslint-disable-next-line no-plusplus
    // for (let i = 0; i < connectorStatuses?.length!; ++i) {
    //   // eslint-disable-next-line no-plusplus
    //   for (let j = 0; j < connectorStatuses![i].ConnectorStatuses.length; j++) {
    //     data.push({
    //       key:
    //         connectorStatuses![i]?.ConnectorStatuses[
    //           j
    //         ].ConnectorId?.toString()! ?? '-',
    //       ConnectorId:
    //         connectorStatuses![i]?.ConnectorStatuses[j].ConnectorId ?? '-',
    //       ConnectorType:
    //         connectorStatuses![i]?.ConnectorStatuses[
    //           j
    //         ].ConnectorType?.toString() ?? '-',
    //       CurrentStatus:
    //         connectorStatuses![i]?.ConnectorStatuses[
    //           j
    //         ]?.CurrentStatus?.toString() ?? '-',
    //       ConnectorTypeId:
    //         connectorStatuses![i]?.ConnectorStatuses[j]?.ConnectorTypeId ?? '-'
    //     });
    //   }
    // }

    return (
      <Table
        columns={columns}
        dataSource={a?.ConnectorStatuses}
        pagination={false}
        rowKey={'connectorId'}
      />
    );
  };

  const columns: ColumnsType<IConnectorStatusItem> = [
    {
      title: t('ChargePointId'),
      dataIndex: 'ChargePointId',
      key: 'ChargePointId',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('chargePointName'),
      dataIndex: 'ChargePointName',
      key: 'ChargePointName',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('LegalEntityName'),
      dataIndex: 'LegalEntityName',
      key: 'LegalEntityName',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('voen'),
      dataIndex: 'Voen',
      key: 'Voen',
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
    }
  ];

  const getConnectorStatuses = async () => {
    setLoading(true);
    try {
      const res =
        await ConnectorStatusServices.getInstance().getConnectorStatus([
          ...queryParams,
          { name: 'PageIndex', value: page }
        ]);
      setConnectorStatuses(res?.Data);
      setTotalDataCount(res?.TotalCount);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<IConnectorStatusFilter> = async (
    data: IConnectorStatusFilter
  ) => {
    setCurrentPage(1);
    const queryParamsData: IHTTPSParams[] =
      convertFormDataToQueryParams<IConnectorStatusFilter>(data);
    setQueryParams(queryParamsData);
    setRefreshComponent(!refreshComponent);
  };

  useEffect(() => {
    getConnectorStatuses();
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
                title: t('connectorStatus')
              }
            ]}
          />
          {/* <Tooltip placement="right" title={t('addBtn')}>
            <AppHandledButton
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              loading={loading}
              onClick={() => {
                setShowAddConnectorStatusModal(true);
              }}
              icon={<AiOutlinePlus />}
            />
          </Tooltip> */}
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
                      label={t('chargePointName')}
                      name="ChargePointName"
                      inputProps={{
                        id: 'ChargePointName'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('chargePointName'))}
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
                      label={t('LegalEntityName')}
                      name="LegalEntityName"
                      inputProps={{
                        id: 'LegalEntityName'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('LegalEntityName'))}
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
                      label={t('voen')}
                      name="VOEN"
                      inputProps={{
                        id: 'VOEN'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('voen'))}
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
              columns={columns}
              expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
              dataSource={connectorStatuses!}
              rowKey={'ChargePointId'}
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

      {/* {selectedItem && showViewConnectorStatusModal && (
        <ViewConnectorStatusModal
          showViewConnectorStatusModal={showViewConnectorStatusModal}
          setShowViewConnectorStatusModal={setShowViewConnectorStatusModal}
          selectedItem={selectedItem}
        />
      )} */}
      {/* {showAddConnectorStatusModal && (
        <AddConnectorStatus
          showAddConnectorStatusModal={showAddConnectorStatusModal}
          setShowAddConnectorStatusModal={setShowAddConnectorStatusModal}
        />
      )} */}

      {selectedItem && showUpdateConnectorStatusModal && (
        <EditConnectorStatusModal
          showUpdateConnectorStatusModal={showUpdateConnectorStatusModal}
          setShowUpdateConnectorStatusModal={setShowUpdateConnectorStatusModal}
          setRefreshComponent={setRefreshComponent}
          selectedItem={selectedItem}
          chargePointId={chargePointId!}
          // connectorTypes={connectorTypes!}
        />
      )}
    </div>
  );
}

export default ConnectorStatus;
