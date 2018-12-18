import React from 'react';
import Header from './Header';
import Button from './Button';
import ProductTable from './ProductTable';
import AddingModal from './AddingModal';
import axios from 'axios';
import Product from './Product';

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            showAddingModal: false,
            areSortedByPrice: false,
        }
    }

    componentDidMount() {
        this.getProductsFromServer();
    }

    renderHeader() {
        return (
            <Header value={"Shopping List"} />
        );
    }

    getProductsFromServer() {
        let productsFromServer;
        let products = [];
        axios.get("http://localhost:8080/products")
            .then((response) => {
                productsFromServer = response.data;
                let i;
                for (i = 0; i < productsFromServer.length; i++) {
                    let categories = productsFromServer[i].categories;
                    let categoriesArray = [];
                    let j;
                    for (j = 0; j < categories.length; j++) {
                        let category = {
                            "id": categories[j].id,
                            "name": categories[j].name
                        }
                        categoriesArray.push(category)
                    }
                    let product = {
                        "id": productsFromServer[i].id,
                        "name": productsFromServer[i].name,
                        "price": productsFromServer[i].price,
                        "isInSummary": productsFromServer[i].isInSummary,
                        "categories": categoriesArray
                    }
                    products.push(product) 
                }
                this.setState({
                    products: [],
                });

                this.setState({
                    products: products,
                });
            })
            .catch((error) => console.log(error))
    }

    renderProductTable() {
        let productsReadyToDisplay = [];
        let products = this.state.products;
        let areSortedByPrice = this.state.areSortedByPrice;
        if (areSortedByPrice) {
            products.sort(
                function (a, b) {
                    return a.price - b.price
                }
            )
        }
        let i = 0;
        for (i; i < products.length; i++) {
            let productWithHtml = this.renderProduct(products[i]);
            productsReadyToDisplay.push(productWithHtml);
        }
        console.log("Displaying number of products:", productsReadyToDisplay.length);
        return (
            <ProductTable value={productsReadyToDisplay} isSummary={false} />
        );
    }

    renderProduct(product) {
        return <Product product={product} key={product.id} refreshData={() => this.getProductsFromServer()}/>;
    }

    showAddingModal() {
        this.setState({
            showAddingModal: true,
        })
    }

    hideAddingModal() {
        this.setState({
            showAddingModal: false,
        })
        this.getProductsFromServer();
    }

    hideEditingModal() {
        this.setState({
            showEditingModal: false,
        })
        this.getProductsFromServer();
    } 

    renderAddingProductButton(text) {
        return (
            <div>
                <AddingModal show={this.state.showAddingModal} handleSubmit={() => this.hideAddingModal()}
                />
                <button className="btn btn-primary" type="button" onClick={() => this.showAddingModal()}>
                    {text}
                </button>
            </div>
        )
    }

    renderSortingButton(text) {
        return (
            <Button value={text} onClick={() => this.handleSortingButton()} />
        )
    }

    handleSortingButton() {
        this.setState({
            areSortedByPrice: true,
        })
    }

    render() {
        return (
            <div className="container">
                {this.renderHeader()}
                <div className="btn-group" role="group" aria-label="Basic example">
                    {this.renderAddingProductButton("Add product")}
                    {this.renderSortingButton("Sort by price")}
                </div>
                <hr></hr>
                {this.renderProductTable()}
            </div>
        );
    }
}

export default ProductList;
