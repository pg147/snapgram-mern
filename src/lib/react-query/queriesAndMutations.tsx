import { INewUser } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { createUserAccount, signInAccount } from "../appwrite/api";

const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: { email: string; password: string }) => signInAccount(user)
    })
}

export { useCreateUserAccount, useSignInAccount };