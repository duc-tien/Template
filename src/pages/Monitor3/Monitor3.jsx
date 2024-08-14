import Styles from "./Monitor3.module.scss"
import HeaderItem from "../../components/HeaderItem/HeaderItem"
import classNames from "classnames/bind"
import AL1322 from "../../assets/AL1322.png"
import AL2230 from "../../assets/AL2230_2.png"
import UGT524 from "../../assets/UGT524.png"
import IGS232 from "../../assets/IGS232.png"
import KI6000 from "../../assets/KI6000.png"
import OGT500 from "../../assets/OGT500.png"
import RVP510 from "../../assets/RVP510.png"
import O5D150 from "../../assets/O5D150.png"
import CIRCLE from "../../assets/CIRCLE.png"
import PLC from "../../assets/PLC.png"
import PLC1 from "../../assets/PLC1.png"
import traffic from "../../assets/traffic.png"
import buzzer from "../../assets/buzzer.png"
import Status from "../../components/Status/Status"
import Indicator from "../../components/Status/Indicator"
import { ToastContainer, toast } from "react-toastify"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import hubConnection from "../../services/signalR/hubConnection"
import { useState, useEffect } from "react"

const css = classNames.bind(Styles)

function Monitor3() {
    const [data, setData] = useState({})
    const [dataMotor, setDataMotor] = useState([])
    const [MaxDataMotor, setMaxDataMotor] = useState([])
    useEffect(() => {
        hubConnection.start()
        toast("Connected to websocket server")
        if (JSON.parse(localStorage.getItem("DataCompactLogix")) != null) {
            setData(JSON.parse(localStorage.getItem("DataCompactLogix")))
        }
    }, [])
    useEffect(() => {
        hubConnection.connection.on('TagChanged', (res) => {
            const obj = JSON.parse(res)
            setData((prevData) => {
                const updateData = { ...prevData, [obj.name]: obj }
                localStorage.setItem("DataCompactLogix", JSON.stringify(updateData))
                return updateData
            })
            if (obj.name === "Motor_Speed_PV") {
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
        }
        )
        return () => {
            hubConnection.connection.off('TagChanged')
        }
    }, [hubConnection.connection])
    let xAxisInterval = Math.round(dataMotor.length / 6);
    let maxValue = Math.max(...MaxDataMotor)
    let minValue = Math.min(...MaxDataMotor)
    const handInput = () => {
        const dataInput = document.getElementById('changeData')
        if (dataInput.value > 0 && dataInput.value < 70) {
            hubConnection.connection.invoke("SEND",
                JSON.stringify([{
                    "id": "AB.CL5300.Motor_Speed_SP",
                    "v": dataInput.value,
                }])
            )
            toast("Completed")
        }
        else { toast("The value must be between 0 and 60Hz. Please enter again.") }
    }
    const handleStartTraffic = () => {
        const dataInputRed = document.getElementById('changeDataRed')
        const dataInputYellow = document.getElementById('changeDataYellow')
        const dataInputGreen = document.getElementById('changeDataGreen')
        hubConnection.connection.invoke("SEND",
            JSON.stringify([{
                "id": "AB.CL5300.Traffic_SET_D1",
                "v": dataInputRed.value,
            }])
        )
        toast("Completed")
        hubConnection.connection.invoke("SEND",
            JSON.stringify([{
                "id": "AB.CL5300.Traffic_SET_V1",
                "v": dataInputYellow.value,
            }])
        )
        toast("Completed")
        hubConnection.connection.invoke("SEND",
            JSON.stringify([{
                "id": "AB.CL5300.Traffic_SET_X1",
                "v": dataInputGreen.value,
            }])
        )
        sendData("AB.CL5300.Traffic_start_manual", 1)
        setTimeout(() => {
            sendData("AB.CL5300.Traffic_start_manual", 0)
        }, 400);
        toast("Completed")
    }
    const handleStopTraffic = () => {
        sendData("AB.CL5300.Traffic_stop_manual", 1)
        setTimeout(() => {
            sendData("AB.CL5300.Traffic_stop_manual", 0)
            toast("Completed")
        }, 400);
    }
    const sendData = (id, value) => {
        hubConnection.connection.invoke("SEND",
            JSON.stringify([{
                "id": `${id}`,
                "v": `${value}`,
            }])
        )
    }
    const handleStart = () => {
        sendData("AB.CL5300.Motor_Start", 1)
        setTimeout(() => {
            // sendData("AB.CL5300.Motor_Start", 0)
            toast("Completed")
        }, 400);
    }
    const handleStop = () => {
        sendData("AB.CL5300.Motor_Stop", 1)
        setTimeout(() => {
            sendData("AB.CL5300.Motor_Stop", 0)
            toast("Completed")
        }, 400);
    }
    const handleForward = () => {
        sendData("AB.CL5300.Motor_Daochieu", 1)
        setTimeout(() => {
            sendData("AB.CL5300.Motor_Daochieu", 0)
            toast("Completed")
        }, 400);
    }
    // const handleReverse = () => {
    //     sendData("AB.CL5300.Motor_Daochieu", 1)
    //     setTimeout(() => {
    //         sendData("AB.CL5300.Motor_Daochieu", 0)
    //         toast("Completed")
    //     }, 400);
    // }

    const ticks = ['-0', -10, -20, -30, -40, -50, -60, -70, -80, -90, -100];
    const ticks_plc = [, -7, -8, -9, -10, -11, -12, -13, -14, -15, -16, -17, -18, -19];

    const changeUGT524 = (res) => {
        const valueUGT524 = document.getElementById('value_UGT524')
        valueUGT524.style.bottom = Number(res) + '%'
    }
    const changePLC = (res1) => {
        const valuePLC = document.getElementById('value_PLC1')
        valuePLC.style.left = (res1 - 7) / 0.12 + '%'
    }

    return (
        <div className={css('container')}>
            <ToastContainer />
            <div>
                <HeaderItem pageName="MONITOR 3" />
            </div>
            <div className={css("box3")}>
                <div className={css("MasterEthernet")}>
                    <div className={css("block")}>
                        <h1>IO-LINK TECHNOLOGY</h1>
                        <img src={AL2230} alt="" className={css("picAL2230")} />
                        <div className={css("indicator1")}>
                            <Indicator name="" status={data["Alarm_den_xanh_IFM"] ? data["Alarm_den_xanh_IFM"].value : "FALSE"} color={'GREEN'} />
                            <Indicator name="" status={data["Alarm_den_vang_IFM"] ? data["Alarm_den_vang_IFM"].value : "FALSE"} color={'YELLOW'} />
                            <Indicator name="" status={data["Alarm_den_do_IFM"] ? data["Alarm_den_do_IFM"].value : "FALSE"} color={'RED'} />
                            <Status name="" status={data["Alarm_Buzzer"] ? data["Alarm_Buzzer"].value : "FALSE"} />
                            <img id="bgcolor" src={buzzer} alt="buzzer" className={css("picBuzzer")} />
                        </div>
                        <img src={CIRCLE} alt="" className={css("picCIRCLE")} />
                        <img src={OGT500} alt="" className={css("picOGT500")} />
                        <img src={IGS232} alt="" className={css("picIGS232")} />
                        <h2 className={css("nameIGS232")}>IGS232</h2>
                        <div className={css("IGS232")}>
                            <Status name="" status={data["Sensor_IGS232_Status"] ? data["Sensor_IGS232_Status"].value : "FALSE"} />
                        </div>
                        <h2 className={css("nameOGT500")}>OGT500</h2>
                        <div className={css("OGT500")}>
                            <Status name="" status={data["Sensor_OGT500_Status"] ? (data["Sensor_OGT500_Status"].value === "TRUE" ? "FALSE" : "TRUE") : "TRUE"} />
                        </div>
                    </div>

                    <div className={css("block1")}>
                        <img src={UGT524} alt="" className={css("picUGT524")} />
                        <div className={css("container_UGT524")}>
                            <div className={css("slider_UGT524")}></div>
                            <div id="value_UGT524" className={css("value_UGT524")}></div>
                            {data["Sensor_UGT524_PV"] ? changeUGT524(data["Sensor_UGT524_PV"].value) : ''}
                        </div>
                        <div className={css("ruler")}>
                            {ticks.map((res) => <span key={res}>{res}</span>)}
                        </div>
                        <div className={css("UGT524")}>
                            <h2>UGT524</h2>
                            <div>
                                <span className={css("name")}>Distance </span>
                                <span className={css("value")}>{data["Sensor_UGT524_PV"] ? data["Sensor_UGT524_PV"].value : "__"} mm</span>
                            </div>
                        </div>
                    </div>

                    <div className={css("block2")}>
                        <img src={KI6000} alt="" className={css("picKI6000")} />
                        <img src={O5D150} alt="" className={css("picO5D150")} />
                        <img src={RVP510} alt="" className={css("picRVP510")} />
                        <img src={PLC} alt="" className={css("picPLC")} />
                        <div className={css("container_PLC1")}>
                            <div className={css("PLC1")}>
                                <img id="value_PLC1" src={PLC1} alt="" className={css("picPLC1")} />
                                {data["Sensor_O5D150_PV"] ? changePLC(data["Sensor_O5D150_PV"] ? data["Sensor_O5D150_PV"].value : "__") : ''}
                            </div>
                        </div>
                        <div className={css("KI6000")}>
                            <h2>KI6000</h2>
                            <Status name="" status={data["Sensor_KI6000_Status"] ? data["Sensor_KI6000_Status"].value : "FALSE"} />
                        </div>
                        <div className={css("ruler_plc")}>
                            {ticks_plc.map((res) => <span key={res}>{res}</span>)}
                        </div>

                        <div className={css("O5D150")}>
                            <h2>O5D150</h2>
                            <Indicator name="" status={"TRUE"} color={data["Sensor_O5D150_Status"] ? (data["Sensor_O5D150_Status"].value === "TRUE" ? "RED" : "GREEN") : "GREEN"} />
                            <div>
                                <span className={css("name")}>Distance </span>
                                <span className={css("value")}>{data["Sensor_O5D150_PV"] ? data["Sensor_O5D150_PV"].value : "__"} mm</span>
                            </div>
                        </div>
                        <div className={css("RVP510")}>
                            <h2>RVP510</h2>
                            <div>
                                <span className={css("name")}>Pulse Count </span>
                                <span className={css("value")}>{data["Sensor_RVP510_PV"] ? data["Sensor_RVP510_PV"].value : "__"}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={css("box4")}>
                    <div className={css("Traffic")}>
                        <h1>TRAFFIC</h1>
                        <div className={css("control")}>
                            <button className={css('buttonHandle')} onClick={handleStartTraffic}>Start</button>
                            <button className={css('buttonHandle')} onClick={handleStopTraffic}>Stop</button>
                        </div>
                        <div className={css("setting")}>
                            <div className={css("nameSetting")}>
                                <span className={css("name")}>Red light setting:</span>
                                <span className={css("name")}>Yellow light setting:</span>
                                <span className={css("name")}>Green light setting:</span>
                            </div>
                            <div className={css("inputSetting")}>
                                <input id="changeDataRed" type="text" className={css('wait')} />
                                <input id="changeDataYellow" type="text" className={css('wait')} />
                                <input id="changeDataGreen" type="text" className={css('wait')} />
                            </div>
                            <div className={css("nameSetting")}>
                                <span className={css("name")}>[s]</span>
                                <span className={css("name")}>[s]</span>
                                <span className={css("name")}>[s]</span>
                            </div>
                        </div>
                        <img src={traffic} alt="Traffic light" className={css("picTraffic")} />

                        <div className={css("indicator1")}>
                            <Indicator name="" status={data["Traffic_xanh1"] ? data["Traffic_xanh1"].value : "FALSE"} color={'GREEN'} />
                            <Indicator name="" status={data["Traffic_vang1"] ? data["Traffic_vang1"].value : "FALSE"} color={'YELLOW'} />
                            <Indicator name="" status={data["Traffic_do1"] ? data["Traffic_do1"].value : "FALSE"} color={'RED'} />
                        </div>
                        <div className={css("indicator2")}>
                            <Indicator name="" status={data["Traffic_do1"] ? data["Traffic_do1"].value : "FALSE"} color={'RED'} />
                            <Indicator name="" status={data["Traffic_vang1"] ? data["Traffic_vang1"].value : "FALSE"} color={'YELLOW'} />
                            <Indicator name="" status={data["Traffic_xanh1"] ? data["Traffic_xanh1"].value : "FALSE"} color={'GREEN'} />
                        </div>
                        <div className={css("indicator3")}>
                            <Indicator name="" status={data["Traffic_do2"] ? data["Traffic_do2"].value : "FALSE"} color={'RED'} />
                            <Indicator name="" status={data["Traffic_vang2"] ? data["Traffic_vang2"].value : "FALSE"} color={'YELLOW'} />
                            <Indicator name="" status={data["Traffic_xanh2"] ? data["Traffic_xanh2"].value : "FALSE"} color={'GREEN'} />
                        </div>
                        <div className={css("indicator4")}>
                            <Indicator name="" status={data["Traffic_xanh2"] ? data["Traffic_xanh2"].value : "FALSE"} color={'GREEN'} />
                            <Indicator name="" status={data["Traffic_vang2"] ? data["Traffic_vang2"].value : "FALSE"} color={'YELLOW'} />
                            <Indicator name="" status={data["Traffic_do2"] ? data["Traffic_do2"].value : "FALSE"} color={'RED'} />
                        </div>
                        <div className={css("time1")}>
                            <span className={css("time11")} hidden={data["Traffic_do1"] ? (data["Traffic_do1"].value === 'TRUE' ? false : true) : true}>{data["Traffic_time_D1_manual"] ? data["Traffic_time_D1_manual"].value : ""} </span>
                            <span className={css("time12")} hidden={data["Traffic_vang1"] ? (data["Traffic_vang1"].value === 'TRUE' ? false : true) : true}>{data["Traffic_time_V1_manual"] ? data["Traffic_time_V1_manual"].value : ""} </span>
                            <span className={css("time13")} hidden={data["Traffic_xanh1"] ? (data["Traffic_xanh1"].value === 'TRUE' ? false : true) : true}>{data["Traffic_time_X1_manual"] ? data["Traffic_time_X1_manual"].value : ""} </span>
                        </div>
                        <div className={css("time2")}>
                            <span className={css("time21")} hidden={data["Traffic_do2"] ? (data["Traffic_do2"].value === 'TRUE' ? false : true) : true}>{data["Traffic_time_D2_manual"] ? data["Traffic_time_D2_manual"].value : ""} </span>
                            <span className={css("time22")} hidden={data["Traffic_vang2"] ? (data["Traffic_vang2"].value === 'TRUE' ? false : true) : true}>{data["Traffic_time_V2_manual"] ? data["Traffic_time_V2_manual"].value : ""} </span>
                            <span className={css("time23")} hidden={data["Traffic_xanh2"] ? (data["Traffic_xanh2"].value === 'TRUE' ? false : true) : true}>{data["Traffic_time_X2_manual"] ? data["Traffic_time_X2_manual"].value : ""} </span>
                        </div>
                        <div className={css("time1_1")}>
                            <span className={css("time1_11")} hidden={data["Traffic_do1"] ? (data["Traffic_do1"].value === 'TRUE' ? false : true) : true}>{data["Traffic_time_D1_manual"] ? data["Traffic_time_D1_manual"].value : ""} </span>
                            <span className={css("time1_12")} hidden={data["Traffic_vang1"] ? (data["Traffic_vang1"].value === 'TRUE' ? false : true) : true}>{data["Traffic_time_V1_manual"] ? data["Traffic_time_V1_manual"].value : ""} </span>
                            <span className={css("time1_13")} hidden={data["Traffic_xanh1"] ? (data["Traffic_xanh1"].value === 'TRUE' ? false : true) : true}>{data["Traffic_time_X1_manual"] ? data["Traffic_time_X1_manual"].value : ""} </span>
                        </div>
                        <div className={css("time2_2")}>
                            <span className={css("time2_21")} hidden={data["Traffic_do2"] ? (data["Traffic_do2"].value === 'TRUE' ? false : true) : true}>{data["Traffic_time_D2_manual"] ? data["Traffic_time_D2_manual"].value : ""} </span>
                            <span className={css("time2_22")} hidden={data["Traffic_vang2"] ? (data["Traffic_vang2"].value === 'TRUE' ? false : true) : true}>{data["Traffic_time_V2_manual"] ? data["Traffic_time_V2_manual"].value : ""} </span>
                            <span className={css("time2_23")} hidden={data["Traffic_xanh2"] ? (data["Traffic_xanh2"].value === 'TRUE' ? false : true) : true}>{data["Traffic_time_X2_manual"] ? data["Traffic_time_X2_manual"].value : ""} </span>
                        </div>

                    </div>
                    <div className={css("Motor")}>
                        <h1>MOTOR</h1>
                        <div className={css("containerSetting")}>
                            <div className={css("control")}>
                                <button className={css('buttonHandle')} onClick={handleStart}>Start</button>
                                <button className={css('buttonHandle')} onClick={handleStop}>Stop</button>
                                <button className={css('buttonHandle')} onClick={handleForward}><i className="fa-solid fa-right-left"></i></button>
                                {/* <button className={css('buttonHandle')} onClick={handleReverse}>Reverse</button> */}
                            </div>
                            <div className={css("container1")}>
                                <div className={css("statusControl")}>
                                    <Status name="" status={data["Motor_Ready"] ? data["Motor_Ready"].value : "FALSE"} />
                                    <Status name="" status={data["Motor_Active"] ? data["Motor_Active"].value : "FALSE"} />
                                    <Status name="" status={data["Motor_Direction_Status"] ? data["Motor_Direction_Status"].value : "FALSE"} />
                                    <Status name="" status={data["Motor_Direction_Status"] ? (data["Motor_Direction_Status"].value === "FALSE" ? "TRUE" : "FALSE") : "FALSE"} />
                                    <Indicator name="" status={data["Motor_Error"] ? data["Motor_Error"].value : "FALSE"} color={'RED'} />
                                </div>
                                <div className={css("nameControl")}>
                                    <span>Ready</span>
                                    <span>Active</span>
                                    <span>Forward</span>
                                    <span>Reverse</span>
                                    <span>Error</span>
                                </div>
                            </div>

                        </div>

                        <div className={css("setting")}>
                            <div className={css("nameSetting")}>
                                <span className={css("name")}>Current speed:</span>
                                <span className={css("name")}>Speed setting:</span>
                            </div>
                            <div className={css("inputSetting")}>
                                <span className={css("value")}>{data["Motor_Speed_PV"] ? data["Motor_Speed_PV"].value : "__"} </span>
                                <input id="changeData" type="text" className={css('wait')} />
                                <button className={css('buttonInput')} onClick={handInput}>Confirm</button>
                            </div>
                            <div className={css("nameSetting")}>
                                <span className={css("name")}>[Hz]</span>
                                <span className={css("name")}>[Hz]</span>
                            </div>
                        </div>
                        <div className={css('chart')}>
                            <LineChart width={400} height={340} data={dataMotor}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="timestamp" interval={xAxisInterval} />
                                <YAxis domain={[minValue, maxValue]} label={{ value: 'Speed(Hz)', angle: -90, position: 'insideLeft' }} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="value" name={false} stroke="#000000" dot={false} legendType="none" />
                            </LineChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Monitor3