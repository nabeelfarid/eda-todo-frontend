import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormikMuiTextField from "./FormikMuiTextField";
import { Button } from "gatsby-theme-material-ui";
import Error from "./Error";
import Loader from "./Loader";

import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as subscriptions from "../graphql/subscriptions";
import { API, graphqlOperation } from "aws-amplify";
import {
  Todo,
  GetTodosQuery,
  CreateTodoMutation,
  OnGenerateActionSubscription,
  ACTIONS,
} from "../API";
import { Delete } from "@material-ui/icons";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "../../node_modules/zen-observable-ts";
import { AWSAppSyncRealTimeProvider } from "@aws-amplify/pubsub/src/Providers";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState<Todo[]>(null);
  const [selectedTodos, setSelectedTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const { data } = (await API.graphql(
        graphqlOperation(queries.getTodos)
      )) as GraphQLResult<GetTodosQuery>;

      console.log(data);
      setData(data.getTodos);
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchTodos();
  }, []);

  const handleCreateTodoAction = (
    value: GraphQLResult<OnGenerateActionSubscription>
  ) => {
    setData((prev) => [
      {
        id: value.data.onGenerateAction.id,
        title: value.data.onGenerateAction.title,
        done: value.data.onGenerateAction.done,
        __typename: "Todo",
      },
      ...prev,
    ]);
  };
  const handleUpdateTodoAction = (
    value: GraphQLResult<OnGenerateActionSubscription>
  ) => {
    setData((old) => {
      const i = old.findIndex((td) => td.id === value.data.onGenerateAction.id);
      old[i].done = !old[i].done;
      return old;
    });

    setSelectedTodos((old) =>
      old.filter((td) => td.id !== value.data.onGenerateAction.id)
    );
  };

  const handleDeleteTodoAction = (
    value: GraphQLResult<OnGenerateActionSubscription>
  ) => {
    setData((old) =>
      old.filter((td) => td.id !== value.data.onGenerateAction.id)
    );

    setSelectedTodos((old) =>
      old.filter((td) => td.id !== value.data.onGenerateAction.id)
    );
  };

  useEffect(() => {
    const subscriptionObservable = API.graphql(
      graphqlOperation(subscriptions.onGenerateAction)
    ) as Observable<object>;

    let subscription = subscriptionObservable.subscribe({
      next: (payload: {
        provider: AWSAppSyncRealTimeProvider;
        value: GraphQLResult<OnGenerateActionSubscription>;
      }) => {
        console.log(payload);

        switch (payload.value.data.onGenerateAction.action) {
          case ACTIONS.CREATE_TODO:
            handleCreateTodoAction(payload.value);
            break;
          case ACTIONS.UPDATE_TODO:
            handleUpdateTodoAction(payload.value);
            break;
          case ACTIONS.DELETE_TODO:
            handleDeleteTodoAction(payload.value);
            break;
          default:
            break;
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleCreateTodoEvent = async (
    values: {
      title: string;
      done: boolean;
    },
    formikHelpers: FormikHelpers<{
      title: string;
      done: boolean;
    }>
  ) => {
    try {
      const { data } = (await API.graphql(
        graphqlOperation(mutations.createTodo, { title: values.title })
      )) as GraphQLResult<CreateTodoMutation>;

      console.log("Create/Update Todo Event Id: ", data.createTodo.id);
      formikHelpers.resetForm();
    } catch (error) {
      console.log("Create/Update Todo Event Error", error);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  const handleUpdateTodoEvent = async (todo: Todo) => {
    await API.graphql(
      graphqlOperation(mutations.updateTodo, {
        done: !todo.done,
        id: todo.id,
      })
    );
  };

  const handleDeleteTodoEvent = async (todo: Todo) => {
    await API.graphql(
      graphqlOperation(mutations.deleteTodo, {
        id: todo.id,
      })
    );
  };

  return (
    <>
      <Box>
        <Formik
          initialValues={{ title: "", done: false }}
          validationSchema={Yup.object({
            title: Yup.string().trim().required().min(1).max(50),
          })}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleCreateTodoEvent}
        >
          {(props) => (
            <Form>
              <Grid container spacing={2} justify="center" alignItems="stretch">
                <Grid item xs={6}>
                  <FormikMuiTextField
                    name="title"
                    label="Add Todo"
                    variant="outlined"
                    fullWidth
                    autoFocus
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    startIcon={
                      props.isSubmitting && (
                        <CircularProgress color="secondary" size="1rem" />
                      )
                    }
                    disabled={props.isSubmitting}
                    style={{ height: "100%" }}
                  >
                    Send Save Request
                  </Button>
                </Grid>
              </Grid>

              {/* <hr />
              <pre>{JSON.stringify(props.errors, null, 4)}</pre>
              <pre>{JSON.stringify(props.values, null, 4)}</pre> */}
            </Form>
          )}
        </Formik>
      </Box>

      {error && <Error error={error} />}
      {loading && <Loader showCircularProgress={false} />}
      {data && data.length > 0 && (
        <Box mt={2}>
          <Card variant="outlined">
            <CardContent>
              <List>
                {data
                  // .sort((a, b) => b.id - a.id)
                  .map((todo, index) => (
                    <React.Fragment key={`Todo-${todo.id}`}>
                      <ListItem
                        key={`ListItem-${todo.id}`}
                        button
                        dense
                        onClick={() => {
                          setSelectedTodos((p) => [...p, todo]);
                          handleUpdateTodoEvent(todo);
                        }}
                        disabled={selectedTodos.some((t) => t.id === todo.id)}
                      >
                        <ListItemIcon>
                          <Checkbox
                            color="primary"
                            edge="start"
                            checked={todo.done}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{
                              "aria-labelledby": todo.id.toString(),
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={todo.title} />
                        <ListItemSecondaryAction>
                          <IconButton
                            aria-label="delete"
                            onClick={() => {
                              setSelectedTodos((p) => [...p, todo]);
                              handleDeleteTodoEvent(todo);
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {selectedTodos.some((t) => t.id === todo.id) ? (
                        <LinearProgress color="secondary" />
                      ) : (
                        index < data.length - 1 && (
                          <Divider
                            variant="fullWidth"
                            component="li"
                            key={`Divider-${todo.id}`}
                          />
                        )
                      )}
                    </React.Fragment>
                  ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
