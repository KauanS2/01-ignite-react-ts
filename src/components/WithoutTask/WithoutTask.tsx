import styles from "./styles.module.css";
import { Notepad } from "@phosphor-icons/react";

export function WithoutTask() {
  return (
    <div className={styles.withoutTask}>
      <Notepad size={56}/>
      <p>Você ainda não tem tarefas cadastradas </p>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  );
}
