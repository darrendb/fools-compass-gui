import React, { useEffect, useState } from 'react';
import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
    IonFab, IonFabButton, IonIcon, IonGrid, IonRow,
    IonCol, IonImg, IonActionSheet, IonList, IonItem, IonLabel, IonButtons, IonButton
} from '@ionic/react';
import { usePhotoGallery, UserPhoto } from "../hooks/usePhotoGallery";
import './Tab2.css';
import { useHistory } from "react-router";

const Tab2: React.FC = () => {
const [readings, setReadings] = useState<any>();
const history = useHistory();
    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:1937/readings");
            setReadings( await response.json());
        })();
    },[]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Readings</IonTitle>
            <IonButtons slot="end">
                <IonButton onClick={()=> history.push("/add-item")}>Add</IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Readings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
            { readings?.map((p:any )=> {
                return <IonItem key={p.id}>
                    <IonLabel>
                        <h1 className="ion-text-wrap">{p.title}</h1>
                        <h2 className="ion-text-wrap">{p.date}</h2>
                        <p className="ion-text-wrap"><IonImg src={p.author.image.url}></IonImg>{p.author.username}</p>
                        <div>
                            <IonImg src={p.image.url}></IonImg>
                        </div>
                    </IonLabel>
                </IonItem>
            })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
