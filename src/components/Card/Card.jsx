import StatusButton from "../Status/StatusButton"
import Styles from "./Card.module.scss"

function Card({ id, status ,tittle, content}){
    return(
        <div className={Styles.card}>
            <h2 className={Styles.tittle}>{tittle}</h2>
            <span className={Styles.content} >{content}</span>
            <div>
               <StatusButton id={id} name={status} />
            </div>
            
        </div>
    )
}

export default Card