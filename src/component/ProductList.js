import React from 'react';
import Header from './Header';
import Button from './Button';
import ProductTable from './ProductTable';
import AddingModal from './AddingModal';
import axios from 'axios';
import ReactDOM from 'react-dom';

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            showModal: false
        }
    }

    componentDidMount() {
        this.getProductsFromServer();
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

    getProductsFromServer() {
        let productsFromServer;
        let products = [];
        axios.get("http://localhost:8080/products")
            .then((response) => {
                console.log(response.data);
                productsFromServer = response.data;
                let i;
                for (i = 0; i < productsFromServer.length; i++) {
                    console.log("Adding product to  products array from state: ");
                    console.log(productsFromServer[i]);
                    let categories = productsFromServer[i].categories;
                    let categoriesArray = [];
                    let j;
                    for (j = 0; j < categories.length; j++) {
                        categoriesArray.push(categories[i])
                    }
                    console.log("Product categories: ", categoriesArray);
                    let product = {
                        "id": productsFromServer[i].id,
                        "name": productsFromServer[i].name,
                        "price": productsFromServer[i].price,

                    }
                    products.push(product)
                }
                console.log(products);
                this.setState({
                    products: products,
                });
            })
            .catch((error) => console.log(error))
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
            <tr key={product.id}>
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

    hideModal() {
        this.setState({
            showModal: false,
        })
        this.getProductsFromServer();
    }
    
    renderAddingButton(text) {
        return (
            <div>
                <AddingModal show={this.state.showModal} handleSubmit={() => this.hideModal()}
                />
                <button className="btn btn-primary" type="button" onClick={() => this.showModal()}>
                    {text}
                </button>
            </div>
        )
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
