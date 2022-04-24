import React, { useState } from 'react';
import { IonButton, IonIcon } from "@ionic/react";
import { ReadingProps, ReadingType } from "../../types/ReadingTypes";
import { pencilOutline } from "ionicons/icons";

interface Props {
    setShowEditModal: Function,
    currentReading: ReadingType,
    setCurrentReading: Function,
};
const ReadingActions: React.FC<Props> = ({setShowEditModal, currentReading, setCurrentReading}) => {
    // console.log(`ReadingActions()`);

    return (
        <IonButton className="editReadingBtn button-clear" onClick={() => {setCurrentReading(currentReading);setShowEditModal(true);}}>
            <IonIcon slot="icon-only" size="small" icon={pencilOutline}/>
        </IonButton>
    );
};

export default ReadingActions;
