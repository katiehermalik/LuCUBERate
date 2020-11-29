import { Switch, Route } from 'react-router-dom';
import Landing from '../pages/Landing/Landing';
import Dashboard from '../pages/Dashboard/Dashboard';

export default (
  <Switch>
    <Route exact path='/' component={ Landing }/>
    <Route path='/dashboard' component={ Dashboard }/>
    {/* <Route component={ 404 }/> */}
  </Switch>
)