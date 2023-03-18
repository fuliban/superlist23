import { User } from "./user";
import { Product } from "./product";

export interface Historical {
    user:User;
    product:Product;
    date:Date
}
