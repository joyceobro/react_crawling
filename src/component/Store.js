import { useState, useEffect } from "react";

export default function Store () {
    const [data, setData] = useState([]);
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);

    useEffect(() => {
        window.myApi.send(
            'read-all'
        );
    }, []);
    window.myApi.receive('return-all', (data) => {
        setData(data);
        // console.log(data)
        window.myApi.removeListeners('return-all');
    });


    function onClick (e) {
        e.preventDefault();
        let stair = []
        data.forEach((row) => {
            // console.log(row.select_title.slice(1, row.select_title.length - 1));
            stair = [...stair, row.select_title.slice(1, row.select_title.length - 1)]
        });
        let stair_link = []
        data.forEach((row) => {
            console.log(row.select_link.slice(1, row.select_link.length - 1));
            stair_link = [...stair_link, row.select_link.slice(1, row.select_link.length - 1)]
        });
        let super_string = ''
        for (var i = 0; i < stair.length; i++) {
            super_string = super_string + stair[i] + "  " + stair_link[i] + "\n"
        }

        console.log(super_string)
        const buffer = super_string; /* ArrayBuffer 형식의 데이터를 생성하는 함수 */
        const blob = new Blob([buffer],
            { type: 'text/ plain' })
        link.href = URL.createObjectURL(blob);
        link.download = 'file.txt';
        link.click();
    }

    return (
        <form onClick={onClick}>
            <div className="input_area">
                <label>DB저장</label>
            </div>
            <button id="exportFile">저장</button>
        </form>
    )
} 