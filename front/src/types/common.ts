import { QueryKey, UseMutationOptions, UseQueryOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ReesponseError = AxiosError<{
    statusCode: string;
    message: string;
    error: string;
}>;

type UseMutationCustomOptions<TData = unknown, TVariables = unknown> = Omit<
    UseMutationOptions<TData, ReesponseError, TVariables, unknown>,
    'mutationFn'
>;

type UseQueryCustomOptions<TQeuryFnData = unknown, TData = TQeuryFnData> = Omit<
    UseQueryOptions<TQeuryFnData, ReesponseError, TData, QueryKey>, 
    'queryKey'
>;

export type { ReesponseError, UseMutationCustomOptions, UseQueryCustomOptions };