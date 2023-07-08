import { PlusCircle } from "@phosphor-icons/react";
import styles from "./styles.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { WithTask } from "../WithTask/WithTask";
import { WithoutTask } from "../WithoutTask/WithoutTask";

export interface CreateTaskProps {
  content: string;
}
export function CreateTask({ content }: CreateTaskProps) {
  const [task, setTask] = useState(Array<string>);
  const [newTask, setNewTask] = useState("");
  const [valor, setValor] = useState(0);
  const [confirm, setConfirm] = useState(true);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    setTask([...task, newTask]);
    setNewTask("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewTask(event.target.value);
  }
  function deleteTask(taskToDelete: string) {
    const deleteOneTask = task.filter((tasks) => {
      return tasks !== taskToDelete;
    });
    setTask(deleteOneTask);
  }

  function isComplete(tasksDone: string) {
    {
      confirm === true
        ? task.map((tasks) => {
            if (tasks !== tasksDone) {
              setValor(valor + 1);
              return setConfirm(false);
            }
          })
        : task.map((tasks) => {
            if (tasks !== tasksDone) {
              setValor(valor - 1);
              return setConfirm(true);
            }
          });
    }
  }

  return (
    <>
      <form onSubmit={handleCreateNewTask} className={styles.form}>
        <textarea
          required
          value={newTask}
          onChange={handleNewTaskChange}
          name="task"
          placeholder="Adicione uma nova tarefa"
        />
        <button type="submit">
          Criar <PlusCircle />
        </button>
      </form>
      <div className={styles.centralized}>
        <div className={styles.tasksCreatedAndConcluded}>
          <span className={styles.createdTask}>
            Tarefas Criadas <strong>{task.length}</strong>
          </span>
          <span className={styles.concluded}>
            Concluidas{" "}
            <strong>
              {valor} de {task.length}
            </strong>
          </span>
        </div>
      </div>
      <div className={styles.tasksOrWithout}>
        {task.length > 0 ? (
          task.map((tarefa) => {
            return (
              <WithTask
                content={tarefa}
                key={tarefa}
                onIsDone={isComplete}
                onDeleteTask={deleteTask}
              />
            );
          })
        ) : (
          <WithoutTask />
        )}
      </div>
    </>
  );
}
