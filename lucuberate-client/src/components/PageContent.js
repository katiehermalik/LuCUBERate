import AllRoutes from '../config/routes';

function PageContent(props) {
  return(
    <div>
      <AllRoutes user={props.user} />
    </div>
  )
}

export default PageContent;