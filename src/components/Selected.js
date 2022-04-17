import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Selected () {

    const navigate = useNavigate();
    const searchRef = useRef(null);
    function handleSubmit (e) {
        e.preventDefault();
        navigate('/read', {
            state: {
                data: searchRef.current.value,
            },
        });
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="input_area">
                <label>검색어입력</label>
                <input type="text" placeholder="검색어를 입력하세요" ref={searchRef} />
            </div>
            <button>저장</button>
        </form>
    )
}
