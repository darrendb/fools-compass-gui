import { AuthObjType, defaultUser, UserImage, UserObjType } from "./UserTypes";

interface ReadingProps {
    reading: ReadingType;
    setShowEditModal: Function;
    setCurrentReading: Function;
}

interface ReadingType {
    id: number;
    title: string;
    slug: string;
    author: UserObjType;
    image: UserImage;
    date: string;
    comment: string;
}
export type { ReadingProps, ReadingType };
const defaultReading:ReadingType = {id: 999, title: 'FPO',slug: 'FPO', author: defaultUser, image: {id: 9999, name:'',caption:'',url:''}, date: new Date().toDateString(), comment:'FPO'};
export { defaultReading };
