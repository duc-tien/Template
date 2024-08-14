import Styles from "./SensorKit.module.scss"
import IO_Input from "../../../assets/IO-Link Inputs.png"
import Status from "../../../components/Status/Status"
import TW2000 from "../../../assets/TW2000.png"
import RB3100 from "../../../assets/RB3100.png"
import IF6123 from "../../../assets/IF6123.png"
import classNames from "classnames/bind"

const css = classNames.bind(Styles)

function SensorKit({tempTW2000, statusIF6123, countRB3100, angleRB3100}) {

    return (
        <div className={css('sensorKit')}>
            <img src={TW2000} alt="IO-Link Inputs" className={css('TW2000')} />
            <img src={RB3100} alt="IO-Link Inputs" className={css('RB3100')} />
            <img src={IF6123} alt="IO-Link Inputs" className={css('IF6123')} />

            <div className={css('valuetw2000')}>
                <h2>TW2000</h2>
                <span>Temperature  </span> 
                <span className={css('wait')}> {tempTW2000.value} °C</span>
            </div>
            <div className={css('valueif6123')}>
                <h2>IF6123</h2>
                <Status name="" status={statusIF6123.value} />
            </div>
            
            <div className={css('valuerb3100')}>
                <h2>RB3100</h2>
                <div className={css("flexct")}>
                <span>Pulse count</span>
                <span className={css('wait')}>{countRB3100.value}</span>
                </div>
                <div className={css("flexct")}>
                <span>Position</span>
                <span className={css('wait')}>{Number(angleRB3100.value).toFixed(2)}</span>
                </div>

            </div>

        </div>
    )
}

export default SensorKit