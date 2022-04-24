import { number, string } from "yup";

interface UserImage {
    id: number;
    name: string;
    caption: string;
    url: string;
}
interface UserObjType {
    id: number;
    username: string;
    email: string;
    image: UserImage;
}
interface AuthObjType {
    isAuthenticated: boolean;
    jwt: string;
}
interface PageProps {
    userObj: UserObjType|null;
    setUserObj: Function;
    authObj: AuthObjType|null;
    setAuthObj: Function;
}
interface CompProps {
    userObj: UserObjType|null;
}
export type { UserImage, UserObjType, AuthObjType, PageProps, CompProps, };

const defaultUser:UserObjType = {id: 999, username: 'Guest', email: '', image: {id: 145, name: 'fool-circle-327.png', caption: '', url: 'https://fools-compass-dev.s3.amazonaws.com/fool_circle_327_7c6b405cfc.png'},}
const defaultAuth:AuthObjType = {isAuthenticated: false, jwt: '',}
export { defaultUser, defaultAuth }
