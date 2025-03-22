// Wrapper for eventemitter3 to fix import issues
import pkg from 'eventemitter3';
const { EventEmitter } = pkg;

export { EventEmitter };
export default EventEmitter; 