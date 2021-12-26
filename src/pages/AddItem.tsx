import {
    IonAvatar,
    IonButton,
    IonButtons,
    IonContent,
    IonDatetime,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonLoading,
    IonModal,
    IonPage, IonTextarea,
    IonTitle,
    IonToolbar, useIonToast
} from "@ionic/react";
import { useHistory } from "react-router";
import React, { useRef, useState } from "react";
import "./AddItem.css";
import { useMutation, useQueryClient } from "react-query";

export const useCreateReadingQuery = () => {
    console.log("AddItem.useCreateReadingQuery()");
    const client = useQueryClient();
    return useMutation(
        // title, author, date, comment, image, slug
        async (data: {
            title: string; author: number; date: string; comment: string;
             image: File; slug: string;
        }) => {
            console.log("data:");
            console.log(data);

            const URL = "http://localhost:1937";

            // upload file/image
            const formData = new FormData();
            formData.append("files", data.image);
            const fileResp = await fetch(URL + "/upload", {
                method: "POST",
                body: formData,
            });

            const fileInfo = await fileResp.json();
            console.log("fileInfo[0]:");
            console.log(fileInfo[0]);
            console.log("fileInfo[0].id:");
            console.log(fileInfo[0].id);


            // post form as new Reading (including file/iimage)
            const readingPostResp = await fetch(URL + "/readings", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                // title, author, date, comment, image, slug
                body: JSON.stringify({
                    title: data.title,
                    author: 50,
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

/*  // title, author, date, comment, image, slug
    title:Text       - Required
    author:Number    - Optional; id of User object; User has-many Readings
    date:DateTime    - Optional
    comment:RichText - Optional
    image:Media      - Optional; Single; Image
    spread:Number    - Optional; id of Spread object; Reading has-one Spread
    slug:Text        - Required; UID

 */
const AddItem: React.FC = () => {
    console.log(`AddItem()`);
    const history = useHistory();
    const fileBtn = useRef<any>(null);
    const [present, dismiss] = useIonToast();

    // title, author, date, comment, image, slug
    const [title, setTitle] = useState<any>("");
    const [author, setAuthor] = useState<any>("");
    const [date, setDate] = useState<any>("");
    const [comment, setComment] = useState<any>("");
    const [image, setImage] = useState<any>("");
    // const [spread, setSpread] = useState<any>("");
    const [slug, setSlug] = useState<any>("");

    const {isLoading, error, mutateAsync: newReadingMutation} = useCreateReadingQuery();

    console.log(`  isLoading:${isLoading}`);
    console.log(`  error:${error}`);

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
        console.log(`getFile()`);
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    };

    const submitForm = async () => {
        console.log(`submitForm()`);
        // title, author, date, comment, image, slug
        console.log(title, author, date, comment, image, slug);
        const resp = await newReadingMutation({title, author, date, comment, image, slug});
        console.log(`response:`);
        console.log(resp);
        history.goBack();
        console.log(`done.`);
        present({
            buttons: [{ text: 'Ok', role: 'cancel' }],
            message: 'Reading Saved Successfully',
            duration: 3000,
            position: 'middle',
        })
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonAvatar><img src={'/assets/fool_circle_avatar.png'}/></IonAvatar>
                    <IonTitle style={{color:'#fdfc4f'}}>Add Reading</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => history.goBack()} color="danger">Cancel</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            {/* title, author, date, comment, image, slug*/}
            <IonContent fullscreen className="ion-padding">
                <IonLoading isOpen={isLoading} message="Saving..."/>
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
                    <IonButton slot="end" onClick={() => {fileBtn?.current?.click();}}>Attach Image</IonButton>
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

                {/*<IonItem>*/}
                {/*    <IonLabel position="stacked">Date</IonLabel>*/}
                {/*    /!*<IonDatetime onIonChange={(e: any) => setDate(e.target.value)} />*!/*/}
                {/*    <IonButton id="open-modal" slot="end">Date</IonButton>*/}
                {/*    <IonModal trigger="open-modal">*/}
                {/*        <IonContent>*/}
                {/*            <IonDatetime presentation="date"*/}
                {/*                         showDefaultButtons={true}*/}
                {/*                         onIonChange={(e: any) => setDate(e.target.value)}*/}
                {/*            />*/}
                {/*        </IonContent>*/}
                {/*    </IonModal>*/}
                {/*</IonItem>*/}

                {/*<IonItem>*/}
                {/*    <IonLabel position="stacked">Image</IonLabel>*/}
                {/*    <IonInput*/}
                {/*        type="text"*/}
                {/*        onIonChange={(e: any) => setImage(e.target.value)}*/}
                {/*    />*/}
                {/*</IonItem>*/}
                {/*<IonItem>*/}
                {/*    <IonLabel position="stacked">Author</IonLabel>*/}
                {/*    <IonInput*/}
                {/*        type="number"*/}
                {/*        onIonChange={(e: any) => setAuthor(e.target.value)}*/}
                {/*    />*/}
                {/*</IonItem>*/}
                {/*<IonItem>*/}
                {/*    <IonLabel position="stacked">Spread</IonLabel>*/}
                {/*    <IonInput*/}
                {/*        type="number"*/}
                {/*        onIonChange={(e: any) => setSpread(e.target.value)}*/}
                {/*    />*/}
                {/*</IonItem>*/}


            </IonContent>
        </IonPage>
    );
};

export default AddItem;
