import Styles from "./PLCKit.module.scss"
import Status from "../../../components/Status/Status"
import classNames from "classnames/bind"
import hubConnection from "../../../services/signalR/hubConnection"
import Indicator from "../../../components/Status/Indicator"
import picPLCvali1 from "../../../assets/PLCvali1.png"
import picPLC1 from "../../../assets/PLC1.png"
import { ToastContainer,toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from "react"


const css = classNames.bind(Styles)

function PLCKit({ led1, led2, led3, led4, led5, led6, led7, led8,
    toggle1, toggle2, toggle3, toggle4, toggle5, toggle6, toggle7, toggle8,
    Position_PV, Speed_PV,
}) {

    const sendData = (id, value) => {
        hubConnection.connection.invoke("SEND",
            JSON.stringify([{
                "id": "PLC.Step_Motor." + `${id}`,
                "v": value,
            }])
        )
    }

    const handle1 = () => {
        sendData("Start", 1)
        setTimeout(() => {
            sendData("Start", 0)
            toast("Completed")
        }, 200)
    }
    const handle2 = () => {
        sendData("SetHome", 1)
        setTimeout(() => {
            sendData("SetHome", 0)
            toast("Completed")
        }, 200)
    }
    const handle3 = () => {
        sendData("Auto/Man", 1)
        toast("Completed")
        changeColor1()
    }
    const handle4 = () => {
        sendData("Auto/Man", 0)
        toast("Completed")
        changeColor2()
    }

    const handInput1 = () => {
        const dataInput1 = document.getElementById('changeData1')
        hubConnection.connection.invoke("SEND",
            JSON.stringify([{
                "id": "PLC.Vali_Siemens.Speed_SP",
                "v": `${dataInput1.value}`,
            }])
        )
        toast("Completed")
    }
    const handInput2 = () => {
        const dataInput2 = document.getElementById('changeData2')
        if ( Number(dataInput2.value) < 110){
            hubConnection.connection.invoke("SEND",
            JSON.stringify([{
                "id": "PLC.Vali_Siemens.Position_SP",
                "v": `${dataInput2.value}`,
            }])
        )
        toast("Completed") 
        }
        else{toast("The value must be between 0 and 100. Please enter again.")}
    }

    const ticks = ['-0', -10, -20, -30, -40, -50, -60, -70, -80, -90, -100, -110];
    const valuePosition = document.getElementById('valuePosition')
    const Color1 = document.getElementById('mode1')
    const Color2 = document.getElementById('mode2')
    const changeColor1 = () => {
        if(Color1 != null && Color2 != null){
            Color1.style.backgroundColor = '#032B91'
            Color2.style.backgroundColor = 'rgb(255, 155, 0, 0.3)'
        }
    }
    const changeColor2 = () => {
        if(Color1 != null && Color2 != null){
            Color2.style.backgroundColor = '#032B91'
            Color1.style.backgroundColor = 'rgb(255, 155, 0, 0.3)'
        }
    }
    const changePosition = (res) => {
        if(valuePosition != null){
            valuePosition.style.left = Number(res) + '%'
        }
    }
    const handleOnMouseRight = () => {
        hubConnection.connection.invoke("SEND",
            JSON.stringify([{
                "id": "PLC.Step_Motor.Forward",
                "v": 1,
            }])
        )
    }
    const handleOffMouseRight = () => {
        hubConnection.connection.invoke("SEND",
            JSON.stringify([{
                "id": "PLC.Step_Motor.Forward",
                "v": 0,
            }])
        )
    }
    const handleOnMouseLeft = () => {
        hubConnection.connection.invoke("SEND",
            JSON.stringify([{
                "id": "PLC.Step_Motor.Reverse",
                "v": 1,
            }])
        )
    }
    const handleOffMouseLeft = () => {
        hubConnection.connection.invoke("SEND",
            JSON.stringify([{
                "id": "PLC.Step_Motor.Reverse",
                "v": 0,
            }])
        )
    }
//     const [count1, setCount1] = useState(0);
//  const [isPressed1, setIsPressed1] = useState(false);
//  const [isPressed2, setIsPressed2] = useState(false);
//  useEffect(() => {
//     let timer = null;

//     if (isPressed1) {
//       timer = setInterval(() => {
//         setCount1(count1 + 1);
//       }, 100);
//     } else {
//       clearInterval(timer);
//     }

//     return () => {
//       clearInterval(timer);
//     };
//  }, [isPressed1, count1]);

//  useEffect(() => {
//     let timer2 = null;

//     if (isPressed2) {
//       timer2 = setInterval(() => {
//         setCount1(count1 - 1);
//       }, 100);
//     } else {
//       clearInterval(timer2);
//     }

//     return () => {
//       clearInterval(timer2);
//     };
//  }, [isPressed2, count1]);
//  console.log(count1)
    return (
        <div className={css('plcKit')}>
            <ToastContainer/>
            <h1 className={css('tittle')}>PLC Kit</h1>

            <div className={css('buttonIn')}>
                <Status name="I0.0" status={toggle1.value} />
                <Status name="I0.1" status={toggle2.value} />
                <Status name="I0.2" status={toggle3.value} />
                <Status name="I0.3" status={toggle4.value} />
                <Status name="I0.4" status={toggle5.value} />
                <Status name="I0.5" status={toggle6.value} />
                <Status name="I0.6" status={toggle7.value} />
                <Status name="I0.7" status={toggle8.value} />
            </div>
            <div className={css('buttonOut')}>
                <Indicator name="Q0.0" status={"FALSE"} color={"RED"} />
                <Indicator name="Q0.1" status={"FALSE"} color={"RED"} />
                <Indicator name="Q0.2" status={led3.value} color={"RED"} />
                <Indicator name="Q0.3" status={led4.value} color={"RED"} />
                <Indicator name="Q0.4" status={led5.value} color={"RED"} />
                <Indicator name="Q0.5" status={led6.value} color={"RED"} />
                <Indicator name="Q0.6" status={led7.value} color={"RED"} />
                <Indicator name="Q0.7" status={led8.value} color={"RED"} />
            </div>


            <div className={css('item')}>
                <div className={css('setting')}>
                    <button onClick={handle1} className={css('buttonHandle')}>Start</button> 
                    <button onClick={handle2} className={css('buttonHandle')}>Set Home</button>
                    <button  className={css('buttonHandle')}>Reset Encoder</button>
                    <div className={css("mode")}>
                    <button id="mode1" onClick={handle3} className={css('buttonHandleMode')}>Man</button>
                    <button id="mode2" onClick={handle4} className={css('buttonHandleMode')}>Auto</button>
                    </div>
                </div>
                <div className={css('setPoint')}>
                    <h1>SET POINT</h1>
                    <span>Speed</span>
                    <input id="changeData1" type="text" className={css('wait')} />
                    <button onClick={handInput1} className={css('buttonInput')}>CONFIRM</button> <br />
                    <br />
                    <span>Position</span>
                    <input id="changeData2" type="text" className={css('wait')} />
                    <button onClick={handInput2} className={css('buttonInput')}>CONFIRM</button>
                </div>
                <div className={css('current')}>
                    <h1>CURRENT</h1>
                    <div className={css("namediv")}>
                    <span>Speed </span>
                    <span>Position </span>
                    </div>
                    <div className={css("valuediv")}>
                    <span className={css('wait')}> {Speed_PV.value}</span>
                    <span className={css('wait')}>{Number(Position_PV.value).toFixed(2)}</span>
                    </div>
                </div>
                <img src={picPLCvali1} alt="" className={css("picPLC")} />
                <div className={css("container_PLCkit")}>
                            <div className={css("PLC1_kit")}>
                            <img id="valuePosition" src={picPLC1} alt="" className={css("picPLC1_kit") }/>
                            {Position_PV ? changePosition(110) : ''}
                            </div>
                        </div>
                <div className={css("ruler_plc")}>
                            {ticks.map((res)=> <span key={res}>{res}</span>)}
                </div>
                <button onMouseDown={handleOnMouseRight} onMouseUp={handleOffMouseRight} className={css("mouseUp")}><i className="fa-solid fa-angle-right"></i></button>
                <button onMouseDown={handleOnMouseLeft} onMouseUp={handleOffMouseLeft} className={css("mouseDown")}><i className="fa-solid fa-angle-right fa-rotate-180"></i></button>

            </div>
        </div>
    )
}

export default PLCKit