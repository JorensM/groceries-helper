import { KeyboardEvent } from 'react';

/**
 * Basic abstract function for handling key presses
 * @param event keyboard event
 * @param codes Array of codes that should be checked
 * @param handler Handler that gets called if the event has any of the keys from `codes` arg
 */
export default function handleKeyPress(event: KeyboardEvent, codes: string[], handler: () => void) {
    if(codes.includes(event.code)) {
        handler();
    }
}