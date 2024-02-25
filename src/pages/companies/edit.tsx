import CustomAvatar from '@/components/custom-avatar';
import { UPDATE_COMPANY_MUTATION } from '@/graphql/mutations';
import { getNameInitials } from '@/utilities';
import { Edit, useForm, useSelect } from '@refinedev/antd';
import { Col, Form, Input, InputNumber, Row, Select } from 'antd';
import SelectOptionWithAvatar from '@/components/SelectOptionWithAvatar';
import { UsersSelectQuery } from '@/graphql/types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { USERS_SELECT_QUERY } from '@/graphql/queries';
import {
  businessTypeOptions,
  companySizeOptions,
  industryOptions,
} from '@/constants';

export const EditPage = () => {
  const { saveButtonProps, formProps, formLoading, queryResult } = useForm({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION,
    },
  });

  const { avatarUrl, name } = queryResult?.data?.data || {};

  const { selectProps, queryResult: queryResultUsers } = useSelect<
    GetFieldsFromList<UsersSelectQuery>
  >({
    resource: 'users',
    optionLabel: 'name',
    pagination: {
      mode: 'off',
    },
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });
  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} xl={12}>
          <Edit
            isLoading={formLoading}
            saveButtonProps={saveButtonProps}
            breadcrumb={false}
          >
            <Form {...formProps} layout="vertical">
              <CustomAvatar
                src={avatarUrl}
                shape="square"
                name={getNameInitials(name || '')}
                style={{ width: 96, height: 96, marginBottom: '24px' }}
              />
              <Form.Item
                label="Sales owner"
                name="salesOwnerId"
                initialValue={formProps?.initialValues?.salesOwner?.id}
              >
                <Select
                  placeholder="Please select a sales owner"
                  {...selectProps}
                  options={
                    queryResultUsers.data?.data.map(user => ({
                      value: user.id,
                      label: (
                        <SelectOptionWithAvatar
                          name={user.name}
                          avatarUrl={user.avatarUrl ?? undefined}
                        />
                      ),
                    })) ?? []
                  }
                />
              </Form.Item>
              <Form.Item label="Company size" name="companySize">
                <Select options={companySizeOptions} />
              </Form.Item>
              <Form.Item label="Total revenue" name="totalRevenue">
                <InputNumber
                  autoFocus
                  placeholder="0,00"
                  min={0}
                  addonBefore="$"
                />
              </Form.Item>
              <Form.Item label="Industry" name="industry">
                <Select options={industryOptions} />
              </Form.Item>
              <Form.Item label="Business type" name="businessType">
                <Select options={businessTypeOptions} />
              </Form.Item>
              <Form.Item label="Country" name="country">
                <Input placeholder="Country" />
              </Form.Item>
              <Form.Item label="Website" name="website">
                <Input placeholder="Website" />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
      </Row>
    </div>
  );
};
