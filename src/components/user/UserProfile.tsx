import React from 'react';
import { CompProps } from "../../types/UserTypes";
import { IonAvatar, IonChip, IonLabel } from "@ionic/react";

const UserProfile: React.FC<CompProps> = ({userObj,}) => {

    return (
        <IonChip style={{float: 'right', marginTop: '2px'}}>
            <IonAvatar><img src={userObj?.image?.url}/></IonAvatar>
            <IonLabel>{userObj?.username}</IonLabel>
        </IonChip>
    );
};

export default UserProfile;
