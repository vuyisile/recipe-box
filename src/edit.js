import React from 'react';
import './index.css';
import './bootstrap.min.css';


export default class EditForm extends React.Component {
    constructor(props) {
        super(props);
        console.log('props', props)
        this.state = { recipe: props.recipe, ingredients: props.ingredients }
    }

    saveRecipe(e){
        e.preventDefault();
      this.props.save(this.state); 
    }

  

    handleChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
        console.log('state from edit form:',this.state);
    }

    render() {
        return (
            <form className={'col-md-6'} id={"form"}>
                <input name={'recipe'} value={this.state.recipe} type='text' onChange={this.handleChange.bind(this)} />
                <textarea name={'ingredients'} value={this.state.ingredients} rows={4} cols={50} onChange={this.handleChange.bind(this)}></textarea>
                <button className={'btn btn-success'} onClick={this.saveRecipe.bind(this)}>Save Recipe</button>
            </form>
        )


    }
}
