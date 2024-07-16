import AppHandledButton from '@/components/display/button/handle-button';
import AppEmpty from '@/components/display/empty/app-empty';
import AppPagination from '@/components/display/pagination/pagination';
import AppHandledInput from '@/components/forms/input/handled_input';
import { MenuClickEvent } from '@/models/common';
import { IConnectorType } from '@/modules/charge-point/models';
import { IConnectorStatusFilter } from '@/modules/connector-status/models';
import { IHTTPSParams } from '@/services/adapter-config/config';
import { ConnectorTypeServices } from '@/services/connector-type-services/connector-type-services';
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
  Tooltip,
  Typography,
  theme
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import AppHandledEllipsisText from '@/components/display/ellipsisText/AppHandledEllipsisText';
import AddConnectorTypeModal from '../modals/add-connector-type';
import EditConnectorTypeModal from '../modals/edit-connector-type';

function ConnectorTypes() {
  const [connectorTypes, setConnectorTypes] = useState<IConnectorType[] | null>(
    null
  );
  const [totalCount, setTotalDataCount] = useState<number>(1);
  const [queryParams, setQueryParams] = useState<IHTTPSParams[]>([]);
  const [page, setCurrentPage] = useState<number>(1);
  const [refreshComponent, setRefreshComponent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IConnectorType>();

  const [showAddConnectorTypeModal, setShowAddConnectorTypeModal] =
    useState<boolean>(false);
  const [showEditConnectorTypeModal, setShowEditConnectorTypeModal] =
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
    //   label: <Typography.Text>{t('delete')}</Typography.Text>,
    //   key: '2'
    // }
  ];

  const handleMenuClick = (e: MenuClickEvent, raw: IConnectorType) => {
    if (e?.key === '0') {
      setSelectedItem(raw);
      setShowEditConnectorTypeModal(true);
    }
    if (e?.key === '1') {
      //   setSelectedItem(raw);
    }
    // if (e?.key === '2') {
    //   setSelectedItem(raw.id.toString());
    //   setShowDeleteConfirmationModal(true);
    // }
  };

  const columns: ColumnsType<IConnectorType> = [
    {
      title: t('connectorTypeId'),
      dataIndex: 'Id',
      key: 'Id',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('connectorTypeName'),
      dataIndex: 'Type',
      key: 'Type',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('ImagePath'),
      dataIndex: 'ImagePath',
      key: 'ImagePath',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: '',
      align: 'right',
      key: 'actions',
      render: (record: IConnectorType) => (
        <Space>
          <Dropdown
            menu={{
              items,
              onClick: e => handleMenuClick(e, record)
            }}
            key={record?.Id}
            trigger={['click']}
          >
            <AppHandledButton icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      )
    }
  ];

  const getConnectorTypes = async () => {
    setLoading(true);
    try {
      const res = await ConnectorTypeServices.getInstance().getConnectorTypes([
        ...queryParams,
        { name: 'PageIndex', value: page }
      ]);
      setConnectorTypes(res?.Data);
      setTotalDataCount(res?.TotalCount);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConnectorTypes();
  }, [page, refreshComponent]);

  const onSubmit: SubmitHandler<IConnectorStatusFilter> = async (data: any) => {
    setCurrentPage(1);
    const queryParamsData: IHTTPSParams[] =
      convertFormDataToQueryParams<IConnectorStatusFilter>(data);
    setQueryParams(queryParamsData);
    setRefreshComponent(!refreshComponent);
  };

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
                title: t('settings')
              },
              {
                title: t('connectorTypes')
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
                setShowAddConnectorTypeModal(true);
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
                      label={t('connectorTypeId')}
                      name="Id"
                      inputProps={{
                        id: 'Id'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('connectorTypeId'))}
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
                      label={t('connectorType')}
                      name="Type"
                      inputProps={{
                        id: 'Type'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('connectorType'))}
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
              dataSource={connectorTypes !== null ? connectorTypes : []}
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

      {showAddConnectorTypeModal && (
        <AddConnectorTypeModal
          showAddConnectorTypeModal={showAddConnectorTypeModal}
          setShowAddConnectorTypeModal={setShowAddConnectorTypeModal}
          setRefreshComponent={setRefreshComponent}
        />
      )}
      {showEditConnectorTypeModal && (
        <EditConnectorTypeModal
          setShowEditConnectorTypeModal={setShowEditConnectorTypeModal}
          showEditConnectorTypeModal={showEditConnectorTypeModal}
          selectedItem={selectedItem!}
          setRefreshComponent={setRefreshComponent}
        />
      )}
    </div>
  );
}

export default ConnectorTypes;
