const config = {
  // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
  // like '/bajaji'
  basename: '',
  defaultPath: '/dashboard/default',
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12
};

export default config;

export const MSG_SUCCESS = "success";
export const MSG_ERROR = "error";
export const MSG_INFO = "info";
export const MSG_WARNING = "warning";

export const ROLE_ADMIN = "ADMIN";
export const ROLE_UTENTE = "UTENTE";
export const ROLE_MEMBER = "MEMBRO";

export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";
export const RECOVERY_PATH = "/recover";
export const RESOURCES_PATH = "/resources";
export const WALLET_PATH = "/wallet";

export const HOME_PATH = "/home";

export const NOTIFICATION_DURATION = 5000;

export const NEW_REWARD = "new";
