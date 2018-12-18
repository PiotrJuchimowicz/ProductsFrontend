import React from 'react';
import axios from 'axios';

class AddingCategoryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: " ",
            productId : this.props.productId,
            isFormValid : false
        }
    }

    handleNameChange = event => {
         this.setState({ name: event.target.value });
         this.handleIfFormValid(); 
        }

    handleIfFormValid() {
        if (this.state.name!= " ") {
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
        let show = this.props.show;
        if(typeof show != "boolean"){
            console.error("Wrong property type passed to AddingCategoryModal component");
        }
        return(
            <div id="myModal" className={show ? "modal  display-block" : "modal  display-none"}
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
                            <button type="button" className="btn btn-primary" disabled={!this.state.isFormValid}
                                onClick={this.onAddingCategory.bind(this)}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    } 
}

export default AddingCategoryModal;