import { useState } from "react"
import hubConnection from "../../services/signalR/hubConnection"
import Styles from "./ToggleButton.module.scss"
import classNames from "classnames/bind"

const css = classNames.bind(Styles)

function ToggleButton({ id, name, data }) {
     const [toggle, setToggle] = useState('true')

     const Changed = {
          "name" : `${data}`,
          "value": `${toggle}`,
           }

     const handleClick = () => {
          setToggle(!toggle)
        //  console.log(Changed)
          hubConnection.connection.invoke("SEND", 
               JSON.stringify({
                  "name" : `${data}`,
                  "value": `${toggle}`,
               }))
      }


     return (
          <div className={css('container')}>
               <span>{name}</span>
               <div className={css('box')}>
                    <input type="checkbox" id={id} className={css('check')} />
                    <label htmlFor={id} className={css('button')} onClick={handleClick}></label>
               </div>
          </div>
     )
}

export default ToggleButton