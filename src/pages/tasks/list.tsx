import {
  KanbanBoardContainer,
  KanbanBoard,
} from '@/components/tasks/kanban/board';
import KanbanColumn from '@/components/tasks/kanban/column';
import KanbanItem from '@/components/tasks/kanban/item';

export const TasksList = () => {
  return (
    <div>
      <KanbanBoardContainer>
        <KanbanBoard>
          <KanbanColumn>
            <KanbanItem></KanbanItem>
          </KanbanColumn>
          <KanbanColumn>
            <KanbanItem></KanbanItem>
          </KanbanColumn>
        </KanbanBoard>
      </KanbanBoardContainer>
    </div>
  );
};
