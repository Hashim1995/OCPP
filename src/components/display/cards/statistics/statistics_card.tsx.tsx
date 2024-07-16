import { Card, Grid, Row, Space, Typography, theme } from 'antd';
import { BiFile } from 'react-icons/bi';
import { IStatisticsListItem } from '@/modules/home/models';
import { t } from 'i18next';
// import { noDataText } from '@/utils/constants/texts';

function StatisticsCard({
  Id,
  Name,
  Count,
  Icon,
  loading
}: IStatisticsListItem) {
  const { useToken } = theme;
  const { token } = useToken();
  const { useBreakpoint } = Grid;
  const { lg } = useBreakpoint();
  return (
    <Card
      loading={loading ?? false}
      style={{ width: '100%', marginBottom: token.marginSM }}
      key={Id}
      title={Name ?? t('noDataText')}
    >
      <Space size="middle" direction={!lg ? 'vertical' : 'horizontal'}>
        <Row align="middle">{Icon ?? <BiFile />}</Row>
        <Typography.Text style={{ fontSize: token.fontSizeXL }}>
          {Count ?? 0}{' '}
        </Typography.Text>
      </Space>
    </Card>
  );
}

export default StatisticsCard;
