export type TErrorMessage = {
  uz: string;
  ru: string;
};

export class RestError {
  public code: number;
  public message: TErrorMessage;
  public data: any;

  constructor(code: number, message: TErrorMessage, data: any = null) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

export enum EErrorCodes {
  InternalError = -1,
  ParseError = -2,
  HttpMethodError = -3,
  AuthError = -4,
}

export const ErrorMessages = {
  InternalError: {
    code: EErrorCodes.InternalError,
    message: {
      uz: 'Ichki hato.',
      ru: 'Внутренная ошибка.',
    },
  },
};
