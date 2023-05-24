import { OrderProps, ProductProps } from "@/types";

export interface IOrderItemProps {
  id: string;
  amount: number;
  status: number;
  order: OrderProps;
  products: ProductProps
}
