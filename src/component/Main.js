import React from 'react';
import ProductList from './ProductList';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
        }
    }

    changePage(pageNumber) {
        this.setState({ pageNumber: pageNumber });
    }

    render() {
        console.log("On page: ",this.state.pageNumber);
        if(this.state.pageNumber===1){
        return(
            <ProductList value={this.state.pageNumber}/>
        )
        }
        if(this.state.pageNumber===2){
            //TODO
        }

    }
}

export default Main;