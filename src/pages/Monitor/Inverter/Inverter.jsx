import Styles from "./Inverter.module.scss"
import Status from "../../../components/Status/Status"
import classNames from "classnames/bind"
import hubConnection from "../../../services/signalR/hubConnection"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Indicator from "../../../components/Status/Indicator"
import picInverter from "../../../assets/Inverter.png"
import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';


const css = classNames.bind(Styles)

function Inverter({ statusMotor, forward, reverse, setpoint, speed, dMotor, maxdMotor, xInterval,maxv, minv }) {

    
    const handInput = () => {
        const dataInput = document.getElementById('changeData')
        if (dataInput.value > 0 & dataInput.value < 1350){
            hubConnection.connection.invoke("SEND",
            JSON.stringify([{
                "id": "PLC.Inverter.VFD_Speed_SP",
                "v": dataInput.value,
            }])
        )
        toast("Completed")
        }
        else{toast("The value must be between 0 and 1300RPM. Please enter again.")}
    }

    const sendData = (id, value) => {
        hubConnection.connection.invoke("SEND",
            JSON.stringify([{
                "id": "PLC.Inverter.VFD_" + `${id}`,
                "v": `${value}`,
            }])
        )
    }

    const handleStart = () => {
        sendData("Start", 1)
        setTimeout(() => {
            sendData("Start", 0)
            toast("Completed")
        }, 200);

    }
    const handleStop = () => {
        sendData("Stop", 1)
        setTimeout(() => {
            sendData("Stop", 0)
            toast("Completed")
        }, 200);

    }
    const handleForward = () => {
        sendData("Forward", 1)
        setTimeout(() => {
            sendData("Forward", 0)
            toast("Completed")
        }, 200);
    }
    const handleReverse = () => {
        sendData("Reverse", 1)
        setTimeout(() => {
            sendData("Reverse", 0)
            toast("Completed")
        }, 200);
    }
    const handleReset = () => {
        sendData("Reset", 1)
        setTimeout(() => {
            sendData("Reset", 0)
            toast("Reset Completed")
        }, 200);
    }
    return (
        <div className={css('inverter')}>
            <ToastContainer />
            <h1>Inverter</h1>

            <div className={css('status')}>
                <h2>Motor Status</h2>

                <div className={css('stbutton')}>
                    <button className={css('buttonHandle')} onClick={handleStart}>Start</button>
                    <button className={css('buttonHandle')} onClick={handleStop}>Stop</button>
                    <button className={css('buttonHandle')} onClick={handleForward}>Forward</button>
                    <button className={css('buttonHandle')} onClick={handleReverse}>Reverse</button>
                </div>
                <div className={css('button2')}>
                    <Indicator name="Active" status={"TRUE"} color={ statusMotor.value === "TRUE" ? "GREEN" : "RED"} />
                    <Indicator name="Forward" status={forward.value} color={"GREEN"} />
                    <Indicator name="Reverse" status={reverse.value} color={"GREEN"} />
                    <Indicator name="Error" status={"FALSE"} color={"RED"} />
                </div>

            </div>
            <img src={picInverter} alt="" className={css("picInverter")}/>
            <div className={css('motor')}>
                <h2>Motor</h2>
                <div className={css('content')}>
                    <div>
                        <span>Read SetPoint </span> 
                        <span className={css('wait')}>{setpoint.value}  RPM</span>
                    </div>
                </div>
                <div className={css("speed")}>
                    <span>Write SetPoint</span>
                        <input id="changeData" type="text" className={css('wait')} />
                        <button className={css('buttonInput')} onClick={handInput}>CONFIRM</button>
                </div>
            </div>
            <div className={css('chart')}>
                        <LineChart width={450} height={320} data={dMotor}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="timestamp" interval={xInterval} />
                            <YAxis domain={[minv, maxv]} label={{ value: 'Speed(RPM)', angle: -90, position: 'insideLeft' }}/>
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" name={false} stroke="#000000" dot={false} legendType="none" />
                        </LineChart>
                    </div>
        </div>
    )
}

export default Inverter