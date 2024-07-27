import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import TodoSvg from "./assets/icon/todo_svg.svg";
import TodoLogo2 from "./assets/icon/todo_logo2.gif";
import { Done } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos(() => {
        return [...todos, { task: inputValue, id: uuidv4() }];
      });
      setInputValue("");
    }
  };

  const handleRemoveTodo = (id) => {
    setTodos((prevTodo) => prevTodo.filter((todoS) => todoS.id !== id));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleMarkAsDone = (id) => {
    setTodos((prevTodo) => {
      return prevTodo.map((todoS) => {
        if (todoS.id == id) {
          return {
            ...todoS,
            isDone: true,
          };
        } else {
          return todoS;
        }
      });
    });
  };

  const handleRemoveMarkDone = (id) => {
    setTodos((prevTodo) => {
      return prevTodo.map((todoS) => {
        if (todoS.id == id) {
          return {
            ...todoS,
            isDone: false,
          };
        } else {
          return todoS;
        }
      });
    });
  };
  const removeAll = () => {
    setTodos([]);
  };
  return (
    <Box
      m={0}
      p={0}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        className="todo-main-container"
        sx={{
          minWidth: 230,
          maxWidth: 500,
          padding: "20px",
          background: "#fff",
          zIndex: 1,
        }}
      >
        <Typography variant="h4" fontWeight={650} p={"15px"}>
          Todo{" "}
          <img
            src={TodoLogo2}
            style={{ width: "42px", marginBottom: "-6px" }}
          />
        </Typography>

        <Box>
          <TextField
            size="small"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter Your Task Here..."
            sx={{ minWidth: 310, maxWidth: 600, mb: "20px" }}
          ></TextField>
        </Box>
        <Box height={"300px"} overflow={"auto"}>
          {todos.length > 0 ? (
            <Box
              mt={"0px"}
              sx={{ cursor: "pointer" }}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Typography className="todo-work" mt={0.5}>
                Today's Works
              </Typography>
              <Typography className="todo-work" mt={0.5} paddingRight={"7px"}>
                Done Rem
              </Typography>
            </Box>
          ) : (
            <img
              src={TodoSvg}
              style={{ marginTop: "30px", textDecoration: "" }}
            />
          )}
          <Box minWidth={300} className="todo-works">
            <ul className="todo-list">
              {todos.map((todo, index) => (
                <li key={todo.id} className="li-list-todo">
                  <div
                    className={`textOfTodo ${todo.isDone ? "done" : "unDone"}`}
                  >
                    <div>{index + 1}.</div>
                    <div className="todo-list-text">{todo.task}</div>
                  </div>
                  <Box className="icons">
                    {todo.isDone ? (
                      <RemoveDoneIcon
                        sx={{ color: "green", cursor: "pointer" }}
                        onClick={() => handleRemoveMarkDone(todo.id)}
                        className="todo-cancel"
                      />
                    ) : (
                      <Done
                        sx={{ color: "green", cursor: "pointer" }}
                        onClick={() => handleMarkAsDone(todo.id)}
                        className="todo-cancel"
                      />
                    )}

                    <CloseIcon
                      sx={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleRemoveTodo(todo.id)}
                      className="todo-cancel"
                    />
                  </Box>
                </li>
              ))}
            </ul>
          </Box>
        </Box>
        <Box className="login-submit">
          <Button onClick={removeAll} size="small" variant="contained">
            Remove ALL
          </Button>
          <Button onClick={handleAddTodo} size="small" variant="contained">
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Todo;
