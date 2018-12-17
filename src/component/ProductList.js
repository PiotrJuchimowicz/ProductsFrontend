import React from 'react';
import Header from './Header';
import Button from './Button';
import ProductTable from './ProductTable';
import AddingModal from './AddingModal';
import EditingModal from './EditingModal';
import AddingCategoryModal from './AddingCategoryModal';
import axios from 'axios';

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            showAddingModal: false,
            showEditingModal: false,
            showAddingCategoryModal: false,
            areSortedByPrice: false,
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

    renderCategories(product) {
        let categoriesString = " ";
        let i;
        for (i = 0; i < product.categories.length; i++) {
            categoriesString = categoriesString + product.categories[i].name + ", "
        }
        return categoriesString;
    }

    renderProduct(product) {
        let productWithHtml =
            <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{this.renderCategories(product)}</td>
                <td>{this.renderUpdatingProductButton("Edit", product)}</td>
                <td>{this.renderDeletingProductgButton("Delete", product.id)}</td>
                <td>{this.renderAddingToSummaryButton("+", product)}</td>
                <td>{this.renderAddingCategoryButton("+", product.id)}</td>
            </tr>
        return productWithHtml;
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

    showEditingModal() {
        this.setState({
            showEditingModal: true,
        })
    }

    hideEditingModal() {
        this.setState({
            showEditingModal: false,
        })
        this.getProductsFromServer();
    }

    showAddingCategoryModal() {
        this.setState({
            showAddingCategoryModal: true
        })
    }

    hideAddingCategoryModal() {
        this.setState({
            showAddingCategoryModal: false,
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

    renderUpdatingProductButton(text, product) {
        return (
            <div>
                <EditingModal show={this.state.showEditingModal} handleSubmit={() => this.hideEditingModal()}
                    product={product} />
                <button className="btn btn-info" type="button" onClick={() => this.showEditingModal()} >
                    {text}
                </button>
            </div>
        )
    }

    renderDeletingProductgButton(text, productId) {
        return (
            <Button value={text}
                onClick={() => this.handleDeletingProductButton(productId)} />
        )
    }

    handleDeletingProductButton(productId) {
        console.log("Removing product with id: ", productId);
        axios.delete("http://localhost:8080/products/" + productId)
            .then((response) => {
                console.log(response);
                this.getProductsFromServer();
            })
            .catch((error) => console.error(error))
    }

    renderAddingToSummaryButton(text, productId) {
        return (
            <Button value={text}
                onClick={() => this.handleAddingToSummaryButton(productId)} />
        )
    }

    handleAddingToSummaryButton(product) {
        console.log("Adding to summary product with id: ", product.id);
        axios.put("http://localhost:8080/products", {
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "isInSummary": true
        }).then((response) => {
            console.log(response);
            this.getProductsFromServer();
        })
            .catch((error) => console.error(error))
    }

    renderAddingCategoryButton(text, productId) {
        return (
            <div>
                <AddingCategoryModal show={this.state.showAddingCategoryModal} handleSubmit={() => this.hideAddingCategoryModal()}
                    productId={productId} />
                <button className="btn btn-info" type="button" onClick={() => this.showAddingCategoryModal()} >
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
