import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonLoading,
    IonModal,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import React, { useRef, useState } from "react";
import { AuthObjType, UserObjType } from "../../types/UserTypes";
import { useEditReadingService } from "../../hooks/useEditReadingsService";
import { ReadingType } from "../../types/ReadingTypes";
import './ReadingListItem.scss';
import JoditEditor from "jodit-react";
import { date } from "yup";

export interface ModalProps {
    userObj: UserObjType | null;
    setUserObj: Function;
    authObj: AuthObjType | null;
    setAuthObj: Function;
    setShowModal: Function;
    isOpen: boolean;
    currentReading: ReadingType;
}

const EditReadingModal: React.FC<ModalProps> = ({
                                                    userObj, setUserObj,
                                                    authObj, setAuthObj,
                                                    isOpen, setShowModal,
                                                    currentReading
                                                }) => {
    console.log(`EditReadingModal()`);
    console.log(`  currentReading?.title: ${currentReading?.title}`);
    const fileBtn = useRef<any>(null);

    // title, author, date, comment, image, slug
    // const [title, setTitle] = useState<any>(currentReading?.title);
    // const [date, setDate] = useState<any>("");
    // const [comment, setComment] = useState<any>("");
    // const [image, setImage] = useState<any>("");
    // const [slug, setSlug] = useState<any>("");
    const [updatedReading, setUpdatedReading] = useState<ReadingType>(currentReading);
    const {isLoading, error, mutateAsync: newReadingMutation} = useEditReadingService(authObj?.jwt, userObj?.id);
    const editor = useRef<any>(null);
    const editorConfig = {
        readonly: false, // https://xdsoft.net/jodit/doc/
        hidePoweredByJodit: true,
        useSearch: false,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        toolbarButtonSize: "xsmall",
        buttonsXS: ['bold','italic','underline','ul','ol','font','fontsize','link','hr','source',],
    }
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
    const updateTitle = (v: string) => {
        console.log(`updateTitle()`);
        console.log(`  v:${v}`);
        const delta = currentReading;
        delta.title = v;
        setUpdatedReading(delta);
        // setTitle(v);
        // updateSlug(v); // when editing, don't change slug
    }
    /*
    const updateSlug = (v: string) => {
        // console.log(`updateSlug()`);
        // console.log(`  v:${v}`);
        const rv: string = slugify(v);
        // console.log(`  rv:${rv}`);
        // setSlug(rv);
        const delta = currentReading;
        delta.slug = rv;
        setUpdatedReading(delta);
    };*/

    const getFile = (e: any) => {
        console.log(`getFile()`);
        console.log(`  todo`)
        // console.log(e.target.files[0]);
        // todo
        // setImage(e.target.files[0]);
    };

    const submitForm = async () => {
        console.log(`EditReadingModal.submitForm()`);
        // title, author, date, comment, image, slug
        // console.log(`editor:${editor}`);
        const author = userObj?.id;
        // console.log(title, author, date, comment, image, slug);
        const title = currentReading.title;
        const slug = currentReading.slug;
        const comment = editor?.current?.value || currentReading.comment;
        const date = currentReading.date;
        const image = currentReading.image;
        console.log(`image:`);
        console.log(`${image}`);
        debugger;
        const id = currentReading.id;
        const resp = await newReadingMutation({title, date, comment, image, slug, id});
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
                    <IonTitle>Editing "{currentReading.title}"</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setShowModal(false)} color="danger">Cancel</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            {/* title, author, date, comment, image, slug*/}
            <IonContent className="ion-padding readingItem">
                <IonLoading isOpen={isLoading} message="Saving..."/>
                <form>
                    <IonItem>
                        <IonLabel position="stacked">Title</IonLabel>
                        <IonInput
                            type="text"
                            required={true}
                            value={currentReading.title}
                            onIonChange={(e: any) => updateTitle(e.target.value)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Comment</IonLabel>
                        {/*<IonTextarea ref={this.rteRef}*/}
                        {/*    onIonChange={(e: any) => setComment(e.target.value)}*/}
                        {/*    value={currentReading?.comment}*/}
                        {/*/>*/}
                        <div style={{width: '100%'}}>
                            <JoditEditor ref={editor}
                                         value={currentReading?.comment || ''}
                                         config={editorConfig} />
                        </div>
                    </IonItem>
                    <IonItem>
                        {currentReading?.image.name}
                        <IonButton slot="end" onClick={() => {
                            fileBtn?.current?.click();
                        }}>Change Image</IonButton>
                    </IonItem>
                    <input
                        type="file"
                        onChange={getFile}
                        ref={fileBtn}
                        style={{display: "none"}}
                    />
                    <IonItem>
                        <IonImg className="readingImage" src={currentReading?.image?.url}></IonImg>
                    </IonItem>
                    <div style={{paddingTop: 8}}>
                        <IonButton onClick={() => submitForm()} expand="block">Save</IonButton>
                    </div>
                </form>
            </IonContent>
        </IonModal>
    );
};

export default EditReadingModal;
