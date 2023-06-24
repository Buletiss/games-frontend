import { AxiosError } from "axios";

function knownServerError() {
  return "O servidor falhou em responder, tente recarregar a página.";
}

function unknownServerError() {
  return "O servidor não conseguirá responder por agora, tente voltar novamente mais tarde.";
}

export function defaultErrorHandler(error: AxiosError) {
  const errorList = [500, 502, 503, 504, 507, 508, 509];
  const timeoutCode = "ECONNABORTED";
  const statusCode = error?.response?.status;

  if (error.code === timeoutCode) {
    return error.message;
  }

  if (statusCode && errorList.includes(statusCode)) {
    return knownServerError();
  }

  return unknownServerError();
}
