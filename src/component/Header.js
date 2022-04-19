import { Link } from "react-router-dom";

export default function Header () {
    return (
        <div className="header">
            <h3>
                <Link to="/">초기화면</Link>
            </h3>
            <div className="menu">
                <Link to="/input" className="link">
                    크롤링
                </Link>
                <Link to="/selected" className="link">
                    DB검색
                </Link>
                <Link to="/store" className="link">
                    DB저장
                </Link>
            </div>
        </div>
    );
}