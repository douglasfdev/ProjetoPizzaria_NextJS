import { IOrderItemProps } from "./IOrderProps";

export interface IModalORderProps {
  isOpen: boolean;
  onRequestClose: () => void;
  order: Array<IOrderItemProps>;
  handleFinishOrder: (id: string) => void;
  handleAttendOrder: (id: string) => void;
  handleCancelOrder: (id: string) => void;
}
