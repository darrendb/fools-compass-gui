import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonLoading,
    IonMenuToggle,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar,
    useIonViewDidEnter
} from "@ionic/react";
import React, { useState } from "react";
import { createOutline, menu } from "ionicons/icons";
import { PageProps } from "../types/UserTypes";
import CreateReadingModal from "../components/reading/CreateReadingModal";
import { useGetReadingsService } from "../hooks/useGetReadingsService";
import ReadingListItem from "../components/reading/ReadingListItem";
import { defaultReading, ReadingType } from "../types/ReadingTypes";
import moment, { Moment } from "moment";
import EditReadingModal from "../components/reading/EditReadingModal";

const Readings: React.FC<PageProps> = ({userObj, setUserObj, authObj, setAuthObj}) => {
    // console.log(`Readings()`);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentReading, setCurrentReading] = useState(defaultReading);

    const isUserReadings = (reading: ReadingType) => {
        return reading.author.id === userId;
    }

    const descReadings = (a: ReadingType, b: ReadingType) => {
        const aMoment: Moment = moment(a?.date);
        const bMoment: Moment = moment(b?.date);
        return bMoment.unix() - aMoment.unix();
    }

    useIonViewDidEnter(() => {
        // console.log('useIonViewDidEnter()');
    });

    const userId = userObj?.id;
    const {isLoading, data, error} = useGetReadingsService(authObj?.jwt); // temp stubbing out <- this calls the readings api
    const userReadings = data?.filter(isUserReadings).sort(descReadings);
    // const sortedReadings = userReadings?.sort(descReadings);
    // console.log('error:');
    // console.log(error);

    // no readings to display
    if (userReadings?.length < 1) {
        return (
            <IonPage id="page-content">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuToggle>
                                <IonButton>
                                    <IonIcon slot="icon-only" icon={menu}/>
                                </IonButton>
                            </IonMenuToggle>
                        </IonButtons>
                        <IonTitle>Fool's Compass</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setShowCreateModal(true)}>
                                <IonIcon slot="icon-only" icon={createOutline}/>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonLoading isOpen={isLoading} message="Loading..."/>
                    <IonList>
                        <IonItem>
                            <IonLabel>No readings yet.</IonLabel>
                        </IonItem>
                    </IonList>
                    <IonText className="ion-padding">
                        <h1>Create your first Reading!</h1>
                    </IonText>
                    <IonText className="ion-padding">
                        <p>Use the '+' button to Add a new Reading</p>
                    </IonText>
                    <CreateReadingModal isOpen={showCreateModal} setShowModal={setShowCreateModal}
                                        userObj={userObj} setUserObj={setUserObj}
                                        authObj={authObj} setAuthObj={setAuthObj}/>

                </IonContent>
            </IonPage>
        );
    } else {
        // one or more readings
        return (
            <IonPage id="page-content">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">

                            <IonMenuToggle>
                                <IonButton>
                                    <IonIcon slot="icon-only" icon={menu}/>
                                </IonButton>
                            </IonMenuToggle>
                        </IonButtons>

                        <IonTitle>Fool's Compass</IonTitle>

                        <IonButtons slot="end">
                            <IonButton onClick={() => setShowCreateModal(true)}>
                                <IonIcon slot="icon-only" icon={createOutline}/>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonLoading isOpen={isLoading} message="Loading..."/>
                    <IonList>
                        {userReadings?.map((reading: any) => {
                            return (
                                <ReadingListItem key={reading?.id}
                                                 reading={reading}
                                                 setShowEditModal={setShowEditModal}
                                                 setCurrentReading={setCurrentReading}
                                />
                            );
                        })}
                    </IonList>

                    <CreateReadingModal isOpen={showCreateModal} setShowModal={setShowCreateModal}
                                        userObj={userObj} setUserObj={setUserObj}
                                        authObj={authObj} setAuthObj={setAuthObj} />

                    <EditReadingModal isOpen={showEditModal} setShowModal={setShowEditModal}
                                      userObj={userObj} setUserObj={setUserObj}
                                      authObj={authObj} setAuthObj={setAuthObj}
                                      currentReading={currentReading} />

                </IonContent>
            </IonPage>

        );
    }


};

export default Readings;
