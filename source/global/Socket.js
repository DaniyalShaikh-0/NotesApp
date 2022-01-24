import {io} from 'socket.io-client';
import IpAddress from '../data/IpAddress';
const socket = io(IpAddress);
export default socket;
