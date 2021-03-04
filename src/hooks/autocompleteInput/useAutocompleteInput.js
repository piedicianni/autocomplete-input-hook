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
            ? timeout = setTimeout(() => setValue(inputValue), delay)
            : setValue(inputValue);
        }
        return () => timeout && clearTimeout(timeout);
    }, [inputValue, hasFocusOn, delay]);

    useEffect(() => {
        const reset = () => {
            setInputValue(itemSelected);
            setValue('');
        };
        setItems([]);
        itemSelected !== '' && reset();
    }, [itemSelected]);

    const onItemSelected = (item = inputValue) => setItemSelected(item);
    const resetItemSelected = useCallback(() => setItemSelected(''), []);

    const onChange = e => setInputValue(e.target.value);
    const onFocus = e => setHasFocusOn(true);
    const onBlur = e => {
        setHasFocusOn(false);
        setItems([]);
    };
    const onKeyDown = e => e.key === 'Enter' && onItemSelected();

    const bind = {
        value: inputValue, onChange, onFocus, onBlur, onKeyDown
    };

    return { value, items, setItems, itemSelected, onItemSelected, resetItemSelected, bind };
}

useAutocompleteInput.propTypes = {
    delay: PropTypes.number
};

export default useAutocompleteInput;