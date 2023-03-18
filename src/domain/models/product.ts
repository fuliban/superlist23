import {User} from './user';
import { Section } from './section';

export interface Product {
    user:User;
    section:Section;
    code:string;
    description:string;
    photo:string
}
