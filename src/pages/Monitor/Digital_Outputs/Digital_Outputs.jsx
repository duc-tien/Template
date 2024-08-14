import Styles from "./Digital_Outputs.module.scss"
import Digital_Output from "../../../assets/al2330.png"
import Status from "../../../components/Status/Status"
import Indicator from "../../../components/Status/Indicator"
import DCmotor from "../../../assets/DC Motor.png"
import UGT524 from "../../../assets/UGT524.png"
import classNames from "classnames/bind"


const css = classNames.bind(Styles)

function Digital_Outputs({ ledRed, ledYellow, ledGreen, DCMotor, distanceUGT524 }) {
    const ticks = ['-0', -10, -20, -30, -40, -50, -60, -70, -80, -90, -100];
    const valueDistanceUGT524 = document.getElementById('valueUGT524')
    const changeDistanceUGT524 = (res) => {
        if(valueDistanceUGT524 != null){
            valueDistanceUGT524.style.left = Number(res) + '%'
        }
    }

    return (
        <div className={css('digital_outputs')}>
            <img src={DCmotor} alt="" className={css('output')} />
            <img src={UGT524} alt="" className={css('UGT524')} />

            <div className={css('lights')}>
                <div className={css('button')}>
                    <Indicator name="" status={ledGreen.value} color={'GREEN'} />
                    <Indicator name="" status={ledYellow.value} color={'YELLOW'} />
                    <Indicator name="" status={ledRed.value} color={'RED'} />
                </div>

            </div>
            <div className={css('motor')}>
                <Status name="" status={DCMotor.value} />
            </div>
            <div className={css("distanceUGT524")}>
                <h2>UGT524</h2>
                <div>
                    <span className={css("name")}>Distance </span>
                    <span className={css("value")}>{distanceUGT524.value} mm</span>
                </div>
            </div>
            <div className={css("containerUGT524")}>
                <div className={css("sliderUGT524")}></div>
                <div id="valueUGT524" className={css("valueUGT524")}></div>
                {distanceUGT524 ? changeDistanceUGT524(Number(distanceUGT524.value)) : ''}
            </div>
            <div className={css("ruler_plc")}>
                            {ticks.map((res)=> <span key={res}>{res}</span>)}
                        </div>
        </div>
    )
}

export default Digital_Outputs