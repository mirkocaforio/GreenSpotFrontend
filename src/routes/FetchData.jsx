import {useDispatch} from "react-redux";
import {getProfileData, getAllProfiles} from "../actions/profile";
import {useEffect} from "react";
import {getWallet} from "../actions/wallet";
import {getProfileTransactions} from "../actions/transaction";
import {getTasks} from "../actions/task";
import {
    getMemberAnalytics,
    getMemberFilterAnalytics,
    getOverallFilterAnalytics, initPaymentAdminAnalytics,
    getPaymentUserAnalytics,
    getTasksAnalytics,
    getUserAnalytics,
    getUserFilterAnalytics,
    getUserListAnalytics, initMemberListAnalytics, initTransactionMemberAnalytics, initTransactionUserAnalytics
} from "../actions/analytics";
import {getRewards, getRedeems} from "../actions/reward";
import {getCpuNames, getGpuNames} from "../actions/score";
import {getResourceByEmail} from "../actions/resource";
import {getPopupNotificationByEmail} from "../actions/notification";
import {getAssignmentSettings, getPaymentSettings} from "../actions/settings";
import {getInvoicesByUserEmail} from "../actions/payment";
import {getOverallAnalytics} from "../actions/analytics";
import {getCurrentMonthOverallAnalytics} from "../actions/analytics";

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
        case "assignmentSettings":
            fetchData = getAssignmentSettings;
            break;
        case "paymentSettings":
            fetchData = getPaymentSettings;
            break;
        case "invoice":
            fetchData = getInvoicesByUserEmail;
            break;
        case "userAnalytics":
            fetchData = getUserAnalytics;
            break;
        case "userFilterAnalytics":
            fetchData = getUserFilterAnalytics;
            break;
        case "userListAnalytics":
            fetchData = getUserListAnalytics;
            break;
        case "userTaskAnalytics":
            fetchData = getTasksAnalytics;
            break;
        case "memberAnalytics":
            fetchData = getMemberAnalytics;
            break;
        case "memberFilterAnalytics":
            fetchData = getMemberFilterAnalytics;
            break;
        case "memberListAnalytics":
            fetchData = initMemberListAnalytics;
            break;
        case "overallAnalytics":
            fetchData = getOverallAnalytics;
            break;
        case "overallFilterAnalytics":
            fetchData = getOverallFilterAnalytics;
            break;
        case "overallCurrentMonth":
            fetchData = getCurrentMonthOverallAnalytics;
            break;
        case "transactionUserAnalytics":
            fetchData = initTransactionUserAnalytics;
            break;
        case "transactionMemberAnalytics":
            fetchData = initTransactionMemberAnalytics;
            break;
        case "paymentUserAnalytics":
            fetchData = getPaymentUserAnalytics;
            break;
        case "paymentAdminAnalytics":
            fetchData = initPaymentAdminAnalytics;
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