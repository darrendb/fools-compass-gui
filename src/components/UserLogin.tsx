import { IonButton, IonInput, IonItem, IonLabel, } from "@ionic/react";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { PageProps } from "./UserTypes";

export const useAuthenticationService = (callback: Function) => {
    // console.log("UserLogin.useAuthenticationService() 1");
    const client = useQueryClient();
    // temp hardcoded 'the fool' user id (local: 50, dev: 1)
    // temp hardcoded 'jena' user id (local: 51, dev: 2)
    const tempUserId: number = 50;

    return useMutation(
        async (data: { username: string; password: string }) => {
            // console.log(`UserLogin.useAuthenticationService() 2`);

            const URL = "http://localhost:1937";

            // post auth/local
            const loginPostResp = await fetch(`${URL}/auth/local`, {
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
                // console.log(`  data.jwt: ${data.jwt}`); // <- this works
                // console.log(`  data.user: ${data.user}`);// <- this works
                // console.log('  doing nothing');
                callback(data);

                // client.invalidateQueries("userAuthQueryKey");
            },
        }
    );
};

const UserLogin: React.FC<PageProps> = ({userObj, setUserObj, authObj, setAuthObj}) => {
    // console.log(`UserLogin()`);
    const [username, setUserName] = useState<any>("");
    const [password, setPassword] = useState<any>("");
    // const [present, dismiss] = useIonToast();

    const handleLoginResponse = (data: any | null) => {
        // console.log('UserLogin.useAuthenticationService.callback() - aka handleLoginResponse() 3');
        // console.log(`UserLogin.handleLoginResponse()`);
        // console.log(`  data.jwt: ${data.jwt}`);// <- this works
        // console.log('  setting values here')
        setAuthObj({isAuthenticated: true, jwt: data.jwt});
        setUserObj(data.user);

        // present({
        //     buttons: [{text: 'Ok', role: 'cancel'}],
        //     message: 'Login Successful (New)',
        //     duration: 3000,
        //     position: 'middle',
        // })

    };
    const {isLoading, error, mutateAsync: newLoginMutation} = useAuthenticationService(handleLoginResponse);

    const submitForm = async () => {
        // console.log("UserLogin.submitForm() 1");
        // console.log('  doing nothing')
        // username, password
        // console.log(username);
        const resp = await newLoginMutation({username, password});
        // console.log("UserLogin.submitForm() 4");
        // console.log(`  resp.jwt: ${resp.jwt}`);
        // console.log('  doing nothing')

    };

    return (
        <form className="ion-padding">
            <IonItem>
                <IonLabel position="stacked">Username</IonLabel>
                <IonInput
                    type="text" name="username" required={true}
                    onIonChange={(e: any) => setUserName(e.target.value)}
                />
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Password</IonLabel>
                <IonInput
                    type="password" name="password" required={true}
                    onIonChange={(e: any) => setPassword(e.target.value)}
                />
            </IonItem>
            {/*<IonItem lines="none">*/}
            {/*    <IonLabel>Remember me</IonLabel>*/}
            {/*    <IonCheckbox defaultChecked={true} slot="start" />*/}
            {/*</IonItem>*/}
            <IonButton onClick={() => submitForm()} expand="block" className="ion-margin-top">
                Sign In
            </IonButton>
        </form>
    );
};

export default UserLogin;
