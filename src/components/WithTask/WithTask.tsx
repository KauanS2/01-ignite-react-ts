import { useState } from "react";
import styles from "./styles.module.css";
import { CheckCircle, Circle, Trash } from "@phosphor-icons/react";

interface WithTaskProps {
  content: string;
  onDeleteTask: (task: string) => void;
  onIsDone: (done: void) => void;
}

export function WithTask({ content, onDeleteTask, onIsDone }: WithTaskProps) {
  const [isDone, setValue] = useState(true);
  function handleDeleteTask() {
    onDeleteTask(content);
  }

  function handleIsDone() {
    onIsDone(setValue((isDone) => !isDone));
  }

  return (
    <div className={styles.withTask}>
      <button
        onClick={handleIsDone}
        className={isDone === true ? styles.notConcluded : styles.concluded}
      >
        {isDone === true ? <Circle size={20} /> : <CheckCircle size={20} />}
      </button>
      <p
        className={
          isDone === true ? styles.contentConfirmed : styles.contentNotConfirmed
        }
      >
        {content}
      </p>
      <button onClick={handleDeleteTask} className={styles.delete}>
        <Trash size={20} />
      </button>
    </div>
  );
}
