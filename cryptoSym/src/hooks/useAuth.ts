import {useAuth as useZitadeAuth} from '@zitadel/react-auth';

export const useAuth = () => {
    const auth = useZitadeAuth();

    return {
        ...auth,
        isAutheticated: auth.isAuthenticated,
        user: auth.user,
        isLoading: auth.isLoading,
        login: auth.signinRedirect,
        logout: auth.signoutRedirect,
        hhh: auth.settings
    };
};
