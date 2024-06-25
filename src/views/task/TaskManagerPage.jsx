import MainCard from "../../ui-component/cards/MainCard";
import TaskTable from "./TaskTable";

const TaskManagerPage = () => {
    return (
        <MainCard>
            <TaskTable maxRows={20}/>
        </MainCard>
    )
}

export default TaskManagerPage;