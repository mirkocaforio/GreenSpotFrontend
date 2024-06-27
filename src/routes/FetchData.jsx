import {useDispatch} from "react-redux";
import {getProfileData} from "../actions/profile";
import {useEffect} from "react";
import {getWallet} from "../actions/wallet";
import {getProfileTransactions} from "../actions/transaction";
import {getTasks} from "../actions/task";
import {getTasksAnalytics} from "../actions/analytics";
import {getRewards} from "../actions/reward";
import {getCpuNames, getGpuNames} from "../actions/score";
import {getResourceByEmail} from "../actions/resource";
import {getRedeems} from "../actions/reward";
import {getPopupNotificationByEmail} from "../actions/notification";
import {getAllProfiles} from "../actions/profile";


const FetchData = ({children, type}) => {
    const dispatch = useDispatch();
    let fetchData;
    switch (type) {
        case "profile":
            fetchData = getProfileData;
            break;
        case "wallet":
            fetchData = getWallet;
            break;
        case "transactions":
            fetchData = getProfileTransactions;
            break;
        case "resource":
            fetchData = getResourceByEmail;
            break;
        case "score_cpu_names":
            fetchData = getCpuNames;
            break;
        case "score_gpu_names":
            fetchData = getGpuNames;
            break;
        case "tasks":
            fetchData = getTasks;
            break;
        case "taskAnalytics":
            fetchData = getTasksAnalytics;
            break;
        case "reward":
            fetchData = getRewards;
            break;
        case "redeems":
            fetchData = getRedeems;
            break;
        case "notification":
            fetchData = getPopupNotificationByEmail;
            break;
        case "allProfiles":
            fetchData = getAllProfiles;
            break;
        default:
            fetchData = getProfileData;
            break;
    }

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch, fetchData]);

    return children;
}

export default FetchData;