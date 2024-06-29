import {ROLE_ADMIN, ROLE_MEMBER, ROLE_UTENTE} from "../../config";

export const usersFilters = {
    enabled: false,
    disabled: false,
    roles: {
        admin: {
            status: false,
            value: ROLE_ADMIN,
            show: true
        },
        member: {
            status: false,
            value: ROLE_MEMBER,
            show: true,
        },
        user: {
            status: false,
            value: ROLE_UTENTE,
            show: true
        },
        all: {
            status: true,
            show: false
        }
    },
    all: true
}
