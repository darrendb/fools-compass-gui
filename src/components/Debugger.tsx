import React from 'react';
import { IonChip, IonLabel } from "@ionic/react";

interface Props {
}

const Debugger: React.FC<Props> = ({}) => {
    console.log(`Debugger()`);
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const NODE_ENV = process.env.NODE_ENV;
    const ENV = (NODE_ENV === 'production') ? 'PROD' : 'DEV';

    console.log(`  BASE_URL: ${BASE_URL}`);
    console.log(`  NODE_ENV: ${NODE_ENV}`);
    console.log(`  ENV: ${ENV}`);

    return (
        <>
            <IonChip style={{float: 'right', marginTop: '2px'}}>
                <IonLabel><b>Url:</b> {BASE_URL}</IonLabel>
            </IonChip>

            <IonChip style={{float: 'right', marginTop: '2px'}}>
                <IonLabel><b>Env:</b> {NODE_ENV}</IonLabel>
            </IonChip>
            <IonChip style={{float: 'right', marginTop: '2px'}}>
                <IonLabel><b>Env:</b> {ENV}</IonLabel>
            </IonChip>
        </>
    );
};

export default Debugger;
