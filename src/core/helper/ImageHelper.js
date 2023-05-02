import React from 'react'
import { API } from '../../backend'

const imageHelper = ({ product }) => {

    const imageUrl = product ?
        `${API}/product/photo/${product._id}` :
        `https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`


    return (
        <div className="rounded border border-success p-2">
            <img
                src={imageUrl}
                alt=""
                style={{ maxHeight: "100%", maxWidth: "100%" }}
                className="mb-3 rounded"
            />
        </div>
    )
}

export default imageHelper