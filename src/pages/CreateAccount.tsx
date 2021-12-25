import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";
import React, { useState } from "react";

export interface Props {}

const CreateAccount: React.FC<Props> = () => {
  const [username, setUserName] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");

  const doSignUp = async () => {
    console.log(username, email + " " + password);
    const URL = "http://localhost:1937";

    const signUpResp = await fetch(URL + "/auth/local/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const signUpInfo = await signUpResp.json();

    if (signUpInfo?.statusCode) {
      alert("Error: " + signUpInfo.data[0].messages[0].message);
    } else {
      alert("User Account Created");
      console.log(signUpInfo);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Strapi: Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Username</IonLabel>
          <IonInput
            type="text"
            onIonChange={(e: any) => setUserName(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput
            type="email"
            onIonChange={(e: any) => setEmail(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Password</IonLabel>
          <IonInput
            type="password"
            onIonChange={(e: any) => setPassword(e.target.value)}
          />
        </IonItem>
        <div style={{ paddingTop: 8 }}>
          <IonButton onClick={() => doSignUp()} expand="block">
            SIGN UP
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreateAccount;
