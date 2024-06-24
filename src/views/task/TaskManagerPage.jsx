import MainCard from "../../ui-component/cards/MainCard";
import TaskTable from "./TaskTable";

const TaskManagerPage = () => {
    return (
        <MainCard title="Task Manager">
            <TaskTable/>
        </MainCard>
    )
}

export default TaskManagerPage;