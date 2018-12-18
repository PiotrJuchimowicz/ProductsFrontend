import React from 'react';

function ProductTable(props) {
    let isSummary = props.isSummary;
    let products = props.value;
    if(typeof isSummary != "boolean" || !Array.isArray(products)){
        console.error("Wrong property type passed to ProductTable component");
    }
    if(isSummary){
        return (
            <table if="productsTable" className="table table-dark" cellSpacing="0" width="100%">
                <thead>
                    <tr className="thead-dark">
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Categories</th>
                    </tr>
                    {products}
                </thead>
            </table>
        )
    }
    else {
    return (
        <table if="productsTable" className="table table-dark" cellSpacing="0" width="100%">
            <thead>
                <tr className="thead-dark">
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Categories</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Add to summary</th>
                    <th>Remove from summary</th>
                    <th>Add category</th>
                </tr>
                {products}
            </thead>
        </table>
    )
    }
}

export default ProductTable;