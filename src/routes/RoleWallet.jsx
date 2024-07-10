import {ROLE_MEMBER, ROLE_UTENTE} from "../config";
import {useSelector} from "react-redux";
import FetchData from "./FetchData";
import {Navigate} from "react-router-dom";
import {lazy} from "react";
import Loadable from "../ui-component/Loadable";

const Wallet = Loadable(lazy(() => import('views/wallet')));

export const RoleWallet = () => {
    const {profile} = useSelector((state) => state.profile);
    const [role] = profile ? [profile.role] : [null];

    switch (role) {
        case ROLE_UTENTE:
            return <FetchData type="wallet">
                        <FetchData type="transactionUserAnalytics">
                            <Wallet/>
                        </FetchData>
                    </FetchData>;
        case ROLE_MEMBER:
            return <FetchData type="wallet">
                        <FetchData type="transactionMemberAnalytics">
                            <Wallet/>
                        </FetchData>
                    </FetchData>;
        default:
            return <Navigate to={"/"}/>; //Should be a landing page
    }
}

export default RoleWallet;