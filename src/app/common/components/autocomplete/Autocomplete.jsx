import './Autocomplete.scss';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useFocusRef, useSetFocus} from 'app/hooks/Common';
import ResultItem from './result_item/ResultItem';

const Autocomplete = ({placeholder, initValue, onSelect, renderResult}) => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState(null);
    const [currentFocus, setCurrentFocus] = useSetFocus(results?.length + 1);
    const searchRef = useFocusRef(currentFocus === 0);
    const handleChange = event => {
        const value = event.target.value;
        setSearch(value);
        setResults(value ? renderResult(value) : null);
    };

    const handleKeyDown = event => {
        if (event.keyCode === 27) {
            event.preventDefault();
            setSearch('');
            setResults(null);
        } else if (event.keyCode === 13 && results?.length) {
            event.preventDefault();
            setCurrentFocus(1);
        }
    };

    const handleSelect = item => {
        setResults(null);
        setCurrentFocus(0);
        if (initValue) {
            setSearch(initValue);
        }
        onSelect(item);
    };

    const getResults = () => {
        if (!results.length) {
            return <div className="empty">Not result</div>;
        }
        return results.map((data, index) => (
            <ResultItem key={`result-item-${index}`} data={data} onSelect={handleSelect}
                        focus={currentFocus === index + 1}/>)
        );
    };

    useEffect(() => {
        if (initValue) {
            setSearch(initValue);
        }
    }, [initValue]);

    return (
        <div className="autocomplete">
            <input type="text" className="search" placeholder={placeholder} ref={searchRef}
                   value={search} onChange={handleChange} onKeyDown={handleKeyDown}/>
            {results && <div className="results">{getResults()}</div>}
        </div>
    );
};

Autocomplete.propTypes = {
    placeholder: PropTypes.string,
    initValue: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    renderResult: PropTypes.func.isRequired,
};

export default React.memo(Autocomplete);