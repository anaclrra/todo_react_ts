import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'

// interfaces
import { ITask } from "../interfaces/Task";

// styles
import styles from "./TaskForm.module.css";


type Props = {
    btnText: string;
    taskList: ITask[];
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
    task?: ITask | null;
    handleUpdate?(id: number, title: string): void;
}

const TaskForm = ({
    btnText,
    taskList,
    setTaskList,
    task,
    handleUpdate,
}: Props) => {
    const [id, setId] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    

    useEffect(() => {
        if (task) {
            setId(task.id);
            setTitle(task.title);
            
        }
    }, [task]);

    const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(handleUpdate);
        if (taskList) {
            if (handleUpdate) {
                handleUpdate(id, title);
            } else {
                const id = Math.floor(Math.random() * 1000);

                const newTask: ITask = { id, title};

                setTaskList!([...taskList, newTask]);

                setTitle("");
                
            }
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "title") {
            setTitle(e.target.value);
        } else {
            return
        }
    };
    return (
        <form onSubmit={addTaskHandler} className={styles.form}>
            <div className={styles.input_container}>
                <label htmlFor="title">Título:</label>
                <input
                    type="text"
                    name="title"
                    placeholder="Título da tarefa"
                    value={title}
                    onChange={handleChange}
                />
            </div>
            
            <input type="submit" value={btnText} />
        </form>
    );
};

export default TaskForm