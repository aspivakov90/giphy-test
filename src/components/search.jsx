import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import { searchByQuery, changeSearchKey } from '../actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapStateToProps = (state) => ({
    searchKey: state.searchKey,
    previousSearches: state.previousSearches
})

const mapDispatchToProps = (dispatch) => ({
    onSearch: (searchKey) => {

        // ignore empty key
        if (searchKey === '') {
            return
        }

        dispatch(searchByQuery(searchKey))
    },
    onKeyChange: (valueOrEvent) => {

        let key = ''
        // simple stub, don't want to use long nested value check
        try {
            key = typeof(valueOrEvent) === 'string' ? valueOrEvent : valueOrEvent.target.value
        }
        catch(ex) { }

        dispatch(changeSearchKey(key))
    }
})

class SearchComponent extends Component {

    static propTypes = {
        previousSearches: PropTypes.array,
        searchKey: PropTypes.string,
        onKeyChange: PropTypes.func,
        onSearch: PropTypes.func
    }

    render() {

        return(
            <div>
                <Autocomplete
                    getItemValue={(item) => item}
                    items={this.props.previousSearches.map((item) => item.searchKey)}
                    renderItem={(item, isHighlighted) =>
                        <div key={item} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                            {item}
                        </div>
                    }
                    value={this.props.searchKey}
                    onChange={this.props.onKeyChange}
                    onSelect={this.props.onKeyChange}
                />
                <button type="button" onClick={() => this.props.onSearch(this.props.searchKey)}>
                    Search
                </button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent)