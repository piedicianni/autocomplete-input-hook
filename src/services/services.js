const handlerError = (error) => Promise.reject(error);

const citiesList = async (query) => {
    if(query === '') return handlerError({ description: 'Query not valid!' });;
    try {
        const resp = await fetch('json-placeholder/cities_with_countries.json');
        if (!resp.ok) return handlerError({ description: resp.statusText });
        const json = await resp.json();
        let res = [];
        const regex = new RegExp(`\\b${query}`, 'gi');
        for(const item of json) regex.test(item.city) && res.push(item.city);
        return res;
    } catch (error) {
        return handlerError({ description: error });
    }
};

export {
    citiesList
};