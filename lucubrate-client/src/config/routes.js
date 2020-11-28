import { Switch, Route } from 'react-router-dom';
import Landing from '../pages/Landing';

export default (
  <Switch>
    <Route exact path='/' component={ Landing }/>
  </Switch>
)