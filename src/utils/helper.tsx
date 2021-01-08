import { State } from "../redux/redux";

export const timeout = (ms = 300) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const camelToTitle = (input: string) => {
  input = input.replace(/([A-Z])/g, " $1");
  return input.charAt(0).toUpperCase() + input.slice(1);
};

export const errorMsg = (message: string) => {
  if (!message) return null;
  const msgArr = message.split(" ");
  if (msgArr.length < 2) return message;
  const firstWord = camelToTitle(msgArr.shift());
  return [firstWord, ...msgArr].join(" ");
};

export const errorText = (errors: any, field: string) => {
  return !!errors && !!errors[field] ? errorMsg(errors[field].message) : null;
};

export const getErrorData = (data: any) => {
  if (!data) return null;
  if (!Array.isArray(data)) return data.msg;
  let message = data[0]?.msg;
  if (data[0]?.param) message = `${camelToTitle(data[0].param)}: ${message}`;
  return message;
};

export const authHeaders = (state: State) => {
  const { token } = state.auth;
  return token ? { Authorization: `Bearer ${token}` } : {};
};
