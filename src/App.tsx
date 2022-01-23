import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonPage, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Readings from './pages/Readings';
import { AuthObjType, defaultAuth, defaultUser, UserObjType } from "./types/UserTypes";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Global CSS */
import './global.css';
import AppMenu from "./components/AppMenu";
import UserGateway from "./components/user/UserGateway";

setupIonicReact();

const App: React.FC = () => {
    const [userObj, setUserObj] = useState<UserObjType>(defaultUser);
    const [authObj, setAuthObj] = useState<AuthObjType>(defaultAuth);

    useEffect(() => {
        // console.log('App.useEffect()');
        // console.log(`  authObj?.isAuthenticated: ${authObj?.isAuthenticated}`);
    }, [])

    if (!authObj?.isAuthenticated) {
        return (
            <IonApp>
                <IonPage>
                    <UserGateway userObj={userObj} setUserObj={setUserObj} authObj={authObj} setAuthObj={setAuthObj}/>
                </IonPage>
            </IonApp>
        );
    } else {
        return (
            <IonApp>

                <AppMenu userObj={userObj} setUserObj={setUserObj} authObj={authObj} setAuthObj={setAuthObj}/>

                <IonReactRouter>
                    <IonRouterOutlet>
                        <Route path="/readings" render={props => (
                            <Readings userObj={userObj} setUserObj={setUserObj}
                                      authObj={authObj} setAuthObj={setAuthObj}/>)}/>
                        <Redirect exact={true} from="/" to="/readings"/>
                    </IonRouterOutlet>
                </IonReactRouter>

            </IonApp>
        );
    }
};
export default App;