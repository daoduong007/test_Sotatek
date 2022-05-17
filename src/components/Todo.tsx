import React, { useState } from 'react';
import { Button, Collapse, Checkbox, Input } from 'antd';

import moment from 'moment';
import { TodoItem } from './TodoItem';
import { Sort, Search } from '../utils/sort';
import { StyledTodoContainer } from './styles';

interface ITodo {
  task?: string;
  description?: string;
  dueDate?: any;
  priority?: string;
  isChecked?: boolean;
}

export const Todo = () => {
  const { Panel } = Collapse;

  const [isBulkActionVisible, setIsBulkActionVisible] =
    useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isResultNull, setIsResultNull] = useState<boolean>(false);
  const [listTodo, setListTodo] = useState<ITodo[]>([]);
  const [listTodoSearch, setListTodoSearch] = useState<ITodo[]>([]);
  const typeingTimeoutRef = React.useRef<any>(null);

  const handleAddTodo = (
    task?: string,
    description?: string,
    dueDate?: any,
    priority?: string,
    isChecked?: boolean,
  ) => {
    setListTodo((prev) => [
      ...prev,
      {
        task: task,
        description: description,
        dueDate: dueDate,
        priority: priority,
        isChecked: false,
      },
    ]);
  };

  //search feature use debounce
  const handleSearch = (value: string) => {
    let result = Search(listTodo, value);

    if (result.length === 0) {
      setIsResultNull(true);
      return;
    }

    setIsResultNull(false);
    setListTodoSearch(Search(listTodo, value));
  };
  //custom debounce
  const DebounceJS = (e: any) => {
    const searchTermValue = e.target.value;

    if (typeingTimeoutRef.current) {
      clearTimeout(typeingTimeoutRef.current);
    }
    typeingTimeoutRef.current = setTimeout(() => {
      handleSearch(searchTermValue);
      console.log(searchTermValue);
    }, 400);
  };

  return (
    <StyledTodoContainer>
      <div className='new-task'>
        <h2>New task</h2>
        <TodoItem onclick={handleAddTodo} />
      </div>

      <div className='to-do'>
        <div>
          <h2>To do list</h2>

          <Input
            placeholder='Search by title of task'
            onChange={(e) => {
              DebounceJS(e);
            }}
          />

          <Collapse accordion={true}>
            {listTodoSearch.length !== 0 && !isResultNull ? (
              <>
                {Sort(listTodoSearch, 'dueDate', 'increase').map(
                  (todoItem, index) => (
                    <Panel
                      key={index}
                      collapsible='header'
                      showArrow={false}
                      header={
                        <Button className='btn-detail'>Detail</Button>
                      }
                      extra={
                        <>
                          <p>
                            {todoItem.dueDate.format('DD/MM/YYYY')}
                          </p>
                          <Button className='btn-remove'>
                            Remove
                          </Button>
                        </>
                      }
                    >
                      <TodoItem
                        onclick={handleAddTodo}
                        update='update'
                      />
                    </Panel>
                  ),
                )}
              </>
            ) : listTodoSearch.length !== 0 && isResultNull ? (
              <h2>No data matching</h2>
            ) : (
              <>
                {Sort(listTodo, 'dueDate', 'increase').map(
                  (todoItem, index) => (
                    <Panel
                      key={index}
                      collapsible='header'
                      showArrow={false}
                      header={
                        <Button className='btn-detail'>Detail</Button>
                      }
                      extra={
                        <>
                          <Checkbox checked={todoItem.isChecked}>
                            {todoItem.task}
                          </Checkbox>
                          <p>
                            {todoItem.dueDate.format('DD/MM/YYYY')}
                          </p>

                          <Button className='btn-remove'>
                            Remove
                          </Button>
                        </>
                      }
                    >
                      <TodoItem
                        onclick={handleAddTodo}
                        update='update'
                      />
                    </Panel>
                  ),
                )}
              </>
            )}
          </Collapse>
        </div>

        {isBulkActionVisible ? (
          <div className='confirm-all'>
            <p>Bulk action:</p>
            <div>
              <Button className='btn-remove-all'>Remove</Button>
              <Button className='btn-done-all'>Done</Button>
            </div>
          </div>
        ) : null}
      </div>
    </StyledTodoContainer>
  );
};
