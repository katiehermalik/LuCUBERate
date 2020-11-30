import { Switch, Route } from 'react-router-dom';
import Landing from '../pages/Landing/Landing';
import Dashboard from '../pages/Dashboard/Dashboard';

function Routes(props) {
  return(
  <Switch>
    <Route exact path='/' component={ Landing }/>
    {props.currentUser &&
    <>
      <Route exact path='/dashboard' component={ Dashboard }/>
      <Route exact path='/dashboard/new' component={ Dashboard }/>
      <Route exact path='/dashboard/select' component={ Dashboard }/>
      <Route path='/dashboard/:id/edit' component={ Dashboard }/>
      <Route path='/dashboard/:id' component={ Dashboard }/>
    </>
    }
  </Switch>
  )
}

export default Routes;