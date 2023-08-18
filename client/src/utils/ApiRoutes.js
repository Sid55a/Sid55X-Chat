// export const HOST = `http://localhost:3005`;
export const HOST = `https://sid55-x-chat.vercel.app/`;
const AUTH_ROUTE = `${HOST}/api/auth`;
const MESSAGES_ROUTE = `${HOST}/api/messages`;

export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`;
export const ONBOARD_USER_ROUTE = `${AUTH_ROUTE}/onboard-user`;
export const GET_ALL_CONTACTS = `${AUTH_ROUTE}/get-contacts`;
export const ADD_MESSAGES = `${MESSAGES_ROUTE}/add-message`;
export const GET_MESSAGES = `${MESSAGES_ROUTE}/get-messages`;
export const Add_IMAGE_MESSSAGE_ROUTE = `${MESSAGES_ROUTE}/add-image-message`;
export const Add_AUDIO_MESSSAGE_ROUTE = `${MESSAGES_ROUTE}/add-audio-message`;
export const GET_INITIAL_CONTACTS_ROUTE = `${MESSAGES_ROUTE}/add-initial-contacts`;
