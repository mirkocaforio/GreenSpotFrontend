import {useDispatch} from "react-redux";
import {getProfileData} from "../actions/profile";
import {useEffect} from "react";
import {getWallet} from "../actions/wallet";
import {getProfileTransactions} from "../actions/transaction";



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