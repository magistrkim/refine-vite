import { Card } from 'antd';
import { Text } from '../text';
import { UnorderedListOutlined } from '@ant-design/icons';

const DashboardLatestActivities = () => {
  return (
    <Card
      style={{ height: '96px', padding: '0' }}
      headStyle={{ padding: '16px' }}
      bodyStyle={{ padding: '0 1rem' }}
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <UnorderedListOutlined />
          <Text size="sm" style={{ marginLeft: '0.7rem' }}>
            Latest Activities
          </Text>
        </div>
      }
    ></Card>
  );
};

export default DashboardLatestActivities;
