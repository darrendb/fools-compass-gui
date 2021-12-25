import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/react";
import React, { useState } from "react";

export interface Props {}

const Login: React.FC<Props> = () => {
  const [username, setUserName] = useState<any>("");
  const [password, setPassword] = useState<any>("");

  const doLogin = async () => {
    console.log(username, password);
    const URL = "http://localhost:1937";

    const loginResp = await fetch(URL + "/auth/local", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        identifier: username,
        password: password,
      }),
    });
    const loginInfo =  await loginResp.json();

    if (loginInfo?.statusCode) {
        alert("Error: " + loginInfo.data[0].messages[0].message)
    } else {
        alert("User Logged In");
        console.log(loginInfo);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Strapi: Login</IonTitle>
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
          <IonLabel position="stacked">Password</IonLabel>
          <IonInput
            type="password"
            onIonChange={(e: any) => setPassword(e.target.value)}
          />
        </IonItem>
        <div style={{ paddingTop: 8 }}>
          <IonButton onClick={() => doLogin()} expand="block">
            LOGIN USER
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
