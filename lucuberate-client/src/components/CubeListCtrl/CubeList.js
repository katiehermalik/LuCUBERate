import { useContext }from 'react';
import CubeSelect from './CubeSelect';
import CubeContext from '../../context/ContextProvider';

  function CubeList () {
    const { cubeList } = useContext(CubeContext)
    // const [updatedCubeList, setUpdatedCubeList] = useState([])
    // setUpdatedCubeList(cubeList)

  return(
    <>
      {console.log('CubeList is rendering', cubeList)}
      <div className="cube-list container-column cube-select-group">
        {cubeList.cubes?.map((cube, index) => (
          <CubeSelect cubes={cubeList.cubes} cube={cube} key={cube._id} number={index + 1}/>
          ))
        }
      </div>
    </>
  )
}


export default CubeList;