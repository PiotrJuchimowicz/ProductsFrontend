import React from 'react';
import axios from 'axios';

class EditingModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.productId,
            name: this.props.productName,
            price: this.props.productPrice,
            isFormValid: true
        }
    }
    onEditingProduct() {
        console.log("Editing product with id: ", this.state.id)
        console.log("New products properties: ")
        console.log("Name: ", this.state.name)
        console.log("Price: ", this.state.price)
        axios.put("http://localhost:8080/products", {
            "id": this.state.id,
            "name": this.state.name,
            "price": this.state.price
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

    handleIfFormValid() {
        if (this.state.price >= 0 && this.state.name!=" ")  {
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

    isEmpty(str) {
        return (!str || 0 === str.length);
    }

    render() {
        let show = this.props.show;
        if (typeof show != "boolean") {
            console.error("Wrong property type passed to EditingModal component");
        }
        return (
            <div id="myEditingModal" className={show ? "modal  display-block" : "modal  display-none"}
                role="dialog" >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="name" placeholder="Enter name"
                                        name="name" required value={this.state.name} onChange={this.handleNameChange}></input>
                                </div>
                                <div className="form-group">
                                    <input type="number" className="form-control" id="price" placeholder="Enter price"
                                        name="price" required value={this.state.price} onChange={this.handlePriceChange}></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default"
                                data-dismiss="modal" onClick={this.onCloseModal.bind(this)}>Close</button>
                            <button type="button" className="btn btn-primary" disabled={!this.state.isFormValid}
                                onClick={this.onEditingProduct.bind(this)}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditingModal;
