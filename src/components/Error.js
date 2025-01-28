
import { useRouteError } from "react-router-dom";

const Error=()=>{
    const err = useRouteError();
    console.log(err)
    return(
        <div>
            <h2>OOps!!!  {err.status + " " + err.statusText}!</h2>
            <h3>Something went wrong!</h3>
            {/* <h3>Error: {err.error.message} </h3> */}
        </div>
    )
}
export default Error;