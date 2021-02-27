import React, { useEffect, useState } from 'react';
import useAutocompleteInput from '../hooks/autocompleteInput/useAutocompleteInput';
import { citiesList } from '../services/services';

function SearchCities() {

    const { inputValue, items, setItems, itemSelected, onItemSelected, bind: bindInput } = useAutocompleteInput(200);
    const [cityDetails, setCityDetails] = useState({});

    useEffect(() => {
        citiesList(inputValue)
            .then(res => setItems(res))
            .catch(error => console.log(error));
    }, [inputValue, setItems]);

    useEffect(() => {
        const info = items.find(item => item.city.toLowerCase() === itemSelected.toLowerCase());
        info && setCityDetails(info);
    }, [itemSelected, items]);

    return (
        <div className='search-cities'>
            <div className='input-group'>
                <input
                    type='text'
                    placeholder='City...'
                    {...bindInput}
                />
                <button onMouseDown={() => onItemSelected()}>Search</button>
            </div>
            <div className='list-group'>
                {
                    items.map((item, index) => (
                        <button
                            className='item'
                            onMouseDown={() => onItemSelected(item.city)}
                            key={index}
                        >{item.city}</button>
                    ))
                }
            </div>
            <div className='info'>
                <h1>{cityDetails.country}</h1>
                <h2>{cityDetails.city}</h2>
            </div>
        </div>
    )
}

export default SearchCities;