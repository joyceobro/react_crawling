import { useRef } from "react";
import { useNavigate } from "react-router-dom";
const cheerio = require("cheerio"); //크롤링
const axios = require("axios"); //외부에서 정보를 가져올 때
const iconv = require("iconv-lite"); //한글 깨질 때


export default function InputDate () {

    const dayRef = useRef(null);
    const url_a = "naver/search.naver?&where=news&query="
    const url_b = encodeURI("일") + "&sm=tab_pge&sort=0&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so:r,p:all,a:all&mynews=0&cluster_rank=23&start="
    const url_c = "&refresh_start=0"
    const navigate = useNavigate();
    function onSubmit (e) {
        e.preventDefault();
        console.log(dayRef.current.value)
        console.log(url_a + dayRef.current.value + url_b + url_c)
        // try {
        //     axios({ url: url_a + dayRef.current.value + url_b + url_c, method: "GET", responseType: "arraybuffer" }, {
        //         withCredentials: true // 쿠키 cors 통신 설정
        //     }).then(function (html) {
        //         const content = iconv.decode(html.data, 'utf-8').toString() //한글깨짐 방지
        //         const $ = cheerio.load(content)
        //         const table = $(".news_tit")  //리스트로 담음
        //         const result = [];
        //         table.each(function (i, element) {
        //             const title = $(element).text();
        //             const link = $(element).attr('href');
        //             console.log(title);
        //         })
        //     })
        // } catch (err) {
        //     console.log(err);
        // }

        const getHTML = async (url) => {
            try {
                return await axios({ url: url, method: "GET", responseType: "arraybuffer" })
            } catch (err) {
                console.log(err);
            }
        }

        const parsing = async (url) => {
            try {
                const html = await getHTML(url);
                const content = iconv.decode(html.data, 'utf-8').toString() //한글깨짐 방지
                const $ = cheerio.load(content)
                const table = $(".news_tit")  //리스트로 담음
                let result = [];
                table.each(function (i, element) {
                    var data = new Object();
                    data.title = $(element).text();
                    data.link = $(element).attr('href');
                    result.push(data);
                }) //리스트 안에서 반복문
                //            console.log(result)
                return result;
            } catch (err) {
                console.log(err);

            }
        }

        (async () => {
            let url_list = [];
            for (let j = 0; j <= 9; j++) { url_list.push(url_a + dayRef.current.value + url_b + String(1 + 10 * j) + url_c) };
            // console.log(url_list[0])
            let viewing_list = [];
            const viewing = async () => {
                for (let i = 0; i < url_list.length; i++) {
                    //     console.log(url_list[i]);
                    let viewing_item = await parsing(url_list[i]);
                    //  console.log(viewing_item);
                    viewing_list = viewing_list.concat(viewing_item)
                    console.log(viewing_list);

                }
                return viewing_list
            }
            let final_list = await viewing();
            console.log(final_list)
            navigate('/crawled', {
                state: {
                    data: final_list,
                },
            });
            //res.render('crawl_return', { data: final_list });
        })();
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="input_area">
                <label>날짜입력</label>
                <input type="text" placeholder="날짜를입력하세요" ref={dayRef} />
            </div>
            <button>저장</button>
        </form>
    )
} 