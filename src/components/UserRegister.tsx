import { IonButton, IonInput, IonItem, IonLabel, } from "@ionic/react";
import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { PageProps } from "./UserTypes";
// import { object, string } from "yup";

export const useRegistrationService = (callback: Function) => {
    // console.log("UserRegister.useRegistrationService() 1");
    const client = useQueryClient();

    return useMutation(
        async (data: {
            username: string; email: string; password: string; image: File;
        }) => {
            // console.log(`UserRegister.useRegistrationService() 2`);

            const URL = "http://localhost:1937";

            // upload file/image
            const formData = new FormData();
            formData.append("files", data.image);
            const fileResp = await fetch(URL + "/upload", {
                method: "POST",
                body: formData,
            });

            const fileInfo = await fileResp.json();

            // post form as new User (including file/image)
            const signupPostResp = await fetch(URL + "/auth/local/register", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                // username, email, password, image
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    image: fileInfo[0]?.id,
                }),
            });
            return await signupPostResp.json();
        },
        {
            onSuccess: (data) => {
                // console.log('UserRegister.useRegistrationService.onSuccess() 2');
                // console.log(`  data.jwt: ${data.jwt}`); // <- this works
                // console.log(`  data.user: ${data.user}`);// <- this works
                // console.log('  doing nothing');
                callback(data);

                // client.invalidateQueries("userAuthQueryKey");
            },
        }
    );
};

const UserRegister: React.FC<PageProps> = ({userObj, setUserObj, authObj, setAuthObj}) => {
    // console.log(`UserRegister()`);
    const [username, setUserName] = useState<any>("");
    const [password, setPassword] = useState<any>("");
    const [email, setEmail] = useState<any>("");
    const [image, setImage] = useState<any>("");
    const fileBtn = useRef<any>(null);
    // const [present, dismiss] = useIonToast();

    // const registerSchema = object().shape({
    //     email: string().required().email(),
    //     username: string().required().min(5).max(32),
    //     password: string().required().min(8),
    // });
    // const initValues = {
    //     email: '',
    //     username: '',
    //     password: '',
    // };
    // const renderError = (message) => <p className="help is-danger">{message}</p>;

    const handleRegisterResponse = (data: any | null) => {
        // console.log('UserRegister.useRegistrationService.callback() - aka handleRegisterResponse() 3');
        // console.log(`UserSignup.handleRegisterResponse()`);
        // console.log(`  data.jwt: ${data.jwt}`);// <- this works
        // console.log('  setting values here')
        setAuthObj({isAuthenticated: true, jwt: data.jwt});
        setUserObj(data.user);

        // present({
        //     buttons: [{text: 'Ok', role: 'cancel'}],
        //     message: 'Login Successful (New)',
        //     duration: 3000,
        //     position: 'middle',
        // })

    };

    const getFile = (e: any) => {
        // console.log(`getFile()`);
        // console.log(e.target.files[0]);
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
