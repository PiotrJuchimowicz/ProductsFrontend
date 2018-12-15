import React from 'react';
import Header from './Header';
import Button from './Button';
import ProductTable from './ProductTable';
import AddingModal from './AddingModal';
import axios from 'axios';

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        /* this.state = {
            products: [],
        }; */
        //for testing
        this.state = {
            products: this.getProductsForTesting(),
            showModal: false
        }
    }

    //method only for testing
    getProductsForTesting() {
        let productOne = {
            id: 1,
            name: "firstProduct",
            price: 100,
            categories: ["A", "B"]
        };
        let productTwo = {
            id: 2,
            name: "secondProduct",
            price: 200,
            categories: ["C", "D"]
        };
        let productThree = {
            id: 3,
            name: "thirdProduct",
            price: 300,
            categories: ["E", "F"]
        };
        let productFour = {
            id: 4,
            name: "fourthProduct",
            price: 400,
            categories: ["G", "H"]
        }
        let products = [];
        products.push(productOne);
        products.push(productTwo);
        products.push(productThree);
        products.push(productFour);
        return products;
    }
    addProduct(product) {
        console.log("Adding product: ", product);
        let products = this.state.products;
        products.push(product);
        this.setState({
            products: products,
        });
    }

    removeProduct(product) {
        console.log("Removing product: ", product);
        let products = this.state.products;
        let index = products.indexOf(product);
        products.splice(index, 1);
        this.setState({
            products: products,
        })
    }

    findProductById(productId) {
        console.log("Finding product with id: ", productId);
        let products = this.state.products;
        let i;
        for (i = 0; i < products.length; i++) {
            let product = products[i];
            if (product.id === productId) {
                console.log("Found: ", product);
                return product;
            }
        }
    }

    renderHeader() {
        return (
            <Header value={"Shopping List"} />
        );
    }

    renderProductTable() {
        let productsReadyToDisplay = [];
        let products = this.state.products;
        let i = 0;
        for (i; i < products.length; i++) {
            let productWithHtml = this.renderProduct(products[i]);
            productsReadyToDisplay.push(productWithHtml);
        }
        console.log("Displaying number of products:", productsReadyToDisplay.length);
        return (
            <ProductTable value={productsReadyToDisplay} />
        );
    }

    renderProduct(product) {
        let productWithHtml =
            <tr>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.categories}</td>
                <td>{this.renderUpdatingProductButton("Edit")}</td>
                <td>{this.renderDeletinProductgButton("Delete")}</td>
                <td>{this.renderAddingToSummaryButton("+")}</td>
                <td>{this.renderAddingCategoryButton("+")}</td>
            </tr>
        return productWithHtml;
    }

    showModal() {
        this.setState({
            showModal: true,
        })
    }

    hideModalAndSendPost(name,price) {
        console.log("Sending POST with product");
        this.setState({
            showModal: false,
        })
    }
    renderAddingButton(text) {
        return (
            <div>
                <AddingModal show={this.state.showModal} handleSubmit={() => this.hideModalAndSendPost()} 
                />
                <button type="button" onClick={() => this.showModal()}>
                    {text}
                </button>
            </div>
        )
    }

    //to remove
    handleAddingProductByButton() {
        //later http request here
        //but now:
        let productFromButton = {
            id: 5,
            name: "productFromButton",
            price: 500,
            categories: ["I", "J"]
        }
        this.addProduct(productFromButton);
    }

    renderDeletinProductgButton(text) {
        return (
            <Button value={text}
                onClick={() => this.handleDeletingProductButton()} />
        )
    }

    handleDeletingProductButton() {
        //TODO
    }

    renderUpdatingProductButton(text) {
        return (
            <Button value={text}
                onClick={() => this.handleUpdatingProductButton()} />
        )
    }

    handleUpdatingProductButton() {
        //TODO
    }

    renderAddingToSummaryButton(text) {
        return (
            <Button value={text}
                onClick={() => this.showModal()} />
        )
    }

    handleAddingToSummaryButton() {
        //TODO
    }

    renderAddingCategoryButton(text) {
        return (
            <Button value={text}
                onClick={() => this.handleAddingCategoryButton()} />
        )
    }

    handleAddingCategoryButton() {
        //TODO
    }

    render() {
        return (
            <div className="container">
                {this.renderHeader()}
                {this.renderAddingButton("Add product")}
                <hr></hr>
                {this.renderProductTable()}
            </div>
        );
    }
}

export default ProductList;
