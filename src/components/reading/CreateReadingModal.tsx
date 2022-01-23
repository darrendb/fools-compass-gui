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
import { useMutation, useQueryClient } from "react-query";


export const useCreateReadingService = (_jwt: string = '', _authorId: number = 0) => {
    // console.log("CreateReadingModal.useCreateReadingService()");
    const client = useQueryClient();
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    return useMutation(
        // title, author, date, comment, image, slug
        async (data: { title: string; date: string; comment: string; image: File; slug: string; }) => {
            // console.log("data:");
            // console.log(data);


            // upload file/image
            const formData = new FormData();
            formData.append("files", data.image);
            const fileResp = await fetch(`${BASE_URL}/upload`, {
                method: "POST",
                body: formData,
            });

            const fileInfo = await fileResp.json();
            // console.log("fileInfo[0]:");
            // console.log(fileInfo[0]);
            // console.log("fileInfo[0].id:");
            // console.log(fileInfo[0].id);

            // post form as new Reading (including file/iimage)
            const readingPostResp = await fetch(`${BASE_URL}/readings`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${_jwt}`
                },
                method: "POST",
                // title, author, date, comment, image, slug
                body: JSON.stringify({
                    title: data.title,
                    author: _authorId,
                    date: new Date(),
                    comment: data.comment,
                    image: fileInfo[0].id,
                    // spread: data.spread,
                    slug: data.slug,
                }),
            });
            return await readingPostResp.json();
        },
        {
            onSuccess: () => {
                client.invalidateQueries("readingQueryKey");
            },
        }
    );
};

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
