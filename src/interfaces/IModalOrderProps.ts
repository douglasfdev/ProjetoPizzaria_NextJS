import { IOrderItemProps } from "./IOrderProps";

export interface IModalORderProps {
  isOpen: boolean;
  onRequestClose: () => void;
  order: Array<IOrderItemProps>;
}
