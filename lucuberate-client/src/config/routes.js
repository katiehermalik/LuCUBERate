import { Switch, Route } from 'react-router-dom';
import Landing from '../pages/Landing/Landing';
import Home from '../pages/Home/Home';

export default (
  <Switch>
    <Route exact path='/' component={ Landing }/>
    <Route path='/:username' component={ Home }/>
    {/* <Route component={ 404 }/> */}
  </Switch>
)