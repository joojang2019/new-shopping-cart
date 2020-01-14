import React from 'react';
import 'rbx/index.css';
import { Button } from 'rbx';
import './Card.css';



const Card= ({product}) => {
    const imgSrc=`data/products/${product.sku}_2.jpg`;
    return(
        <li className="card-container">
            <img src={imgSrc} alt="" />
            <p>{product.title}</p>
            <p>{`$${product.price}`}</p>
            <Button>Add to Cart</Button>
        </li>
    );
};


export default Card;