export interface Toast {
  message: string;
  type: ToastType;
}

export enum ToastType {
  INFO, SUCCESS, ERROR
}
