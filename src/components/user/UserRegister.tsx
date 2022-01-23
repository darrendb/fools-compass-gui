import { IonButton, IonInput, IonItem, IonLabel, } from "@ionic/react";
import React, { useRef, useState } from "react";
import { PageProps } from "../../types/UserTypes";
import { useRegistrationService } from "../../hooks/useRegistrationService";

const UserRegister: React.FC<PageProps> = ({userObj, setUserObj, authObj, setAuthObj}) => {
    // console.log(`UserRegister()`);
    const [username, setUserName] = useState<any>("");
    const [password, setPassword] = useState<any>("");
    const [email, setEmail] = useState<any>("");
    const [image, setImage] = useState<any>("");
    const fileBtn = useRef<any>(null);

    const handleRegisterResponse = (data: any | null) => {
        // console.log(`UserSignup.handleRegisterResponse()`);
        setAuthObj({isAuthenticated: true, jwt: data.jwt});
        setUserObj(data.user);
    };

    const getFile = (e: any) => {
        setImage(e.target.files[0]);
    };

    const {isLoading, error, mutateAsync: newRegisterMutation} = useRegistrationService(handleRegisterResponse);

    const submitForm = async () => {
        // console.log("UserRegister.submitForm() 1");
        // console.log('  doing nothing')
        // username, password
        // console.log(username);
        const resp = await newRegisterMutation({username, email, password, image});
        // console.log("UserRegister.submitForm() 4");
        // console.log(`  resp.jwt: ${resp.jwt}`);
        // console.log('  doing nothing')

    };

    return (
        <form className="ion-padding">
            <IonItem>
                <IonLabel position="stacked">Username</IonLabel>
                <IonInput
                    type="text" name="username" required={true}
                    onIonChange={(e: any) => setUserName(e.target.value)}
                />
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                    type="email" name="email" pattern="email" required={true}
                    onIonChange={(e: any) => setEmail(e.target.value)}
                />
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Password</IonLabel>
                <IonInput
                    type="password" name="password" required={true}
                    onIonChange={(e: any) => setPassword(e.target.value)}
                />
            </IonItem>
            <IonItem>
                {image.name}
                <IonButton color="medium" slot="end" onClick={() => {
                    fileBtn?.current?.click();
                }}>Add a Photo</IonButton>
            </IonItem>
            <input
                type="file"
                onChange={getFile}
                ref={fileBtn}
                style={{display: "none"}}
            />
            <div style={{paddingTop: 8}}>
                <IonButton onClick={() => submitForm()} expand="block">
                    Register
                </IonButton>
            </div>
        </form>
    );
};

export default UserRegister;
