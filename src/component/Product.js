import React from 'react';
import axios from 'axios';
import Button from './Button';
import EditingModal from './EditingModal';
import AddingCategoryModal from './AddingCategoryModal';

class Product extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id : this.props.product.id,
            name : this.props.product.name,
            price : this.props.product.price,
            categories : this.props.product.categories,
            showAddingCategoryModal: false,
            showEditingModal: false,
        }
    }

    renderCategories() {
        let categories = this.state.categories;
        let categoriesString = " ";
        let i;
        for (i = 0; i < categories.length; i++) {
            categoriesString = categoriesString + categories[i].name + ", "
        }
        return categoriesString;
    } 

    renderAddingCategoryButton(text) {
        return (
            <div>
                <AddingCategoryModal show={this.state.showAddingCategoryModal} handleSubmit={() => this.hideAddingCategoryModal()}
                    productId={this.state.id} />
                <button className="btn btn-info" type="button" onClick={() => this.showAddingCategoryModal()} >
                    {text}
                </button>
            </div>
        )
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
        this.props.refreshData();
    }

    renderDeletingProductgButton(text) {
        return (
            <Button value={text}
                onClick={() => this.handleDeletingProductButton()} />
        )
    }

    handleDeletingProductButton(productId) {
        console.log("Removing product with id: ", this.state.id);
        axios.delete("http://localhost:8080/products/" + this.state.id)
            .then((response) => {
                console.log(response);
                this.props.refreshData();
            })
            .catch((error) => console.error(error))
    }

    renderAddingToSummaryButton(text) {
        return (
            <Button value={text}
                onClick={() => this.handleAddingToSummaryButton()} />
        )
    }

    handleAddingToSummaryButton() {
        console.log("Adding to summary product with id: ", this.state.id);
        axios.put("http://localhost:8080/products", {
            "id": this.state.id,
            "name": this.state.name,
            "price": this.state.price,
            "isInSummary": true
        }).then((response) => {
            console.log(response);
            this.props.refreshData();
        })
            .catch((error) => console.error(error))
    }

    renderUpdatingProductButton(text) {
        return (
            <div>
                <EditingModal show={this.state.showEditingModal} handleSubmit={() => this.hideEditingModal()}
                    productId={this.state.id} productName={this.state.name} productPrice={this.state.price} />
                <button className="btn btn-info" type="button" onClick={() => this.showEditingModal()} >
                    {text}
                </button>
            </div>
        )
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
        this.props.refreshData();
    }

    render(){
        return( 
        <tr key={this.state.id}>
            <td>{this.state.id}</td>
            <td>{this.state.name}</td>
            <td>{this.state.price}</td>
            <td>{this.renderCategories()}</td>
            <td>{this.renderUpdatingProductButton("Edit")}</td>
            <td>{this.renderDeletingProductgButton("Delete")}</td>
            <td>{this.renderAddingToSummaryButton("+")}</td>
            <td>{this.renderAddingCategoryButton("+")}</td>
        </tr>)
    }
}

export default Product;