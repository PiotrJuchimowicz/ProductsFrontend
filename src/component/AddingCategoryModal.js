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

    handleNameChange = event => { this.setState({ name: event.target.value }) }

    onAddingCategory(){
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
   
}

export default AddingCategoryModal;