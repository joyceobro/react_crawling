import { useLocation } from "react-router-dom";

export default function Selected () {

    const location = useLocation();
    return (

        <table>
            <tbody>
                <div>
                    {location.state.data.map(data => (
                        <p>{data.link}  {data.title}</p>
                    ))
                    }
                </div>
            </tbody>
        </table>
    )
}