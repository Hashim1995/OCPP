import { Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import { Form, FormItemProps, Switch } from 'antd';
import { ReactNode } from 'react';

/**
 * A custom switch component integrated with React Hook Form and Ant Design's Form.
 *
 * @param {IAppHandledSwitch} props - Props for the AppHandledSwitch component.
 * @returns {JSX.Element} - JSX element representing the AppHandledSwitch component.
 */

interface IAppHandledSwitch {
  label?: string | ReactNode;
  name: string;
  control: any;
  rules?: Omit<
    RegisterOptions<FieldValues>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  required?: boolean;
  errors?: any;
  onChangeApp?: any;
  switchProps?: any;
  formItemProps?: FormItemProps;
}

function AppHandledSwitch({
  label,
  name,
  control,
  rules,
  required,
  errors,
  onChangeApp,
  switchProps,
  formItemProps
}: IAppHandledSwitch) {
  const tooltip = errors[name] ? errors[name].message : '';

  return (
    <Form.Item
      required={required}
      htmlFor={name}
      tooltip={tooltip}
      name={name}
      {...formItemProps}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>{label}</span>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => (
            <Switch
              checked={value}
              onChange={checked => {
                onChange(checked);
                if (onChangeApp) {
                  onChangeApp(checked);
                }
              }}
              {...switchProps}
            />
          )}
        />
      </div>
    </Form.Item>
  );
}

export default AppHandledSwitch;
