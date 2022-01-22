import {
    IonButton,
    IonButtons,
    IonContent, IonFooter,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle, IonText,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import React from "react";
import { defaultAuth, defaultUser, PageProps } from "./UserTypes";
import { book, compass, document, logOut, personAdd } from "ionicons/icons";
import UserProfile from "./UserProfile";

export interface Props {
}

const AppMenu: React.FC<PageProps> = ({userObj, setUserObj, authObj, setAuthObj}) => {

    const logoutUser = () => {
        // console.log('logoutUser()');
        setAuthObj(defaultAuth);
        setUserObj(defaultUser);
    }

    return (
        <IonMenu contentId="page-content" menuId="mainMenu" side="start">
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle style={{paddingLeft: '80px',paddingRight: '80px'}}>Fool's Compass</IonTitle>
                    <IonIcon slot="end" icon={compass} size="large" style={{paddingRight: '16px'}}/>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonMenuToggle auto-hide="true">
                    <IonList>
                        <IonItem button onClick={() => {console.log('Nav to: Readings')}}>
                            <IonIcon slot="start" icon={book}/>
                            <IonLabel>Readings</IonLabel>
                        </IonItem>
                    </IonList>
                </IonMenuToggle>
            </IonContent>
            <IonFooter >
                <IonToolbar>
                    <IonButtons slot="start">
                        <UserProfile userObj={userObj} />
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton onClick={() => {logoutUser()}}>
                            <IonIcon icon={logOut} slot="end"/>
                            Sign Out
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonFooter>
        </IonMenu>
    );
};

export default AppMenu;
