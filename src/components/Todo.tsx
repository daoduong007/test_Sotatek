import React, { useState } from 'react';
import { Button, Collapse, Input } from 'antd';

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

const dataInit = {
  task: '',
  description: '',
  dueDate: moment(),
  priority: 'normal',
  isChecked: false,
};

export const Todo = () => {
  const { Panel } = Collapse;

  const [listItemToRemove, setListItemToRemove] = useState<string[]>(
    [],
  );
  const [isResultNull, setIsResultNull] = useState<boolean>(false);
  const [listTodo, setListTodo] = useState<ITodo[]>([]);
  const [listTodoSearch, setListTodoSearch] = useState<ITodo[]>([]);
  const typeingTimeoutRef = React.useRef<any>(null);

  const handleAddTodo = (
    lastTask?: string,
    task?: string,
    description?: string,
    dueDate?: any,
    priority?: string,
    isChecked?: boolean,
  ) => {
    let arr = listTodo.filter((todo) => todo.task === lastTask);
    let arr2: Array<ITodo> = listTodo.filter(
      (todo) => todo.task !== lastTask,
    );

    if (arr.length === 0) {
      //add task
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
    } else {
      //update task
      setListTodo([
        ...arr2,
        {
          task: task,
          description: description,
          dueDate: dueDate,
          priority: priority,
          isChecked: false,
        },
      ]);
    }
  };

  const handleCheck = (value: string) => {
    //add or remove value of list item to remove
    let arrray = [];
    arrray = listItemToRemove.filter((item) => item === value);

    if (arrray.length > 0) {
      setListItemToRemove((prev) =>
        prev.filter((item) => item !== value),
      );
    } else {
      setListItemToRemove((prev) => [...prev, value]);
    }
  };

  const handleBulkRemove = () => {
    let arr: Array<ITodo> = listTodo;

    for (let i = 0; i < listItemToRemove.length; i++) {
      arr = arr.filter((item) => item.task !== listItemToRemove[i]);
    }

    setListTodo(arr);
    setListItemToRemove([]);

    let checkboxes = document.getElementsByName('list');

    console.log(checkboxes);
  };

  const handleRemoveOneTask = (task: string) => {
    setListTodo(listTodo.filter((item) => item.task !== task));
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
        <TodoItem
          onclick={handleAddTodo}
          data={dataInit}
          addOrUpdate='Add'
        />
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
                          <Button
                            className='btn-remove'
                            onClick={(e) => {
                              alert('12');
                            }}
                          >
                            Remove
                          </Button>
                        </>
                      }
                    >
                      <TodoItem
                        onclick={handleAddTodo}
                        data={todoItem}
                        addOrUpdate='Update'
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
                          <div>
                            <input
                              type='checkbox'
                              onChange={(e) => {
                                handleCheck(e.target.value);
                              }}
                              value={todoItem.task}
                              name='list'
                              id={todoItem.task}
                            />
                            <label htmlFor={todoItem.task}>
                              {todoItem.task}
                            </label>
                          </div>

                          <Button
                            className='btn-remove'
                            onClick={() => {
                              handleRemoveOneTask(todoItem.task);
                            }}
                          >
                            Remove
                          </Button>
                        </>
                      }
                    >
                      <TodoItem
                        onclick={handleAddTodo}
                        data={todoItem}
                        addOrUpdate='Update'
                      />
                    </Panel>
                  ),
                )}
              </>
            )}
          </Collapse>
        </div>

        {listItemToRemove.length > 0 ? (
          <div className='confirm-all'>
            <p>Bulk action:</p>
            <div>
              <Button
                className='btn-remove-all'
                onClick={() => handleBulkRemove()}
              >
                Remove
              </Button>
              <Button
                className='btn-done-all'
                onClick={() => alert('Done')}
              >
                Done
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </StyledTodoContainer>
  );
};
