export * from './alert.constants';
export * from './user.constants';
export const API_PATH = window.BS && window.BS.config ? window.BS.config.API_PATH : '/thenumber';
export const TOKEN_NAME = window.BS && window.BS.config ? window.BS.config.TOKEN_NAME : 'NBtoken';
export const SERVICE_UNAVAILABLE = 'Сервис временно недоступен';
export const CONFIRM_EMAIL = 'Необходимо подтвердить Email';