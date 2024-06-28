import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { getAcessToken, getProfile, logout, postLogin, postSignup } from "@/api/auth";
import { UseMutationCustomOptions, UseQueryCustomOptions } from "@/types/common";
import { removeEncryptStorage, setEncryptStorage } from "@/utils";
import { removeHeader, setHeader } from "@/utils/headers";
import { useEffect } from "react";
import queryClient from "@/api/queryClient";
import { numbers, queryKeys, storageKeys } from "@/constants";


function useSignup(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: postSignup,
        ...mutationOptions,
    });
}

function useLogin(mutaionOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: postLogin,
        onSuccess: ({accessToken, refreshToken}) => {
            setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
            setHeader('Authorization', `Bearer ${accessToken}`);
        },
        onSettled: () => {
            queryClient.refetchQueries({queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN]});
            queryClient.invalidateQueries({queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE]});
        },
        ...mutaionOptions,
    });
}

function useGetRefreshToken() {
    const {isSuccess, data, isError} = useQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
        queryFn: getAcessToken,
        staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
        refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
        refetchOnReconnect: true,
        refetchIntervalInBackground: true,
    });

    useEffect(() => {
        if(isError) {
            setHeader('Authorization', `Bearer ${data.accessToken}`);
            setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
        }
    }, [isSuccess]);

    useEffect(() => {
        if(isError) {
            removeHeader('Authorization');
            removeEncryptStorage(storageKeys.REFRESH_TOKEN);
        }
    }, [isError]);

    return {isSuccess, isError};
}

function useGetProfile(queryOptions?: UseQueryCustomOptions) {
    return useQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
        queryFn: getProfile,
        ...queryOptions
    });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            removeHeader('Authorization');
            removeEncryptStorage(storageKeys.REFRESH_TOKEN);
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
        },
        ...mutationOptions
    });
}

function useAuth() {
    const signupMutation = useSignup();
    const refreshTokenQuery = useGetRefreshToken();
    const getProfileQuery = useGetProfile({
        enabled: refreshTokenQuery.isSuccess,
    });
    const isLogin = getProfileQuery.isSuccess;
    const loginMutation = useLogin();
    const logoutMutation = useLogout();

    return { 
        signupMutation, 
        loginMutation, 
        isLogin, 
        getProfileQuery,
        logoutMutation
     };
}

export default useAuth;