import { useLocation } from "react-router-dom";

export default function Crawled () {

    const location = useLocation();
    console.log('state', location.state);

    //return ()
}