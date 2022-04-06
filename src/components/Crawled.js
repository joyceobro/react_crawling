import { useLocation } from "react-router-dom";

export default function Crawled () {

    const location = useLocation();
    console.log('state', location.state);

    return (
        <>
            <table>
                <tbody>
                    {location.state.data.map(data => (
                        <tr><td>
                            <div>
                                <input type="checkbox" value="{data.title}" name="{data.link}" />
                                <a href={data.link}>{data.title}</a>
                            </div>
                        </td></tr>
                    ))}

                </tbody>
            </table>
        </>
    )
}