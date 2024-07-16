import { Typography, TypographyProps } from 'antd';
import { EllipsisConfig } from 'antd/es/typography/Base';
import { t } from 'i18next';
import { CSSProperties } from 'react';

interface IProps {
  record: string;
  style?: CSSProperties;
  emptyText?: string;
  ellipsis?: boolean | EllipsisConfig | undefined;
  paragraphProps?: TypographyProps;
}

/**
 * Renders ellipsis text for a given record.
 * @param {string} record - The text to render with ellipsis
 * @returns {Typography.Paragraph} Paragraph element with ellipsis
 */
function AppHandledEllipsisText({
  record,
  paragraphProps,
  style,
  emptyText,
  ellipsis
}: IProps) {
  return (
    <Typography.Paragraph
      style={style || { margin: 0 }}
      ellipsis={ellipsis || { rows: 1, tooltip: record }}
      {...paragraphProps}
    >
      {record || emptyText || t('noDataText')}
    </Typography.Paragraph>
  );
}

export default AppHandledEllipsisText;
