import React, { useState } from 'react';
import { IonCol, IonGrid, IonImg, IonItem, IonRow } from "@ionic/react";
import moment from "moment";
import { ReadingProps } from "../../types/ReadingTypes";
import AuthorProfile from "../user/AuthorProfile";
import ReadingActions from "./ReadingActions";
import './ReadingListItem.scss';

const ReadingListItem: React.FC<ReadingProps> = ({reading, setShowEditModal, setCurrentReading}) => {
    // console.log(`ReadingListItem()`);
    // const BASE_URL = process.env.REACT_APP_BASE_URL;
    // const NODE_ENV = process.env.NODE_ENV;
    // const ENV = (NODE_ENV === 'production') ? 'PROD' : 'DEV';

    return (
        <IonItem className="readingItem">
            <IonGrid className="readingCell">
                <IonRow className="readingCell">
                    <IonCol className="readingCell">
                        <IonImg className="readingImage" src={reading?.image?.url}></IonImg>
                    </IonCol>
                    <IonCol size="9" className="readingCell">
                        <IonRow className="readingCell">
                            <IonCol className="readingCell editReadingBtnParent">
                                <p className="ion-text-wrap readingTitle">{reading?.title}</p>
                                <p className="ion-text-wrap readingDate">{moment(reading?.date).format('ddd - Do MMM YYYY')}</p>
                                <ReadingActions setShowEditModal={setShowEditModal}
                                                currentReading={reading}
                                                setCurrentReading={setCurrentReading}
                                                />
                            </IonCol>
                        </IonRow>
                        <IonRow className="readingCell">
                            <IonCol className="readingCell">
                                <AuthorProfile userObj={reading?.author}/>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonItem>
    );
};

export default ReadingListItem;
