import { Switch, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Dashboard from '../pages/Dashboard';
import CubeNew from '../pages/CubeNew';
import CubeEdit from '../pages/CubeEdit';
import CubeShow from '../pages/CubeShow';


export default (
  <Switch>
    <Route exact path='/' component={ Landing }/>
    {localStorage.user &&
    <>
      <Route exact path='/dashboard' component={ Dashboard }/>
      <Route exact path='/dashboard/new' component={ CubeNew }/>
      <Route exact path='/dashboard/index' component={ Dashboard }/>
      <Route path='/dashboard/:id/edit' component={ CubeEdit }/>
      <Route path='/dashboard/:id' component={ CubeShow }/>
    </>
    }
  </Switch>
)

