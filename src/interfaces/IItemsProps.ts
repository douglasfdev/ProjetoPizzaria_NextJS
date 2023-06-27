import { OrderProps, ProductProps } from "@/types";

export interface IItemsProps {
    id: string;
    amount: number;
    status: number;
    order: OrderProps;
    products: ProductProps;
}
