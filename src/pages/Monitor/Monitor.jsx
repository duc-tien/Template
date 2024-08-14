import Styles from "./Monitor.module.scss"
import HeaderItem from "../../components/HeaderItem/HeaderItem"
import SensorKit from "./SensorKit/SensorKit"
import Digital_Inputs from "./Digital_Inputs/Digital_Inputs"
import Digital_Outputs from "./Digital_Outputs/Digital_Outputs"
import Inverter from "./Inverter/Inverter"
import PLCKit from "./PLCKit/PLCKit"
import hubConnection from "../../services/signalR/hubConnection"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import classNames from "classnames/bind"
import { ToastContainer, toast } from "react-toastify"


const css = classNames.bind(Styles)

function Monitor() {
    
    const [data, setData] = useState({
        tempTW2000: { value: '__' },
        statusIF6123: { value: 'FALSE' },
        distanceUGT524: { value: '__' },
        statusUGT524: { value: 'FALSE' },
        countRB3100: { value: '__' },
        angleRB3100: { value: '__' },
        statusKT5112: { value: 'FALSE' },
        statusO5C500: { value: 'FALSE' },
        ledGreen: { value: 'FALSE' },
        ledRed: { value: 'FALSE' },
        ledYellow: { value: 'FALSE' },
        DCMotor: { value: 'FALSE' },
        setpoint: { value: '__' },
        speed: { value: '__' },
        O5D150: { value: '__' },
        KI6000: { value: 'FALSE' },
        RVP510: { value: '__' },
        UGT524: { value: '__'},
        led1: { value: 'FALSE' },
        led2: { value: 'FALSE' },
        led3: { value: 'FALSE' },
        led4: { value: 'FALSE' },
        led5: { value: 'FALSE' },
        led6: { value: 'FALSE' },
        led7: { value: 'FALSE' },
        led8: { value: 'FALSE' },
        toggle1: { value: 'FALSE' },
        toggle2: { value: 'FALSE' },
        toggle3: { value: 'FALSE' },
        toggle4: { value: 'FALSE' },
        toggle5: { value: 'FALSE' },
        toggle6: { value: 'FALSE' },
        toggle7: { value: 'FALSE' },
        toggle8: { value: 'FALSE' },
        Position_PV: { value: '__' },
        Speed_PV: { value: '__' },
        VFD_Speed_PV: { value: '__' },
        VFD_Speed_SP:{ value: '__' },
        VFD_Status_Forward:{ value: 'FALSE' },
        VFD_Status_Reverse:{ value: 'FALSE' },
        VFD_Run:{ value: 'FALSE' },
    })
    const [dataMotor, setDataMotor] = useState([])
    const [MaxDataMotor, setMaxDataMotor] = useState([])
    useEffect(() => {
        hubConnection.start()
        if (JSON.parse(localStorage.getItem("DataSiemens")) != null){
            setData(JSON.parse(localStorage.getItem("DataSiemens")))
        }
        toast("Connected to websocket server")
    }, [])
    useEffect(() => {
        hubConnection.connection.on('TagChanged', (res) => {
            const obj = JSON.parse(res)
            setData((prevData) => {
                const updateData = { ...prevData, [obj.name]: obj }
                localStorage.setItem("DataSiemens", JSON.stringify(updateData))
                return updateData
            })
            if (obj.name === "VFD_Speed_PV"){
                setDataMotor((prev) => {
                    const listData = [...prev, obj];
                    if (listData.length > 50) {
                      listData.shift();
                    }
                    return listData;
                  })
                setMaxDataMotor((pre) => {
                    const listMax = [...pre, obj.value]
                    return listMax
                })
            }
        })
        return () => {
            hubConnection.connection.off('TagChanged')
        }

    }, [hubConnection.connection])
    let xAxisInterval = Math.round(dataMotor.length / 6);
    let maxValue = Math.max(...MaxDataMotor)
    let minValue = Math.min(...MaxDataMotor)
    return (
        <div className={css('container')}>
            <div>
                <HeaderItem pageName="MONITOR 1" />
            </div>

            <div className={css("container2")}>
            <div className={css('box1')}>
            <Digital_Inputs
                        statusKT5112={data.statusKT5112}
                        statusO5C500={data.statusO5C500}
                    />
                    <SensorKit
                        tempTW2000={data.tempTW2000}
                        statusIF6123={data.statusIF6123}
                        statusUGT524={data.statusUGT524}
                        countRB3100={data.countRB3100}
                        angleRB3100={data.angleRB3100}
                    />

                    <Digital_Outputs
                        ledRed={data.ledRed}
                        ledGreen={data.ledGreen}
                        ledYellow={data.ledYellow}
                        DCMotor={data.DCMotor}
                        distanceUGT524={data.distanceUGT524}
                    />
 

                </div>
                <div className={css('box2')}>
                    <PLCKit
                        led1={data.led1}
                        led2={data.led2}
                        led3={data.led3}
                        led4={data.led4}
                        led5={data.led5}
                        led6={data.led6}
                        led7={data.led7}
                        led8={data.led8}
                        toggle1={data.toggle1}
                        toggle2={data.toggle2}
                        toggle3={data.toggle3}
                        toggle4={data.toggle4}
                        toggle5={data.toggle5}
                        toggle6={data.toggle6}
                        toggle7={data.toggle7}
                        toggle8={data.toggle8}
                        Position_PV={data.Position_PV}
                        Speed_PV={data.Speed_PV}
                    />

                     <Inverter
                        statusMotor={data.VFD_Run}
                        forward={data.VFD_Status_Forward}
                        reverse={data.VFD_Status_Reverse}
                        setpoint={data.VFD_Speed_SP}
                        speed={data.VFD_Speed_PV}
                        dMotor= {dataMotor}
                        maxdMotor = {MaxDataMotor}
                        xInterval = {xAxisInterval}
                        maxv = {maxValue}
                        minv = {minValue}
                    />
                </div>
            </div>
                
            </div>
    )
}

export default Monitor