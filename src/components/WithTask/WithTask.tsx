import styles from "./styles.module.css";
import { CheckCircle, Circle, Trash } from "@phosphor-icons/react";

interface WithTaskProps {
  id: string;
  content: string;
  isComplete: boolean;
  onIsDone: (res: string) => void;
  onDeleteTask: (task: string) => void;
}

export function WithTask({
  content,
  onDeleteTask,
  id,
  onIsDone,
  isComplete,
}: WithTaskProps) {
  function handleDeleteTask() {
    onDeleteTask(id);
  }

  return (
    <div className={styles.withTask}>
      <button
        onClick={() => onIsDone(id)}
        className={isComplete === true ? styles.concluded : styles.notConcluded}
      >
        {isComplete === true ? <CheckCircle size={20} /> : <Circle size={20} />}
      </button>
      <p
        className={
          isComplete === true
            ? styles.contentNotConfirmed
            : styles.contentConfirmed
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
