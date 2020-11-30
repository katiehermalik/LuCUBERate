import { Switch, Route } from 'react-router-dom';
import Landing from '../pages/Landing/Landing';
import Dashboard from '../pages/Dashboard/Dashboard';

function Routes(props) {
  return(
  <Switch>
    <Route exact path='/' component={ Landing }/>
    {props.currentUser &&
    <Route path='/dashboard' component={ Dashboard }/>
    }
  </Switch>
  )
}

export default Routes;