import { User } from "./user";
import { ProductListItem } from "./product-list-item";
export interface ProductList {
    user:User;
    listItem: ProductListItem[];
}
