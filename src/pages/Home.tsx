import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonImg,
    IonAvatar,
    IonItem,
    IonLabel,
    IonList,
    IonLoading,
    IonPage,
    IonTitle,
    IonToolbar, IonTextarea, IonChip
} from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";
import { useQuery, useQueryClient } from "react-query";
import moment from "moment";
import "./Home.css";


export const useGetReadingsQuery = () => {
    const client = useQueryClient();
    return useQuery(
        "readingQueryKey",
        async () => {
            console.log("Home.useGetReadingsQuery()");
            // get all readings
            const response = await fetch("http://localhost:1937/readings");
            const readings = await response.json();

            // pre load the cache
            readings.forEach((p: any) => {
                client.setQueryData(["reading", p.id], p);
            });

            return readings;
        }
    );
};


const Home: React.FC = () => {
    console.log(`Home()`);
    const history = useHistory();
    const {isLoading, data, error} = useGetReadingsQuery();

    console.log(`  isLoading:${isLoading}`);
    console.log(`  error:${error}`);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Fool's Compass</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => history.push("/add-item")}>Add</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonLoading isOpen={isLoading} message="Loading..."/>
                <IonList>
                    {data?.map((p: any) => {
                        return (
                            <IonItem
                                key={p.id}
                            >
                                <IonLabel>
                                    <h1 className="ion-text-wrap h1">{p.title}</h1>
                                    <span className="ion-text-wrap">{moment(p.date).format('MMM Do YYYY')}</span>
                                    <IonChip>
                                        <IonAvatar><img src={p.author.image?.url} /></IonAvatar>
                                        <IonLabel>{p.author?.username}</IonLabel>
                                    </IonChip>
                                    <div>
                                        <IonImg src={p.image?.url}></IonImg>
                                    </div>
                                    <p className="ion-padding ion-text-wrap">{p.comment}</p>
                                </IonLabel>
                            </IonItem>
                        );
                    })}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Home;
