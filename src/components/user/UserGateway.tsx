import { IonContent, IonHeader, IonText, IonTitle, IonToolbar, } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { PageProps } from "../../types/UserTypes";
import UserLogin from "./UserLogin";
import UserSignup from "./UserRegister";
import GatewayViewToggle from "./GatewayViewToggle";

const UserGateway: React.FC<PageProps> = ({userObj, setUserObj, authObj, setAuthObj}) => {
    // console.log(`UserGateway()`);
    const [hasAccount, setHasAccount] = useState(true);

    useEffect(() => {
        // console.log('UserGateway.useEffect()');
        // console.log('  hasAccount:' + hasAccount);
    }, [])

    if (hasAccount) {
        // existing users
        return (
            <>
                <IonHeader translucent>
                    <IonToolbar>
                        <IonTitle>Welcome back to Fool's Compass!</IonTitle>
                    </IonToolbar>
                    <GatewayViewToggle hasAccount={hasAccount} setHasAccount={setHasAccount}/>
                </IonHeader>
                <IonContent fullscreen className="ion-padding">
                    <IonText><p>Existing User? Welcome back!</p><p>Please sign in with your username and password.</p>
                    </IonText>
                    <UserLogin userObj={userObj} setUserObj={setUserObj} authObj={authObj} setAuthObj={setAuthObj}/>
                </IonContent>
            </>
        );
    } else {
        // new users
        return (
            <>
                <IonHeader translucent>
                    <IonToolbar>
                        <IonTitle>Welcome to Fool's Compass!</IonTitle>
                    </IonToolbar>
                    <GatewayViewToggle hasAccount={hasAccount} setHasAccount={setHasAccount}/>
                </IonHeader>
                <IonContent fullscreen className="ion-padding">
                    <IonText><p>New User? Registering is easy!</p><p>Simply provide a username, email, and password to
                        get
                        started!</p></IonText>
                    <UserSignup userObj={userObj} setUserObj={setUserObj} authObj={authObj} setAuthObj={setAuthObj}/>
                </IonContent>
            </>
        );

    }
};

export default UserGateway;
