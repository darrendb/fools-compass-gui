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
                    <IonAvatar><img src={'/assets/fool_circle_avatar.png'}/></IonAvatar>
                    <IonTitle style={{color:'#fdfc4f'}}>Fool's Compass</IonTitle>
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
                                    <IonChip style={{float: 'right', marginTop: '2px'}}>
                                        <IonAvatar><img src={p.author.image?.url} /></IonAvatar>
                                        <IonLabel>{p.author?.username}</IonLabel>
                                    </IonChip>
                                    <p className="ion-text-wrap" style={{color: 'white', lineHeight: 1.2, marginLeft: 0, marginRight: 0, marginTop: '4px',
                                        marginBottom: '2px', fontSize: '22px', fontWeight: 'normal'}}>{p.title}</p>
                                    <p className="ion-text-wrap" style={{color: 'grey', lineHeight: 1.2, marginLeft: '10px', marginRight: 0, marginTop: '4px',
                                        marginBottom: '8px', fontSize: '14px', fontWeight: 'normal'}}>{moment(p.date).format('MMM Do YYYY')}</p>
                                    <IonImg src={p.image?.url}></IonImg>
                                    {/*<p className="ion-text-wrap" style={{lineHeight: 1.2, marginLeft: '10px', marginRight: 0, marginTop: '10px',*/}
                                    {/*    marginBottom: '8px', fontSize: '14px', fontWeight: 'normal'}}>{p.comment}</p>*/}
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
