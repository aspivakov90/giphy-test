import React, { Component } from 'react'
import SearchComponent from './components/search.jsx'
import Images from './components/image-list.jsx'
import { connect } from 'react-redux'
import { catchError } from './actions'
import spinner from './ajax-loader.gif'
import PropTypes from 'prop-types'

const mapStateToProps = (state) => ({
    loading: state.loading,
    error: state.error
})

const mapDispatchToProps = (dispatch) => ({
    onError: (error) => {

        dispatch(catchError(error))
    }
})

class App extends Component {

    static propTypes = {
        loading: PropTypes.bool,
        error: PropTypes.string
    }

    componentDidCatch(error) {

        this.props.onError(error)
    }

    render() {

        if (this.props.error) {
            return <div>Oops! Something is broken! {this.props.error}</div>
        }

        return (
            <div className="main-container">
                <SearchComponent />
                {
                    this.props.loading ?
                        <img src={spinner} /> :
                        <Images />
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
