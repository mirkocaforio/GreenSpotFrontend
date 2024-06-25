import TaskForm from "./TaskForm";
import MainCard from "../../ui-component/cards/MainCard";
import {createTask} from "../../actions/task";

const AssignTask = () => {

    return (<MainCard>
                <TaskForm handleAssign={createTask} action="Create"/>
            </MainCard>)
}
export default AssignTask;