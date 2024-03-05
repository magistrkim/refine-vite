import React from 'react';
import {
  KanbanBoardContainer,
  KanbanBoard,
} from '@/components/tasks/kanban/board';
import KanbanColumn from '@/components/tasks/kanban/column';
import KanbanItem from '@/components/tasks/kanban/item';
import { KanbanAddCardButton } from '@/components/tasks/kanban/addCardButton';
import { TASKS_QUERY, TASK_STAGES_QUERY } from '@/graphql/queries';
import { useList } from '@refinedev/core';
import { TaskStage } from '@/graphql/schema.types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { TasksQuery } from '@/graphql/types';
import { ProjectCardMemo } from '@/components/tasks/kanban/card';

export const TasksList = () => {
  const { data: stages, isLoading: isLoadingStages } = useList<TaskStage>({
    resource: 'taskStages',
    sorters: [
      {
        field: 'createdAt',
        order: 'asc',
      },
    ],
    filters: [
      {
        field: 'title',
        operator: 'in',
        value: ['TODO', 'IN PROGRESS', 'IN REVIEW', 'DONE'],
      },
    ],
    meta: {
      gqlQuery: TASK_STAGES_QUERY,
    },
  });

  const { data: tasks, isLoading: isLoadingTasks } = useList<
    GetFieldsFromList<TasksQuery>
  >({
    resource: 'tasks',
    sorters: [
      {
        field: 'dueDate',
        order: 'asc',
      },
    ],
    pagination: {
      mode: 'off',
    },
    queryOptions: {
      enabled: !!stages,
    },
    meta: {
      gqlQuery: TASKS_QUERY,
    },
  });
  const taskStages = React.useMemo(() => {
    if (!tasks?.data || !stages?.data) {
      return {
        unassignedStage: [],
        stages: [],
      };
    }

    const unassignedStage = tasks.data.filter(task => task.stageId === null);

    const grouped: TaskStage[] = stages.data.map(stage => ({
      ...stage,
      tasks: tasks.data.filter(task => task.stageId?.toString() === stage.id),
    }));

    return {
      unassignedStage,
      columns: grouped,
    };
  }, [stages, tasks]);
  const handleAddCard = (args: { stageId: string }) => {};
  return (
    <div>
      <KanbanBoardContainer>
        <KanbanBoard>
          <KanbanColumn
            id="unassigned"
            title={'unassigned'}
            count={taskStages.unassignedStage.length || 0}
            onAddClick={() => handleAddCard({ stageId: 'unassigned' })}
          >
            {taskStages.unassignedStage.map(task => (
              <KanbanItem
                key={task.id}
                id={task.id}
                data={{ ...task, stageId: 'unassined' }}
              >
                <ProjectCardMemo
                  {...task}
                  dueDate={task.dueDate || undefined}
                />
              </KanbanItem>
            ))}

            {!taskStages.unassignedStage.length && (
              <KanbanAddCardButton
                onClick={() => handleAddCard({ stageId: 'unassigned' })}
              />
            )}
          </KanbanColumn>
        </KanbanBoard>
      </KanbanBoardContainer>
    </div>
  );
};
