import React from "react";
import Routes from "../routes/Index";
import { render } from "react-dom";

// export default props => <>{Routes}</>;

const App = (props) => (

        <div>
            <Routes user_id={props.user_id}/>
        </div>
    )

export default App