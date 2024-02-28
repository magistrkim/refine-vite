import { Text } from '@/components/text';
import { PlusOutlined } from '@ant-design/icons';
import { useDroppable } from '@dnd-kit/core';
import { Badge, Button, Space } from 'antd';

const KanbanColumn = () => {
  const { isOver, setNodeRef, active } = useDroppable({
    id: '',
    data: '',
  });
  const count = 3;
  const description = 'Description';
  const title = 'Title';
  const onAddClickHandler = () => {};
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0 16px',
      }}
      ref={setNodeRef}
    >
      <div
        style={{
          padding: '12px',
        }}
      >
        <Space
          style={{
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Space>
            <Text
              ellipsis={{ tooltip: title }}
              size="xs"
              strong
              style={{
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </Text>
            {!!count && <Badge count={count} color="teal" />}
          </Space>
          <Button
            onClick={onAddClickHandler}
            shape="circle"
            icon={<PlusOutlined />}
          />
        </Space>
        {description}
      </div>
      <div></div>
    </div>
  );
};

export default KanbanColumn;
