import Styles from "./Indicator.module.scss"

function Indicator({ name, status, color}) {
    if (status === 'TRUE' && color === 'RED'){
        return (
            <div className={Styles.container}>
                 <span className={Styles.nameItem}>{name}</span>
                 <div className={Styles.box}>
                    <div className={Styles.boxOnred}>
                    </div>
                 </div>
            </div>
       )
    }
    if (status === 'TRUE' && color === 'YELLOW'){
        return (
            <div className={Styles.container}>
                 <span className={Styles.nameItem}>{name}</span>
                 <div className={Styles.box}>
                    <div className={Styles.boxOnyellow}>
                    </div>
                 </div>
            </div>
       )
    }
    if (status === 'TRUE' && color === 'GREEN'){
        return (
            <div className={Styles.container}>
                 <span className={Styles.nameItem}>{name}</span>
                 <div className={Styles.box}>
                    <div className={Styles.boxOngreen}>
                    </div>
                 </div>
            </div>
       )
    }
    if (status === 'FALSE'){
        return (
            <div className={Styles.container}>
                 <span className={Styles.nameItem}>{name}</span>
                 <div className={Styles.box}>
                    <div className={Styles.boxOFF}>
                    </div>
                 </div>
            </div>
       )
    }
}

export default Indicator