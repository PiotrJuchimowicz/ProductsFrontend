import React from 'react';
import axios from 'axios';
import ProductTable from './ProductTable'
import Header from './Header';
class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }
    componentDidMount() {
        console.log("Getting products in summary from server")
        this.getProductsInSummaryFromServer();
    }
    getProductsInSummaryFromServer() {
        let productsFromServer;
        let products = [];
        axios.get("http://localhost:8080/products/summary")
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
        let i = 0;
        for (i; i < products.length; i++) {
            let productWithHtml = this.renderProduct(products[i]);
            productsReadyToDisplay.push(productWithHtml);
        }
        return (
            <ProductTable value={productsReadyToDisplay} isSummary={true} />
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
            </tr>
        return productWithHtml;
    }
    renderHeader() {
        return (
            <Header value={"Summary"} />
        );
    }

    calculateTotalCost() {
        let products = this.state.products;
        let totalCost = 0;
        for (let i = 0; i < products.length; i++) {
            totalCost = totalCost + products[i].price;
        }
        return totalCost;
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                <hr className="my-4"></hr>
                <p className="lead">Total cost: {this.calculateTotalCost()}</p>
                {this.renderProductTable()}
            </div>
        )
    }
}

export default Summary;