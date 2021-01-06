export const errorMsg = (message: string) => {
  if (!message) return null;

  const msgArr = message.split(" ");
  if (msgArr.length < 2) return message;

  let firstWord = msgArr.shift();
  firstWord = firstWord.replace(/([A-Z])/g, " $1");
  firstWord = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);

  return [firstWord, ...msgArr].join(" ");
};

export const errorText = (errors: any, field: string) => {
  return !!errors && !!errors[field] ? errorMsg(errors[field].message) : null;
};

export const getErrorData = (data: any) => {
  return data ? (Array.isArray(data) ? data[0].msg : data.msg) : null;
};
