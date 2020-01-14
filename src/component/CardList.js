import React from 'react';
import './Card.css';
import Card from './Card';

const CardList = ({products}) =>{
    return(
        <div className="card-list">
            {products.map(product => (
                <Card product={product}/>
             ))}
        </div>
        
    );
}

export default CardList;