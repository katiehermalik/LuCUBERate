import React from 'react';
import CubeList from './CubeList';
import { Link } from 'react-router-dom';

function Dashboard() {

  return(
    <>
      <h4>Cube List Nav</h4>
      <Link to='/dashboard/new'>
        <input
        type="button"
        value="New Cube" />
      </Link>
      <CubeList />
    </>
  )
}

export default Dashboard;