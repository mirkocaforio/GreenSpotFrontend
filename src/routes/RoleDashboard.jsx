//In base al ruolo specificato deve ritornare il componente corrispondente

import {ROLE_ADMIN, ROLE_MEMBER, ROLE_UTENTE} from "../config";
import {Navigate} from "react-router-dom";
import Loadable from "../ui-component/Loadable";
import React, {lazy} from "react";
import {useSelector} from "react-redux";
import FetchData from "./FetchData";

const AdminDashboard = Loadable(lazy(() => import('views/dashboard/AdminDashboard')));
const MemberDashboard = Loadable(lazy(() => import('views/dashboard/MemberDashboard')));
const UserDashboard = Loadable(lazy(() => import('views/dashboard/UserDashboard')));
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));


export const RoleDashboard = () => {

    const {profile} = useSelector((state) => state.profile);
    const [role] = profile ? [profile.role] : [null];


    switch (role) {
        case ROLE_ADMIN:
            return <FetchData type={"overallAnalytics"}>
                <FetchData type={"overallCurrentMonth"}>
                    <FetchData type={"paymentAdminAnalytics"}>
                        <AdminDashboard/>
                    </FetchData>
                </FetchData>
            </FetchData>;
        case ROLE_UTENTE:
            return <FetchData type={"userAnalytics"}>
                <FetchData type={"userListAnalytics"}>
                    <FetchData type={"paymentUserAnalytics"}>
                        <UserDashboard/>
                    </FetchData>
                </FetchData>
            </FetchData>;
        case ROLE_MEMBER:
            return <FetchData type={"memberAnalytics"}>
                <FetchData type={"memberListAnalytics"}>
                    <FetchData type={"transactionMemberAnalytics"}>
                        <MemberDashboard/>
                    </FetchData>
                </FetchData>
            </FetchData>;
        default:
            return <Navigate to={"/"}/>; //Should be a landing page
    }


}

export default RoleDashboard;