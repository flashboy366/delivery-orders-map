import s from './OrderItem.module.scss'

import { OrderCell } from './OrderCell/OrderCell'



export const OrderItem = (props) => {

    // generating styling classname for order item
    let style = `${s.orderItem}`
    if (props.selected) style = style.concat(` ${s.selected}`)

    // handling order click
    const onOrderItemClick = () => (() => {
        props.changeSelection(props.id)
    })()

    return(
        <div
            className={style}
            onClick={onOrderItemClick}
        >
            <OrderCell
                type='title'
                title={props.orderData.title}
            />
            {['load', 'unload'].map((type) => {
                let pointID
                type === 'load' ? pointID = props.orderData.loadPointID
                    : pointID = props.orderData.unloadPointID

                return(
                    <OrderCell
                        key={type}
                        type={type}
                        pointID={pointID}
                        pointsList={props.pointsList}
                        changePoint={props.changePoint}
                        orderID={props.id}
                        dispatch={props.dispatch}
                    />
                )
            })}
        </div>
    )
}