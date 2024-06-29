import {ROLE_ADMIN, ROLE_MEMBER, ROLE_UTENTE} from "../../config";

export const usersFilters = {
    enabled: false,
    disabled: false,
    roles: {
        admin: {
            status: false,
            value: ROLE_ADMIN,
            show: true,
            color: 'primary'
        },
        user: {
            status: false,
            value: ROLE_UTENTE,
            show: true,
            color: 'secondary'
        },
        member: {
            status: false,
            value: ROLE_MEMBER,
            show: true,
            color: 'default'
        },
        all: {
            status: true,
            show: false
        }
    },
    all: true
}
