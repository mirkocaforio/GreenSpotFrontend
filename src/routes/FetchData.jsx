import {useDispatch} from "react-redux";
import {getProfileData} from "../actions/profile";
import {useEffect} from "react";
import {getWallet} from "../actions/wallet";
import {getProfileTransactions} from "../actions/transaction";
import {getTasks} from "../actions/task";
import {getTasksAnalytics} from "../actions/analytics";
import {getRewards} from "../actions/reward";



const FetchData = ({ children, type}) => {
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
        case "tasks":
            fetchData = getTasks;
            break;
        case "taskAnalytics":
            fetchData = getTasksAnalytics;
            break;
        case "reward":
            fetchData = getRewards;
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