import Styles from "./AL1322.module.scss"
import AL1322 from "../../../assets/AL1322.png"
import Status from "../../../components/Status/Status"
import classNames from "classnames/bind"

const css = classNames.bind(Styles)

function IO_AL1322({ O5D150, KI6000, RVP510, UGT524 }) {

    return (
        <div className={css('al_1322')}>
            <div>
                <img src={AL1322} alt="" className={css('pic')} />
            </div>
            <div className={css('container')}>
                <div className={css('o5d150')}>
                    <h1>O5D150</h1>
                    <span className={css('wait')}>{O5D150.value} cm</span>
                </div>
                <div className={css('ogt500')}>
                    <h1>KI6000</h1>
                    <Status name="Status"  status={KI6000.value}/>
                </div>
                <div className={css('rvp510')}>
                    <h1>RVP510</h1>
                    <span>Counter</span>
                    <span className={css('wait')}>{RVP510.value} pulses</span>
                </div>
                <div className={css('rvp510')}>
                    <h1>UGT524</h1>
                    <span>Counter</span>
                    <span className={css('wait')}>{UGT524.value} mm</span>
                </div>
            </div>

        </div>
    )
}

export default IO_AL1322