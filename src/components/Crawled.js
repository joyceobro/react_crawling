import { useLocation } from "react-router-dom";
import { useState } from 'react';
export default function Crawled () {

    const [checkedList, setCheckedList] = useState([]);
    const location = useLocation();
    console.log('state', location.state);
    function onSubmit (e) {
        e.preventDefault();
        console.log(checkedList)
    }

    function onCheckedElement (checked, item) {
        if (checked) {
            setCheckedList([...checkedList, item]);
        } else if (!checked) {
            setCheckedList(checkedList.filter(el => el !== item));
        }

    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <table>
                    <tbody>
                        {location.state.data.map(data => (
                            <tr><td>
                                <div>
                                    <input type="checkbox" value={data.title} name={data.link}
                                        onChange={e => {
                                            onCheckedElement(e.target.checked, [e.target.value, e.target.name]);
                                        }}
                                    //checked={checkedList.includes(item.data) ? true : false}
                                    />
                                    <a href={data.link}>{data.title}</a>
                                </div>
                            </td></tr>
                        ))}

                    </tbody>
                </table>
                <button>저장</button>
            </form>
        </>
    )
}