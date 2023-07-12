import { PlusCircle } from "@phosphor-icons/react";
import styles from "./styles.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { WithTask } from "../WithTask/WithTask";
import { WithoutTask } from "../WithoutTask/WithoutTask";

export interface TaskProps {
  id: string;
  content: string;
  isComplete: boolean;
}
export function CreateTask() {
  const [task, setTask] = useState<TaskProps[]>([]);
  const [newTask, setNewTask] = useState("");

  function handleCreateNewTask(taskContent: string) {
    setTask([
      ...task,
      {
        content: taskContent,
        id: crypto.randomUUID(),
        isComplete: false,
      },
    ]);
    setNewTask("");
  }
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    handleCreateNewTask(newTask);
    setNewTask("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewTask(event.target.value);
  }
  function deleteTask(taskToDelete: string) {
    const deleteOneTask = task.filter((tasks) => {
      return tasks.id !== taskToDelete;
    });
    setTask(deleteOneTask);
  }

  function isComplete(taskid: string) {
    const newTask = task.map((res) => {
      if (taskid === res.id) {
        return {
          ...res,
          isComplete: !res.isComplete,
        };
      }
      return res;
    });
    return setTask(newTask);
  }
  const taskQuantity = task.filter((res) => res.isComplete);

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
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
              {taskQuantity.length} de {task.length}
            </strong>
          </span>
        </div>
      </div>
      <div className={styles.tasksOrWithout}>
        {task.length > 0 ? (
          task.map((tarefa) => {
            return (
              <WithTask
                id={tarefa.id}
                isComplete={tarefa.isComplete}
                content={tarefa.content}
                key={tarefa.id}
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
