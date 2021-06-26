/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo($title: String!) {
    createTodo(title: $title) {
      id
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;
export const generateAction = /* GraphQL */ `
  mutation GenerateAction(
    $action: ACTIONS
    $done: Boolean
    $id: ID
    $title: String
  ) {
    generateAction(action: $action, done: $done, id: $id, title: $title) {
      action
      done
      id
      title
    }
  }
`;
export const test = /* GraphQL */ `
  mutation Test($value: String!) {
    test(value: $value)
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo($done: Boolean!, $id: ID!) {
    updateTodo(done: $done, id: $id) {
      id
    }
  }
`;
