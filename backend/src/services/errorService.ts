export function isGeneralError(object: any): object is GeneralError {
  return 'errorMessage' in object;
}

export interface GeneralError {
  errorStatus: number;
  errorMessage: string;
}

interface ErrorMessage {
  status: string;
  message: string;
}

export function errorHandler(message: string): ErrorMessage {
  return {
    status: 'error',
    message,
  };
}

function generalError(httpsStatus: number): (s: string) => GeneralError {
  return function (message: string): GeneralError {
    return {
      errorStatus: httpsStatus,
      errorMessage: errorHandler(message).message,
    };
  };
}

export const badRequestError: (string: string) => GeneralError =
  generalError(400);
export const notAcceptableError: (string: string) => GeneralError =
  generalError(406);
export const unauthorizedError: (string: string) => GeneralError =
  generalError(401);
export const notFoundError: (string: string) => GeneralError =
  generalError(404);
export const ConflictError: (string: string) => GeneralError =
  generalError(409);
export const internalServerError: (string: string) => GeneralError =
  generalError(500);

/*
export const forbiddenError: (string: string) => GeneralError = generalError(
  403
);
*/
