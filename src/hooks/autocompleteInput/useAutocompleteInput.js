import { useEffect, useState, useCallback } from "react";
import PropTypes from 'prop-types';

function useAutocompleteInput(delay = 0) {
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [hasFocusOn, setHasFocusOn] = useState(false);
    const [items, setItems] = useState([]);
    const [itemSelected, setItemSelected] = useState('');

    useEffect(() => {
        let timeout;
        if(hasFocusOn){
            delay > 0
            ? timeout = setTimeout(() => setInputValue(value), delay)
            : setInputValue(value);
        }
        return () => timeout && clearTimeout(timeout);
    }, [value, hasFocusOn, delay]);

    useEffect(() => {
        const reset = () => {
            setValue(itemSelected);
            setInputValue('');
        };
        setItems([]);
        itemSelected !== '' && reset();
    }, [itemSelected]);

    const onItemSelected = (item = value) => setItemSelected(item);
    const resetItemSelected = useCallback(() => setItemSelected(''), []);
    const onFocus = (e) => setHasFocusOn(true);
    const onBlur = (e) => {
        setHasFocusOn(false);
        setItems([]);
    };

    const bind = {
        value,
        onChange: e => setValue(e.target.value),
        onFocus,
        onBlur,
        onKeyDown: e => e.key === 'Enter' && onItemSelected()
    }

    return { inputValue, items, setItems, itemSelected, onItemSelected, resetItemSelected, bind };
}

useAutocompleteInput.propTypes = {
    delay: PropTypes.number
};

export default useAutocompleteInput;