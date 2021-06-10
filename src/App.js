import logo from "./logo.svg";
import "./App.css";
import styled, { createGlobalStyle } from "styled-components";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoListItem from "./components/TodoListItem";
import TodoList from "./components/TodoList";
import {
  useCallback,
  useState,
  useRef,
  useReducer,
} from "react/cjs/react.development";

const GlobalStyle = createGlobalStyle`
body{
  background: #e9ecef;
}
`;

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}
function reducer(todos, action) {
  switch (action.type) {
    case "INSERT": {
      return [...todos, action.todo];
    }
    case "REMOVE": {
      return todos.filter((todo) => todo.id !== action.id);
    }
    case "TOGGLE": {
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo
      );
    }
    default:
      return todos;
  }
}
function App() {
  const [todos, dispatch] = useReducer(reducer, undefined, createBulkTodos);
  // const [todos, setTodos] = useState(createBulkTodos);

  const nextId = useRef(2501);

  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     text: "리액트 기초",
  //     checked: true,
  //   },
  //   {
  //     id: 2,
  //     text: "컴포넌트 스타일링",
  //     checked: false,
  //   },
  // ]);
  // const nextId = useRef(todos.length + 1);

  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      dispatch({ type: "INSERT", todo });
      // setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos]
  );

  const onRemove = useCallback(
    (id) => {
      // console.log("id의값");
      // console.log(id);
      dispatch({ type: "REMOVE", id });
    },
    [todos]
  );

  const onToggle = useCallback(
    (id) => {
      dispatch({ type: "TOGGLE", id });
    },
    [todos]
  );

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList
          todos={todos}
          onRemove={onRemove}
          onToggle={onToggle}
        ></TodoList>
      </TodoTemplate>
    </>
  );
}

export default App;
