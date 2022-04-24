import { useMutation, useQueryClient } from "react-query";

export const useAuthService = (callback: Function) => {
    // console.log("useAuthService() 1");
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const client = useQueryClient();

    return useMutation(
        async (data: { username: string; password: string }) => {
            // console.log(`useAuthService() 2`);

            // post auth/local
            const loginPostResp = await fetch(`${BASE_URL}/auth/local`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                // username, password
                body: JSON.stringify({
                    identifier: data.username,
                    password: data.password,
                }),
            });
            return await loginPostResp.json();
        },
        {
            onSuccess: (data) => {
                // console.log('useAuthService.onSuccess() 2');
                callback(data);
            },
            onError: (data) => {
                console.log('useAuthService.onError()');
                console.log(data);
                // debugger;
                // callback(data);
            },
        },
    );
};
