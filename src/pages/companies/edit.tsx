import CustomAvatar from '@/components/custom-avatar';
import { UPDATE_COMPANY_MUTATION } from '@/graphql/mutations';
import { getNameInitials } from '@/utilities';
import { Edit, useForm, useSelect } from '@refinedev/antd';
import { Col, Form, Row, Select } from 'antd';
import SelectOptionWithAvatar from '@/components/SelectOptionWithAvatar';
import { UsersSelectQuery } from '@/graphql/types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { USERS_SELECT_QUERY } from '@/graphql/queries';

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
              <Form.Item>
                <Select />
              </Form.Item>
              <Form.Item>
                <Select />
              </Form.Item>
              <Form.Item>
                <Select />
              </Form.Item>
              <Form.Item>
                <Select />
              </Form.Item>
              <Form.Item>
                <Select />
              </Form.Item>
              <Form.Item>
                <Select />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
      </Row>
    </div>
  );
};
