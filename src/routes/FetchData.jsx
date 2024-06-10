import {useDispatch} from "react-redux";
import {getProfileData} from "../actions/profile";
import {useEffect} from "react";



const FetchData = ({ children}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfileData());
    }, [dispatch]);

    return children;
}

export default FetchData;