import React from 'react';


/* function AddingModal(props) {
    let show = props.show;
    const showHideClassName = show ? "modal display-block" : "modal display-none";
   
        } */

class AddingModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit= this.props.handleSubmit.bind(this);//TODO
        this.state = {
            name: ' ',
            price : 0
        }
    }
    onSubmitForm() {
      this.handleSubmit();
    }

    render(){
        return (
            <div id="myModal" className={this.props.show ? "modal display-block" : "modal display-none"} role="dialog">
                <section className="modal-main">
                    <form className="form-inline" action="#">
                        <div className="form-group">
                            <label htmlFor="name"> name:</label>
                            <input id="nameInput" type="text" className="form-control" id="name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">price:</label>
                            <input id="priceInput" type="number" className="form-control" id="price"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">category:</label>
                            <input type="text" className="form-control" id="category"/>
                        </div>
                        <button onClick={this.onSubmitForm}>Submit</button>
                    </form>
                </section>
            </div>
                );
    }

}

export default AddingModal;