import React from 'react';
// import { useUserContext, useUserContextState, useUserContextUpdater } from "../hooks/UserContext";
import { IonLabel, IonSegment, IonSegmentButton, IonToolbar } from "@ionic/react";

export interface Props {
    hasAccount: boolean,
    setHasAccount: Function
}

const GatewayViewToggle: React.FC<Props> = ({hasAccount, setHasAccount}) => {

    return (
        <IonToolbar>
            <IonSegment value={(hasAccount)? 'true':'false'} onIonChange={(e) => setHasAccount((e.detail.value === 'true')? true : false)}>
                <IonSegmentButton value="true">
                    <IonLabel>Sign In</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="false">
                    <IonLabel>Register</IonLabel>
                </IonSegmentButton>
            </IonSegment>
        </IonToolbar>
    );
};

export default GatewayViewToggle;
