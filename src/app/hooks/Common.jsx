import {useCallback, useEffect, useRef, useState} from 'react';

export const useSetFocus = size => {
    const [currentFocus, setCurrentFocus] = useState(0);
    const handleKeyDown = useCallback(
        e => {
            if (e.keyCode === 40) {
                // Down arrow
                e.preventDefault();
                if (currentFocus < size - 1) {
                    setCurrentFocus(currentFocus + 1);
                }
            } else if (e.keyCode === 38) {
                // Up arrow
                e.preventDefault();
                if (currentFocus > 0) {
                    setCurrentFocus(currentFocus - 1);
                }
            }
        },
        [size, currentFocus, setCurrentFocus]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown, false);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, false);
        };
    }, [handleKeyDown]);

    return [currentFocus, setCurrentFocus];
};

export const useFocusRef = focus => {
    const ref = useRef(null);

    useEffect(() => {
        if (focus && ref.current) {
            ref.current.focus();
        }
    }, [focus]);

    return ref;
};