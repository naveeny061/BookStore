import './App.css';
import Registration from './Component/registration/registration'
import Login from "./Component/login/login";
import DashBoard from "./Component/Dashboard/dashBoard";
import Cart from "./Component/Cart/Cart"
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashBoard" component={DashBoard}/>
          <Route exact path="/cart" component={Cart}/>  
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
