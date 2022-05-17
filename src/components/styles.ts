import styled from 'styled-components';

export const StyledTodoContainer = styled.div`
margin-top: 20px;
padding: 0 50px;

display: flex;
flex-direction: row;
justify-content: space-between;

.new-task,
.to-do {
  padding: 20px;
  border-radius: 5px;

  box-shadow: 0 0 8px 0 #ccc;
}

.new-task {
  width: 30%;
}

.to-do {
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  label {
    margin-left: 10px;
    :hover {
      cursor: pointer;
    }
  }

  .ant-input {
    margin-bottom: 20px;
  }

  .btn-detail,
  .btn-remove {
    width: 80px;
    border: 0;
    border-radius: 5px;

    color: #fff;
  }

  .btn-detail {
    background-color: #3498db;
  }
  .btn-remove {
    background-color: #e74c3c;
  }

  .confirm-all {
    margin-top: 20px;
    padding: 5px;
    height : 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border-radius: 3px;
    border: 1px solid #ccc;

    p {
      margin: 0;
      font-size: 18px;
      font-weight: bold;
    }

    .btn-done-all,
    .btn-remove-all {
      width: 120px;
      margin-left: 10px;
      border: 0;
      border-radius: 5px;

      color: #fff;
    }
    .btn-done-all {
      background-color: #3498db;
    }

    .btn-remove-all {
      background-color: #e74c3c;
    }
  }

  .ant-collapse
    > .ant-collapse-item.ant-collapse-no-arrow
    > .ant-collapse-header {
    flex-direction: row-reverse;
  }
  .ant-collapse
    > .ant-collapse-item
    > .ant-collapse-header
    .ant-collapse-extra {
    margin-left: 0;
    width: 80%;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ant-collapse
    > .ant-collapse-item
    .ant-collapse-header-collapsible-only
    .ant-collapse-header-text {
    width: 20%;
  }
  .ant-checkbox-wrapper {
    align-items: center;
  }
}

@media (max-width: 900px) {
  padding: 0 30px;
  .new-task {
  width: 40%;
  }
  .to-do {
    width: 55%;
    .confirm-all {
      .btn-done-all,
      .btn-remove-all {
        width: 70px;
      }
    }
  }
};

@media (max-width: 820px) {
  flex-direction: column;
  align-items: center;

  .new-task {
  width: 60%;
  margin-bottom: 20px;
  }
  .to-do {
  width: 90%;

  .btn-detail,
  .btn-remove {
    width: 75px;
  }
  }
};

@media (max-width: 480px) {
  padding: 0 10px;

  .new-task ,
  .to-do {
  width: 100%;
  }
};
`;