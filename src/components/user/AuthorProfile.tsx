import React from 'react';
import { CompProps } from "../../types/UserTypes";
import { IonAvatar, IonChip, IonLabel } from "@ionic/react";

const AuthorProfile: React.FC<CompProps> = ({userObj,}) => {

    return (
        <IonChip className="readingAuthor ion-float-end">
            <IonAvatar><img src={userObj?.image?.url} alt='Author Avatar'/></IonAvatar>
            <IonLabel>{userObj?.username}</IonLabel>
        </IonChip>
    );
};

export default AuthorProfile;
