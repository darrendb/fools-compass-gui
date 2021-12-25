import React, { useState } from 'react';
import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
    IonFab, IonFabButton, IonIcon, IonGrid, IonRow,
    IonCol, IonImg, IonActionSheet
} from '@ionic/react';
import { camera, trash, close } from 'ionicons/icons';
import { usePhotoGallery, UserPhoto } from "../hooks/usePhotoGallery";
import './Tab1.css';

const Tab1: React.FC = () => {
    const { deletePhoto, photos, takePhoto } = usePhotoGallery();
    const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Create Reading</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Create Reading</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid>
                    <IonRow>
                        {photos.map((photo, index) => (
                            <IonCol size="6" key={index}>
                                <IonImg onClick={() => setPhotoToDelete(photo)}  src={photo.webviewPath} />
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
                <IonFab vertical="bottom" horizontal="center" slot="fixed">
                    <IonFabButton onClick={() => takePhoto()}>
                        <IonIcon icon={camera}></IonIcon>
                    </IonFabButton>
                </IonFab>

                <IonActionSheet
                    isOpen={!!photoToDelete}
                    buttons={[{
                        text: 'Delete',
                        role: 'destructive',
                        icon: trash,
                        handler: () => {
                            if (photoToDelete) {
                                deletePhoto(photoToDelete);
                                setPhotoToDelete(undefined);
                            }
                        }
                    }, {
                        text: 'Cancel',
                        icon: close,
                        role: 'cancel'
                    }]}
                    onDidDismiss={() => setPhotoToDelete(undefined)}
                />

            </IonContent>
        </IonPage>
    );
};

export default Tab1;
