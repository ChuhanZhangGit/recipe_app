import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze-strict';

/* Structure of store data:
 * {
 *   forms: {
 *     search_recipes: {...},
 *   },
 *   users: Map.new(
 *     1 => {id: 1, name: "Alice", email: "alice@example.com"},
 *     ...
 *   ),
 *   recipes: Map.new(
 *     1 => {id: 1, title: "", image_url: "", calories:1, fats:"1gm", carbs:"",
 *           proteins: ""},
 *     ...
 *   ),
 * }
 */

 function login(st0 = {email: "", password: "", errors: null}, action) {
   switch(action.type) {
     case 'CHANGE_LOGIN':
       return Object.assign({}, st0, action.data);
     default:
       return st0;
   }
 }

 function signup(st0 = {name: "", email: "", password: "",
  password_confirmation: "", errors: null}, action) {
   switch(action.type) {
     case 'CHANGE_SIGNUP':
       return Object.assign({}, st0, action.data);
     default:
       return st0;
   }
 }

function search_recipes(st0 = {searchTerm: "", type: "", cuisine: ""}, action) {
  switch (action.type) {
    case 'CHANGE_SEARCH_RECIPE':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

// change later
// Note: It is okay if the supplied userId is not correct. Will pick from session anyways.
function test_get_mealplan_details(st0 = {mealPlanId: ""}, action){
  switch (action.type) {
    case 'CHANGE_GET_MEAL_PLAN':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function test_get_recipe_details(st0 = {recipeId: ""}, action){
  switch (action.type) {
    case 'CHANGE_GET_RECIPE_TEST':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function test_create_new_meal_plan(st0 = {mealPlanName: "", userId: ""}, action){
  switch (action.type) {
    case 'CHANGE_NEW_MEAL_PLAN_NAME':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function test_create_new_day_plan(st0 = {mealPlanName: "", date: "", breakfast: "",
  lunch: "", dinner: "", snack: "", userId: ""}, action){
  switch (action.type) {
    case 'CHANGE_NEW_DAY_PLAN_NAME':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function forms(st0, action) {
  let reducer = combineReducers({
    login,
    signup,
    search_recipes,
    test_get_recipe_details,
    test_create_new_meal_plan,
    test_create_new_day_plan,
    test_get_mealplan_details,
  });
  return reducer(st0, action);
}

let session0 = localStorage.getItem('session');
if (session0) {
  session0 = JSON.parse(session0);
}
function session(st0 = session0, action) {
  switch (action.type) {
    case 'LOG_IN':
      return action.data;
    case 'LOG_OUT':
      return null;
    default:
      return st0;
  }
}

function users(st0 = new Map(), action) {
  return st0;
}

function recipes(st0 = new Map(), action) {
  return st0;
}

function root_reducer(st0, action) {
  console.log("root reducer", st0, action);
  let reducer = combineReducers({
    forms,
    session,
    users,
    recipes,
  });
  return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;
