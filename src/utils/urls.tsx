import config from "./config";

const { apiPath } = config;

export default {
  signup: apiPath + "/user/signup",
  login: apiPath + "/user/login",
  tokenLogin: apiPath + "/user/token-login",
  action: apiPath + "/action",
  actionRecord: apiPath + "/action-record",
};
