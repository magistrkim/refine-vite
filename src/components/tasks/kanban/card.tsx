import { Text } from '@/components/text';
import { User } from '@/graphql/schema.types';
import { DeleteOutlined, EyeOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Card, ConfigProvider, Dropdown, MenuProps, theme } from 'antd';
import React, { useMemo } from 'react';

type ProjectCardProps = {
  id: string;
  title: string;
  updatedAt: string;
  dueDate?: string;
  users?: {
    id: string;
    name: string;
    avatarUrl?: User['avatarUrl'];
  }[];
};

const ProjectCard = ({ id, title, dueDate, users }: ProjectCardProps) => {
  const { token } = theme.useToken();
  const editCard = () => {};
  const deleteCard = () => {};

  const dropdownItems = useMemo(() => {
    const dropdownItems: MenuProps['items'] = [
      {
        label: 'View Card',
        key: '1',
        icon: <EyeOutlined />,
        onClick: () => {
          editCard();
        },
      },
      {
        danger: true,
        label: 'Delete Card',
        key: '2',
        icon: <DeleteOutlined />,
        onClick: () => {
          deleteCard();
        },
      },
    ];
    return dropdownItems;
  }, []);
  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            colorText: token.colorTextSecondary,
          },
          Card: {
            headerBg: 'transparent',
          },
        },
      }}
    >
      <Card
        size="small"
        title={<Text ellipsis={{ tooltip: title }}>{title}</Text>}
        onClick={() => editCard()}
        extra={
          <Dropdown
            trigger={['click']}
            menu={{
              items: dropdownItems,
            }}
          >
            <Button
              type="text"
              shape="circle"
              icon={<MoreOutlined style={{ transform: 'rotate(90deg)' }} />}
            />
          </Dropdown>
        }
      >
        Card
      </Card>
    </ConfigProvider>
  );
};

export default ProjectCard;
