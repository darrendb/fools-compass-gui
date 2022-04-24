import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonLoading,
    IonModal,
    IonTextarea,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import React, { useRef, useState } from "react";
import { AuthObjType, UserObjType } from "../../types/UserTypes";
import { useCreateReadingService } from "../../hooks/useCreateReadingService";


export interface ModalProps {
    userObj: UserObjType | null;
    setUserObj: Function;
    authObj: AuthObjType | null;
    setAuthObj: Function;
    setShowModal: Function;
    isOpen: boolean;
}

const CreateReadingModal: React.FC<ModalProps> = ({
                                                      userObj, setUserObj,
                                                      authObj, setAuthObj,
                                                      isOpen, setShowModal
                                                  }) => {
    // console.log(`CreateReadingModal()`);
    const fileBtn = useRef<any>(null);

    // title, author, date, comment, image, slug
    const [title, setTitle] = useState<any>("");
    const [date, setDate] = useState<any>("");
    const [comment, setComment] = useState<any>("");
    const [image, setImage] = useState<any>("");
    const [slug, setSlug] = useState<any>("");
    const {isLoading, error, mutateAsync: newReadingMutation} = useCreateReadingService(authObj?.jwt, userObj?.id);

    // console.log(`  isLoading:${isLoading}`);
    // console.log(`  error:${error}`);

    const slugify = (v: string) => {
        // console.log(`  slugify()\n  v:${v}`);
        return v.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    };
    const getTitle = (v: string) => {
        // console.log(`getTitle()`);
        // console.log(`  v:${v}`);
        setTitle(v);
        getSlug(v);
    }
    const getSlug = (v: string) => {
        // console.log(`getSlug()`);
        // console.log(`  v:${v}`);
        const rv: string = slugify(v);
        // console.log(`  rv:${rv}`);
        setSlug(rv);
    };

    const getFile = (e: any) => {
        // console.log(`getFile()`);
        // console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    };

    const submitForm = async () => {
        // console.log(`CreateReadingModal.submitForm()`);
        // title, author, date, comment, image, slug
        const author = userObj?.id;
        // console.log(title, author, date, comment, image, slug);
        const resp = await newReadingMutation({title, date, comment, image, slug});
        // console.log(`response:`);
        // console.log(resp);
        setShowModal(false);
        // history.goBack();

        // console.log(`done.`);
        // present({
        //     buttons: [{text: 'Ok', role: 'cancel'}],
        //     message: 'Reading Saved Successfully',
        //     duration: 3000,
        //     position: 'middle',
        // })
    };

    return (
        <IonModal isOpen={isOpen}>
            <IonHeader>
                <IonToolbar>
                    {/*<IonAvatar><img src={'/assets/fool_circle_avatar.png'}/></IonAvatar>*/}
                    <IonTitle>Add Reading</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setShowModal(false)} color="danger">Cancel</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            {/* title, author, date, comment, image, slug*/}
            <IonContent className="ion-padding">
                <IonLoading isOpen={isLoading} message="Saving..."/>
                <form>
                    <IonItem>
                        <IonLabel position="stacked">Title</IonLabel>
                        <IonInput
                            type="text"
                            required={true}
                            onIonChange={(e: any) => getTitle(e.target.value)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Comment</IonLabel>
                        <IonTextarea
                            onIonChange={(e: any) => setComment(e.target.value)}
                        />
                    </IonItem>
                    <IonItem>
                        {image.name}
                        <IonButton slot="end" onClick={() => {
                            fileBtn?.current?.click();
                        }}>Attach Image</IonButton>
                    </IonItem>
                    <input
                        type="file"
                        onChange={getFile}
                        ref={fileBtn}
                        style={{display: "none"}}
                    />
                    <div style={{paddingTop: 8}}>
                        <IonButton onClick={() => submitForm()} expand="block">Save</IonButton>
                    </div>
                </form>
            </IonContent>
        </IonModal>
    );
};

export default CreateReadingModal;
