import { CreateButton, List } from '@refinedev/antd';
import { useGo } from '@refinedev/core';

export const CompaniesList = () => {
  const go = useGo();
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
    ></List>
  );
};
