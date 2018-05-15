import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapStateToProps = (state) => ({
    images: state.response
})

class ImageList extends Component {

    static propTypes = {
        images: PropTypes.array
    }

    render() {

        if (!Array.isArray(this.props.images) || this.props.images.length === 0) {
            return <div>No results</div>
        }

        return(
            <div className="image-list">
                {
                    this.props.images.map((image, index) => {

                        return <img key={index} src={image.images.downsized.url} />
                    })
                }
            </div>
        )
    }
}

export default connect(mapStateToProps)(ImageList)