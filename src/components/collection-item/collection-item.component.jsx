import React from 'react';
import {connect} from "react-redux";

import {addItem} from "../../redux/cart/cart.actions"

import CustomButton from "../custom-button/custom-button.component";

import './collection-item.styles.css';

class CollectionItem extends React.Component { 
    render()
    {
        const {item, addItem} = this.props;
        const {name, price, imageUrl} = item;
        return(
            <div className="collection-item">
                <div
                className="image"
                style={{
                    backgroundImage: `url(${imageUrl})`

                }}>
                </div>
                <div className="collection-footer">
                    <span className="name">{ name }</span>
                    <span className="price">Rs.{price}</span>
                </div>
                <CustomButton onClick={()=> addItem(item)} inverted>Add To Cart</CustomButton>

            </div>

        );
    }
}

const mapDispatchToProps = dispatch => ({
    addItem : item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);