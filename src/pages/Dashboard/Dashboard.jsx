import { Link } from "react-router-dom"
import Styles from "./Dashboard.module.scss"
import BK_logo from "../../assets/HCMUT_official_logo.png"
import VTS_logo from "../../assets/VTS_logo.jpg"
import auravina_logo from "../../assets/auravina_logo.png"
import classNames from "classnames/bind"
import Vali1 from "../../assets/Vali1.png"
import Vali2 from "../../assets/Vali2.png"
import Vali3 from "../../assets/Vali3.png"
import Vali4 from "../../assets/Vali4.png"
import Vali5 from "../../assets/Vali5.png"
import { useState } from "react"

const css = classNames.bind(Styles)

function Dashboard() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const slides = [
        Vali1,
        Vali2,
        Vali3,
        Vali4,
        Vali5
    ]
    const gotoPrevious = () => {
        const isFirst = currentIndex  === 0
        const newIndex = isFirst ?  (slides.length -1) : (currentIndex -1)
        setCurrentIndex(newIndex)
    }
    const gotoNext = () => {
        const isLast = currentIndex === slides.length-1
        const newIndex = isLast ? 0 : currentIndex+1
        setCurrentIndex(newIndex)
    }

    return (
        <div className={css('container')}>
            <div className={css('sidebar')}>
                <div className={css('logo')}>
                    <img src={auravina_logo} alt="Logo BK" className={css('vts_logo')} />
                    <img src={BK_logo} alt="Logo BK" className={css('bk_logo')} />
                </div>
                <div className={css('menu')}>
                    <div className={css('name')}>
                        <span>DEMO VALI WEB</span>
                    </div>
                    <div className={css('monitor')}>
                        <Link to="/monitor">
                            <span><i className="fa-solid fa-desktop"></i>Monitor 1</span>
                        </Link>
                    </div>
                    <div className={css('monitor')}>
                        <Link to="/monitor2">
                            <span><i className="fa-solid fa-desktop"></i>Monitor 2</span>
                        </Link>
                    </div>
                    <div className={css('monitor')}>
                        <Link to="/monitor3">
                            <span><i className="fa-solid fa-desktop"></i>Monitor 3</span>
                        </Link>
                    </div>
                    <div className={css('reports')}>
                        <Link to="/reports">
                            <span><i className="fa-solid fa-download"></i>Reports</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={css("slideshow")}>
                <div className={css("leftSlide")} onClick={gotoPrevious}><i className="fa-solid fa-angle-right fa-rotate-180"></i></div>
                <img src={slides[currentIndex]} alt="" className={css("picSlide")}/>
                <div className={css("rightSlide")} onClick={gotoNext}><i className="fa-solid fa-angle-right"></i></div>
            </div>
            <div className={css("dotSlide")}>
                {slides.map((slide, slideIndex)=>(
                  <div key={slideIndex} className={css(slideIndex === currentIndex ? "everySlide_active": "everySlide")} onClick={() => gotoSlide(slideIndex)} ><i className="fa-solid fa-circle"></i></div>
                )
                )}
            </div>
        </div>
    )
}

export default Dashboard