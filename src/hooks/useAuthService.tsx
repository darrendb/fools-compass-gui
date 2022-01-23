import { useMutation, useQueryClient } from "react-query";

export const useAuthenticationService = (callback: Function) => {
    // console.log("UserLogin.useAuthenticationService() 1");
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const client = useQueryClient();

    return useMutation(
        async (data: { username: string; password: string }) => {
            // console.log(`UserLogin.useAuthenticationService() 2`);

            // post auth/local
            const loginPostResp = await fetch(`${BASE_URL}/auth/local`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                // username, email, password, image
                body: JSON.stringify({
                    identifier: data.username,
                    password: data.password,
                }),
            });
            return await loginPostResp.json();
        },
        {
            onSuccess: (data) => {
                // console.log('UserLogin.useAuthenticationService.onSuccess() 2');
                callback(data);
            },
        }
    );
};
