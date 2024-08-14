import { Link } from "react-router-dom";
import Styles from "./HeaderItem.module.scss"
import classNames from "classnames/bind"
import { useEffect, useState } from "react";

const css = classNames.bind(Styles)
function HeaderItem({ pageName }) {

    return (
        <div className={css("tittle")}>
            <button className={css("tabbar")} >
                <i className="fa-solid fa-bars"></i>
            <div className={css("listMenu")}>
                <div className={css('monitor')}>
                    <Link to="/">
                        <span><i className="fa-solid fa-desktop"></i>Diagram</span>
                    </Link>
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
            </button>

            <span className={css("namepage")}>
                {pageName}
            </span>
        </div>
    )
}

export default HeaderItem