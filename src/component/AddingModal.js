import React from 'react';
import axios from 'axios';

class AddingModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: " ",
            price: 0,
            categoryName: " ",
            isFormValid: false
        }
    }

    onAddingProduct() {
        let name = this.state.name;
        let price = this.state.price;
        let categoryName = this.state.categoryName
        console.log("Adding new product")
        console.log("Sending POST on http://localhost:8080/products with fields: ");
        console.log("name: ", name);
        console.log("price: ", price);
        console.log("category: ", categoryName)
        axios.post("http://localhost:8080/products", {
            "name": name,
            "price": price,
            "categories": [{ name: categoryName },]
        })
            .then((response) => {
                console.log(response);
                this.props.handleSubmit();
            })
            .catch((error) => console.error(error))
    }
    onCloseModal() {
        this.props.handleSubmit()
    }

    handleNameChange = event => {
        this.setState({ name: event.target.value });
        this.handleIfFormValid();
    }

    handlePriceChange = event => {
        this.setState({ price: event.target.value });
        this.handleIfFormValid();
    }
    handleCategoryChange = event => {
        this.setState({ categoryName: event.target.value });
        this.handleIfFormValid();
    }

    handleIfFormValid() {
        if (this.state.price >= 0 && this.state.name.trim() != 0 && this.state.categoryName.trim() != 0) {
            console.log("Form is valid")
            this.setState({
                isFormValid: true
            })
        }
        else {
            console.log("Form is not valid")
            this.setState({
                isFormValid: false
            })
        }
    }

    render() {
        let show = this.props.show;
        if (typeof show != "boolean") {
            console.error("Wrong property type passed to AddingModal component");
        }
        return (
            <div id="myModal" className={show ? "modal  display-block" : "modal  display-none"}
                role="dialog" >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel">Add product</h4>
                        </div>

                        <div className="modal-body">
                            <form name="add-product">
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" className="form-control" id="name" placeholder="Enter name"
                                        name="name" required value={this.state.name} onChange={this.handleNameChange}></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Price:</label>
                                    <input type="number" className="form-control" id="price" placeholder="Enter price"
                                        name="price" required value={this.state.price} onChange={this.handlePriceChange}></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category">Category:</label>
                                    <input type="text" className="form-control" id="category" placeholder="Enter category"
                                        name="category" required value={this.state.categoryName} onChange={this.handleCategoryChange}></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default"
                                data-dismiss="modal" onClick={this.onCloseModal.bind(this)}>Close</button>
                            <button type="button" disabled={!this.state.isFormValid} className="btn btn-primary"
                                onClick={this.onAddingProduct.bind(this)}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default AddingModal;