import { IonButton, IonInput, IonItem, IonLabel, } from "@ionic/react";
import React, { useState } from "react";
import { PageProps } from "../../types/UserTypes";
import { useAuthService } from "../../hooks/useAuthService";

const UserLogin: React.FC<PageProps> = ({userObj, setUserObj, authObj, setAuthObj}) => {
    // console.log(`UserLogin()`);
    const [username, setUserName] = useState<any>("");
    const [password, setPassword] = useState<any>("");
    // const [present, dismiss] = useIonToast();

    const handleLoginResponse = (data: any | null) => {
        // console.log('UserLogin.useAuthService.callback() - aka handleLoginResponse() 3');
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
    const {isLoading, error, mutateAsync: newLoginMutation} = useAuthService(handleLoginResponse);
    console.log('error:');
    console.log(error);

    const submitForm = async () => {
        // console.log("UserLogin.submitForm() 1");
        // console.log('  doing nothing')
        // username, password
        // console.log(username);
        const resp = await newLoginMutation({username, password})
            .catch((reason:any) => {
                console.log('catch()');
                console.log('  reason:');
                console.log(reason);
            });
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
