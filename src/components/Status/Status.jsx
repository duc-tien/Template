import Styles from "./Status.module.scss"
import classNames from "classnames/bind"

const css = classNames.bind(Styles)

function Status({ name, status}) {
    if (status === 'TRUE'){
        return (
            <div className={css('container')}>
                 <span className={css('nameItem')}>{name}</span>
                 <div className={css('box')}>
                    <div className={css('boxOn')}>
                    </div>
                 </div>
            </div>
       )
    }
    if (status === 'FALSE'){
        return (
            <div className={css('container')}>
                 <span className={css('nameItem')}>{name}</span>
                 <div className={css('box')}>
                    <div className={css('boxOFF')}>
                    </div>
                 </div>
            </div>
       )
    }
}

export default Status