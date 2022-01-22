import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonImg,
    IonItem,
    IonLabel,
    IonList,
    IonLoading,
    IonMenuToggle, IonModal,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar,
    useIonViewDidEnter
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useQuery, useQueryClient } from "react-query";
import moment from "moment";
import { addCircleOutline, menu } from "ionicons/icons";
import UserProfile from "../components/UserProfile";
import { PageProps } from "../components/UserTypes";
import CreateReadingModal from "../components/CreateReadingModal";

export const useGetReadingsService = (_jwt = '') => {
    // console.log('Readings.useGetReadingsService()');
    // console.log(`_jwt:`);
    // console.log(_jwt);


    const client = useQueryClient();
    return useQuery(
        "readingQueryKey",
        async () => {
            // need jwt token before calling service api for user readings
            const URL = "http://localhost:1937";
            // get all readings
            const response = (_jwt) ?
                await fetch(`${URL}/readings`, {
                    headers: {
                        Authorization: `Bearer ${_jwt}`
                    }
                }) : await new Response();
            const readings = await response.json();

            // pre load the cache
            readings?.forEach((reading: any) => {
                client.setQueryData(["reading", reading.id], reading);
            });

            return readings;
        });

};


const Readings: React.FC<PageProps> = ({userObj, setUserObj, authObj, setAuthObj}) => {
    // console.log(`Home()`);
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);

    const isUserReadings = (reading: any) => {
        return reading.author.id === userId;
    }

    useIonViewDidEnter(() => {
        // console.log('useIonViewDidEnter()');
        // console.log(`  authObj.jwt:${authObj?.jwt}`);// <-- this work?
    });

    // console.log(`  authObj.jwt:${authObj?.jwt}`);// <-- this work? nope.
    const userId = userObj?.id;
    // // const {isLoading, data, error} = useGetReadingsService(token);
    const {isLoading, data, error} = useGetReadingsService(authObj?.jwt); // temp stubbing out <- this calls the readings api
    // const data:any = []; // temp stub value
    // const isLoading:boolean = false; // temp stub value
    const userReadings = data?.filter(isUserReadings);

    // const returnValue = data?.returnValue;
    // console.log(`returnValue:${returnValue}`);
    // setJwt(returnValue);
    // console.log(`  isLoading:${isLoading}`);
    // console.log(`  error:${error}`);
    // console.log(`userReadings.length:${userReadings?.length}`);

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
                            <IonButton onClick={() => setShowModal(true)}>
                                <IonIcon slot="icon-only" icon={addCircleOutline}/>
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
                    <CreateReadingModal isOpen={showModal} setShowModal={setShowModal}
                                        userObj={userObj} setUserObj={setUserObj}
                                        authObj={authObj} setAuthObj={setAuthObj} />

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
                            <IonButton onClick={() => setShowModal(true)}>
                                <IonIcon slot="icon-only" icon={addCircleOutline}/>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonLoading isOpen={isLoading} message="Loading..."/>
                    <IonList>
                        {userReadings?.map((reading: any) => {
                            return (
                                <IonItem
                                    key={reading.id}
                                >
                                    <IonLabel>
                                        <UserProfile userObj={reading.author}/>
                                        <p className="ion-text-wrap" style={{
                                            color: 'white',
                                            lineHeight: 1.2,
                                            marginLeft: 0,
                                            marginRight: 0,
                                            marginTop: '4px',
                                            marginBottom: '2px',
                                            fontSize: '22px',
                                            fontWeight: 'normal'
                                        }}>{reading.title}</p>
                                        <p className="ion-text-wrap" style={{
                                            color: 'grey',
                                            lineHeight: 1.2,
                                            marginLeft: '10px',
                                            marginRight: 0,
                                            marginTop: '4px',
                                            marginBottom: '8px',
                                            fontSize: '14px',
                                            fontWeight: 'normal'
                                        }}>{moment(reading.date).format('MMM Do YYYY')}</p>
                                        <IonImg src={reading.image?.url}></IonImg>
                                        <p className="ion-text-wrap" style={{
                                            lineHeight: 1.2, marginLeft: '10px', marginRight: 0, marginTop: '10px',
                                            marginBottom: '8px', fontSize: '14px', fontWeight: 'normal'
                                        }}>{reading.comment}</p>
                                    </IonLabel>
                                </IonItem>
                            );
                        })}
                    </IonList>

                    <CreateReadingModal isOpen={showModal} setShowModal={setShowModal}
                                        userObj={userObj} setUserObj={setUserObj}
                                        authObj={authObj} setAuthObj={setAuthObj} />

                </IonContent>
            </IonPage>

        );
    }


};

export default Readings;
