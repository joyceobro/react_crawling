import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';


export default function Crawled () {


    const [checkedList, setCheckedList] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    function handleSubmit (e) {
        e.preventDefault();
        window.myApi.send("crawled-data", checkedList)
        navigate(-1)
    }

    function onCheckedElement (checked, item) {
        if (checked) {
            setCheckedList([...checkedList, item]);
        } else if (!checked) {
            setCheckedList(checkedList.filter(el => el !== item));//?
        }
    };

    return (

        <form onSubmit={handleSubmit}>
            {location.state.data && location.state.data.map((data, index) => (
                <p key={index}>
                    <input type="checkbox" value={data.title} name={data.link}
                        onChange={(e) => {
                            onCheckedElement(e.target.checked, [e.target.value, e.target.name]);
                        }}
                    //checked={checkedList.includes(item.data) ? true : false}
                    />
                    <a href={data.link}>{data.title}</a>
                </p>
            ))}
            <button>저장</button>
        </form>

    )
}