import { io } from 'socket.io-client';
import { API } from './config/api/api.config';

// "undefined" means the URL will be computed from the `window.location` object

export const socket = io(API.hostUrl, {
    reconnectionDelay: 5000,
    reconnectionDelayMax: 10000,
});