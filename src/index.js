import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap.min.css';
import EditForm from './edit'



class RecipeBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { recipe: '', ingredients: '', recipes: [], currentDisplay: '', showEditForm: false, activeRecipe: {} };
    }
    handleChange(e) {
        let change = {}
        change[e.target.name] = e.target.value
        this.setState(change);
        console.log('state from edit form:', this.state);

    }

    addNewRecipeObj(e) {
        e.preventDefault();
        var newRecipeObj = { recipe: this.state.recipe, ingredients: this.state.ingredients };
        this.state.recipes.splice(this.state.recipes.length, 0, newRecipeObj)
        this.setState({ recipes: this.state.recipes });
        this.storeRecipes();
        this.clearInputBoxes();
    }

    clearInputBoxes() {
        this.refs.recipe.value = '';
        this.refs.ingredients.value = [];
        this.setState({ recipe: '', ingredients: '' });
    }

    saveUpdate(update) {
        var theUpdate = { recipe: update.recipe, ingredients: update.ingredients };
        var allRecipes = this.state.recipes;
        var index = allRecipes.indexOf(this.state.activeRecipe)
        allRecipes[index] = theUpdate;
        console.log(allRecipes)
        this.setState({ recipes: allRecipes});
        localStorage.setItem("allData", JSON.stringify(allRecipes));
    }

    storeRecipes() {
        localStorage.setItem("allData", JSON.stringify(this.state.recipes));
    }

    componentDidMount() {
        var oldSate = JSON.parse(localStorage.getItem("allData"));
        if (oldSate) {
            this.setState({ recipes: oldSate })

        }
    }

    displayIngredients(index) {
        var currentRecipe = this.state.recipes[index];
        this.setState({ recipe: currentRecipe.recipe, ingredients: currentRecipe.ingredients, activeRecipe: currentRecipe, showEditForm: false });
    }

    deleteRecipe() {
        var recipeActive = this.state.activeRecipe;
        var recipesList = this.state.recipes;
        var newList = recipesList.filter(function (val) { return val !== recipeActive });
        this.setState({ recipes: newList, currentDisplay: '', recipe: '', ingredients: '' });
        localStorage.setItem("allData", JSON.stringify(newList));
    }


    editRecipe(state) {
        this.setState({ showEditForm: true });
    }

    getIngredientsForDisplay() {
        var ingredients = this.state.ingredients.split(',');
        return ingredients.map(e => (<ol>{e}</ol>));

    }


    render() {

        return (
            <div className={'ov-lay'}>
                <div className={'row container z-indx'}>

                    <h1 className={'col-md-12 header  text-color'}>Recipe Box</h1>

                    <form className={'col-md-6 '} id={"form"}>
                        <input className={'col-md-12 marginer'} name={'recipe'} ref={'recipe'} type='text' placeholder={'Please add name here'} onChange={this.handleChange.bind(this)} />
                        <textarea className={'marginer col-md-12 form-control'} name={'ingredients'} ref={'ingredients'} rows={4} cols={50} placeholder={'Please add ingrediants here and separate them by commas....example: tomato,onion,olive oil'} onChange={this.handleChange.bind(this)}></textarea>
                        <button className={'col-md-12 btn btn-success marginer'} onClick={this.addNewRecipeObj.bind(this)}>Add Recipe</button>
                    </form>

                    <div className={'col-md-6 '} id={"btn-panel"} >
                        {this.state.recipes.map(data => (
                            <button className={'col-md-12 btn btn-default marginer'} onClick={() => this.displayIngredients(this.state.recipes.indexOf(data))}>{data.recipe}</button>
                        ))}
                    </div>
                    <h2 className={'col-md-12 header text-color'}>View Recipe</h2>
                    <div className={'col-md-12 container'} id={"display-panel"}>
                        <button className={'col-md-6 btn btn-primary'} onClick={() => this.editRecipe(this.state)}>Edit</button>
                        <button className={'col-md-6 btn btn-danger'} onClick={() => this.deleteRecipe()}>Delete</button>
                        {/* <h2 className={'col-md-12 header text-color'}>{this.state.activeRecipe.recipe}</h2> */}

                        <div>
                            {this.state.showEditForm ? <EditForm save={this.saveUpdate.bind(this)} recipe={this.state.recipe} ingredients={this.state.ingredients} /> : this.getIngredientsForDisplay()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



ReactDOM.render(<RecipeBox />, document.getElementById('root'));

