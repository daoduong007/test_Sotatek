import { Button, DatePicker, Input, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface ITodoItem {
  onclick: (
    task?: string,
    description?: string,
    dueDate?: any,
    priority?: string,
    isChecked?: boolean,
  ) => void;
  update?: string;
}

export const TodoItem = (props: ITodoItem) => {
  const { TextArea } = Input;
  const { Option } = Select;
  const dateFormat = 'DD/MM/YYYY';
  const { onclick, update } = props;

  const [newTask, setNewTask] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<any>(moment());
  const [priority, setPriority] = useState<string>('normal');
  const [isErrorVisible, setIsErrorVisible] =
    useState<boolean>(false);

  return (
    <StyledItemContainer>
      <Input
        placeholder='Add new task '
        value={newTask}
        onChange={(e) => {
          setNewTask(e.target.value);
        }}
      />
      {isErrorVisible ? <p>Title is a required</p> : null}
      <h3>Description</h3>
      <TextArea
        rows={4}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <div className='new-task-option'>
        <div>
          <h3>Due Date</h3>
          <DatePicker
            style={{ width: '100%' }}
            format={dateFormat}
            ////prevent select days before today
            disabledDate={(current) => {
              return current < moment().add(-1, 'days');
            }}
            defaultValue={moment()}
            value={dueDate}
            onChange={(value) => setDueDate(value)}
          />
        </div>
        <div>
          <h3>Priority</h3>
          <Select
            defaultValue='normal'
            style={{ width: '100%' }}
            value={priority}
            onChange={(value) => setPriority(value)}
          >
            <Option value='low'>Low</Option>
            <Option value='normal'>Normal</Option>
            <Option value='hight'>Hight</Option>
          </Select>
        </div>
      </div>
      <Button
        type='primary'
        onClick={() => {
          if (newTask !== '') {
            setIsErrorVisible(false);
            onclick(newTask, description, dueDate, priority);
          } else setIsErrorVisible(true);
        }}
      >
        {update ? 'Update' : 'Add'}
      </Button>
    </StyledItemContainer>
  );
};

const StyledItemContainer = styled.div`
  width: 100%;

  p {
    color: red;
    text-align: left;
  }

  h3 {
    margin-top: 40px;
    text-align: left;
  }

  button {
    width: 100%;
    margin-top: 20px;
    border: 0;
    border-radius: 5px;

    /* :hover {
      box-shadow: 0 0 2px 0 #ff9240;
      font-weight: bold;
    } */

    color: #fff;

    background-color: #3498db;
  }

  .new-task-option {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > div {
      width: 45%;
    }
  }
`;
