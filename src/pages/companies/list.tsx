import { COMPANIES_LIST_QUERY } from '@/graphql/queries';
import { CreateButton, FilterDropdown, List } from '@refinedev/antd';
import { getDefaultFilter, useGo } from '@refinedev/core';
import { useTable } from '@refinedev/antd';
import { Table, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CustomAvatar from '@/components/custom-avatar';
import { Text } from '@/components/text';
import { Company } from '@/graphql/schema.types';
import { currencyNumber } from '@/utilities';

export const CompaniesList = () => {
  const go = useGo();
  const { tableProps, filters } = useTable({
    resource: 'companies',
    pagination: {
      pageSize: 12,
    },
    meta: {
      gqlQuery: COMPANIES_LIST_QUERY,
    },
  });
  return (
    <List
      breadcrumb={false}
      headerButtons={() => (
        <CreateButton
          onClick={() => {
            go({
              to: {
                resource: 'companies',
                action: 'create',
              },
              options: {
                keepQuery: true,
              },
              type: 'replace',
            });
          }}
        />
      )}
    >
      <Table {...tableProps} pagination={{ ...tableProps.pagination }}>
        <Table.Column<Company>
          title="Company Title"
          dataIndex="name"
          defaultFilteredValue={getDefaultFilter('id', filters)}
          filterIcon={<SearchOutlined />}
          filterDropdown={props => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Company" />
            </FilterDropdown>
          )}
          render={(value, record) => (
            <Space>
              <CustomAvatar
                shape="square"
                name={record.name}
                src={record.avatarUrl}
              />
              <Text style={{ whiteSpace: 'nowrap' }}>{record.name}</Text>
            </Space>
          )}
        />
        <Table.Column<Company>
          dataIndex="totalRevenue"
          title="Open deals amount"
          render={(value, company) => (
            <Text style={{ whiteSpace: 'nowrap' }}>
              {currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}
            </Text>
          )}
        />
      </Table>
    </List>
  );
};
