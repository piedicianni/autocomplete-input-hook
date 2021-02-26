import React, { useEffect } from 'react';
import useAutocompleteInput from '../hooks/autocompleteInput/useAutocompleteInput';
import { citiesList } from '../services/services';

function SearchCities() {

    const { inputValue, items, setItems, itemSelected, onItemSelected, bind } = useAutocompleteInput(200);

    useEffect(() => {
        citiesList(inputValue)
            .then(res => setItems(res))
            .catch(error => console.log(error));
    }, [inputValue, setItems]);

    return (
        <div className='search-cities'>
            <div className='input-group'>
                <input
                    type='text'
                    placeholder='City...'
                    {...bind}
                />
                <button onClick={() => onItemSelected()}>Search</button>
            </div>
            <div className='list-group'>
                {
                    items.map((item, index) => (
                        <button
                            className='item'
                            onMouseDown={() => onItemSelected(item)}
                            key={index}
                        >{item}</button>
                    ))
                }
            </div>
            <h2>{itemSelected}</h2>
        </div>
    )
}

export default SearchCities;