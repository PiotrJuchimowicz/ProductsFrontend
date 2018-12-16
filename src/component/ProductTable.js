import React from 'react';

function ProductTable(props) {
    let isSummary = props.isSummary;
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
                    {props.value}
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
                    <th>Add category</th>
                </tr>
                {props.value}
            </thead>
        </table>
    )
    }
}

export default ProductTable;