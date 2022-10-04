import s from './OrderItem.module.scss'
import { OrderCell } from './OrderCell/OrderCell'
import { forwardRef } from 'react'

export const OrderItem = forwardRef((props, refs) => {
    const { orderItemRef, selectMenuRef } = refs.current

    let style = `${s.orderItem}`
    if (props.selected) style = style.concat(` ${s.selected}`)

    const onClick = () => (() => {
        props.onOrderClick(props.id)
    })()

    return(
        <div
            className={style}
            ref={orderItemRef}
            onClick={onClick}
        >
            <OrderCell
                type='title'
                title={props.orderData.title}
                ref={selectMenuRef}
            />
            <OrderCell
                type='load'
                pointID={props.orderData.loadPointID}
                pointsList={props.pointsList}
                changePoint={props.changePoint}
                orderID={props.id}
                ref={selectMenuRef}
                onOrderClick={props.onOrderClick}
            />
            <OrderCell
                type='unload'
                pointID={props.orderData.unloadPointID}
                pointsList={props.pointsList}
                changePoint={props.changePoint}
                orderID={props.id}
                ref={selectMenuRef}
                onOrderClick={props.onOrderClick}
            />
        </div>
    )
})