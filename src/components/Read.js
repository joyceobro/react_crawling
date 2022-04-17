
import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
export default function Read () {
    const [data, setData] = useState([]);
    const location = useLocation();
    useEffect(() => {
        window.myApi.send(
            'read-data', location.state.data
        );
    }, []);
    window.myApi.receive('return-data', (data) => {
        setData(data);
        console.log(data)
        window.myApi.removeListeners('return-data');
    });


    return (
        <table>
            <tbody>
                {data.map(data => (
                    <tr><td>
                        <div>
                            <p>{data.select_title}</p>
                        </div>
                    </td></tr>
                ))}

            </tbody>
        </table>
    );
}