/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type TodoEvent = {
  __typename: "TodoEvent",
  id: string,
};

export enum ACTIONS {
  CREATE_TODO = "CREATE_TODO",
  DELETE_TODO = "DELETE_TODO",
  UPDATE_TODO = "UPDATE_TODO",
}


export type GenerateActionOutput = {
  __typename: "GenerateActionOutput",
  action: ACTIONS,
  done: boolean,
  id: string,
  title: string,
};

export type Todo = {
  __typename: "Todo",
  done: boolean,
  id: string,
  title: string,
};

export type CreateTodoMutationVariables = {
  title: string,
};

export type CreateTodoMutation = {
  createTodo:  {
    __typename: "TodoEvent",
    id: string,
  },
};

export type DeleteTodoMutationVariables = {
  id: string,
};

export type DeleteTodoMutation = {
  deleteTodo:  {
    __typename: "TodoEvent",
    id: string,
  },
};

export type GenerateActionMutationVariables = {
  action?: ACTIONS | null,
  done?: boolean | null,
  id?: string | null,
  title?: string | null,
};

export type GenerateActionMutation = {
  generateAction?:  {
    __typename: "GenerateActionOutput",
    action: ACTIONS,
    done: boolean,
    id: string,
    title: string,
  } | null,
};

export type TestMutationVariables = {
  value: string,
};

export type TestMutation = {
  test?: string | null,
};

export type UpdateTodoMutationVariables = {
  done: boolean,
  id: string,
};

export type UpdateTodoMutation = {
  updateTodo:  {
    __typename: "TodoEvent",
    id: string,
  },
};

export type GetTodosQuery = {
  getTodos:  Array< {
    __typename: "Todo",
    done: boolean,
    id: string,
    title: string,
  } >,
};

export type OnGenerateActionSubscription = {
  onGenerateAction?:  {
    __typename: "GenerateActionOutput",
    action: ACTIONS,
    done: boolean,
    id: string,
    title: string,
  } | null,
};

export type OnTestSubscription = {
  onTest: string,
};
