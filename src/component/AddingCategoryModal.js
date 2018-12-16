import React from 'react';
import axios from 'axios';

class AddingCategoryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: " ",
            productId : this.props.productId,
        }
    }

    onEditingProduct(){
        console.log("Editing product")
    }

    handleNameChange = event => { this.setState({ name: event.target.value }) }

    onAddingCategory(){
        console.log(this.state.productId)
        let name = this.state.name;
        let productId = this.state.productId;
        console.log("Adding new category for product with id: ",productId)
        console.log("Sending POST on http://localhost:8080/products/addCategory/"+productId +" with fields: ");
        console.log("name: ", name);
        axios.post("http://localhost:8080/products/addCategory/"+ productId, {
            "name": name,
        })
            .then((response) => {
                console.log(response);
                this.props.handleSubmit();
            })
            .catch((error) => console.error(error))
    }

    onCloseModal(){
        this.props.handleSubmit();
    }

    render(){
        return(
            <div id="myModal" className={this.props.show ? "modal  display-block" : "modal  display-none"}
                role="dialog" >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="name" placeholder="Enter category name"
                                        name="name" required  onChange={this.handleNameChange}></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default"
                                data-dismiss="modal" onClick={this.onCloseModal.bind(this)}>Close</button>
                            <button type="button" className="btn btn-primary"
                                onClick={this.onAddingCategory.bind(this)}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
   /*  onAddingProduct() {
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

    handleNameChange = event => { this.setState({ name: event.target.value }) }
    handlePriceChange = event => { this.setState({ price: event.target.value }) }
    handleCategoryChange = event => { this.setState({ categoryName: event.target.value }) }

    render() {
        return (
            <div id="myModal" className={this.props.show ? "modal  display-block" : "modal  display-none"}
                role="dialog" >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    
                        <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel">Add product</h4>
                        </div>
                       
                        <div className="modal-body">
                            <form>
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
                            <button type="button" className="btn btn-primary"
                                onClick={this.onAddingProduct.bind(this)}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    } */

}

export default AddingCategoryModal;