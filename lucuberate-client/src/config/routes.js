import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Landing from '../pages/Landing';
import Dashboard from '../pages/Dashboard';
import CubeNew from '../pages/CubeNew';
import CubeEdit from '../pages/CubeEdit';
import CubeShow from '../pages/CubeShow';


class AllRoutes extends React.Component {
  render() {
    return(
      <Switch>
        <Route exact path='/' component={ Landing }/>
        {this.props.user &&
        <>
          <Route exact path='/dashboard' component={ Dashboard }/>
          <Route exact path='/dashboard/new' component={ CubeNew }/>
          <Route exact path='/dashboard/index' component={ Dashboard }/>
          <Route exact path='/dashboard/:id/edit' component={ CubeEdit }/>
          <Route exact path='/dashboard/:id' component={ CubeShow }/>
        </>
        }
      </Switch>
    );
  }
}


export default AllRoutes;