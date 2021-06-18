import {
    ACTIVE_BUDGET_SET, THEME_TOGGLE, TOKEN_SET, USER_IMAGE_SET, USERID_SET, USERNAME_SET,
} from 'data/constants'

const startCommon = {
    activeBudget: '60c5feac45f7a33bf07701b1',
    // activeBudget: '1',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndvanRlay5zenV0cnlrQGdtYWlsLmNvbSIsInVzZXJJZCI6IjYwY2NhMWYzYTIwYjc5MDQ1NGQzYTBjMSIsImlhdCI6MTYyNDAzMjI3NCwiZXhwIjoxNjI0MDM1ODc0fQ.xH8fknmZ9d2sdbu6nBR2a_L4q5VmN8bMqTvEPJ1y4wQ',
    userId: '',
    userImage: '',
    userName: '',
    lightTheme: false,
}

const common = (state= startCommon, action) => {
    switch (action.type) {
        case ACTIVE_BUDGET_SET:
            return {
                ...state,
                activeBudget: action.payload,
            }

        case THEME_TOGGLE:
            return {
                ...state,
                lightTheme: !state.lightTheme,
            }

        case TOKEN_SET:
            return {
                ...state,
                token: action.payload,
            }

        case USERID_SET:
            return {
                ...state,
                userId: action.payload,
            }

        case USER_IMAGE_SET:
            return {
                ...state,
                userImage: action.payload,
            }

        case USERNAME_SET:
            return {
                ...state,
                userName: action.payload,
            }

        default:
            return state;
    }
}

export default common;
