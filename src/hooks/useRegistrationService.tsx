import { useMutation, useQueryClient } from "react-query";

export const useRegistrationService = (callback: Function) => {
    // console.log("UserRegister.useRegistrationService() 1");
    const client = useQueryClient();
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    return useMutation(
        async (data: {
            username: string; email: string; password: string; image: File;
        }) => {
            // console.log(`UserRegister.useRegistrationService() 2`);

            // upload file/image
            const formData = new FormData();
            formData.append("files", data.image);
            const fileResp = await fetch(`${BASE_URL}/upload`, {
                method: "POST",
                body: formData,
            });

            const fileInfo = await fileResp.json();

            // post form as new User (including file/image)
            const signupPostResp = await fetch(URL + "/auth/local/register", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                // username, email, password, image
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    image: fileInfo[0]?.id,
                }),
            });
            return await signupPostResp.json();
        },
        {
            onSuccess: (data) => {
                // console.log('UserRegister.useRegistrationService.onSuccess() 2');
                // console.log(`  data.jwt: ${data.jwt}`); // <- this works
                // console.log(`  data.user: ${data.user}`);// <- this works
                // console.log('  doing nothing');
                callback(data);

                // client.invalidateQueries("userAuthQueryKey");
            },
        }
    )
};

