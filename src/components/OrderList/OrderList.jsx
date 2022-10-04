import s from './OrderList.module.scss'
import { OrderItem } from './OrderItem/OrderItem'
import { forwardRef } from 'react'
import { changeSelectedOrderActionCreator } from '../../redux/ordersReducer'

export const OrderList = forwardRef((props, refs) => {

    // handle off-item click for nulling order selection
    const onEmptyClick = () => {
        props.dispatch(changeSelectedOrderActionCreator(null))
    }
    
    return(
        <>
            {
                <div
                    className={s.orderList}
                >
                    <div className={s.listHeaders}>
                        <div
                            className={`${s.headerItem} ${s.titleHeader}`}
                        >
                            Title
                        </div>
                        <div
                            className={`${s.headerItem} ${s.pointHeader}`}
                        >
                            Load point
                        </div>
                        <div
                            className={`${s.headerItem} ${s.pointHeader}`}
                        >
                            Unload point
                        </div>
                    </div>
                    {(() => {
                        const orderItems = []
                        for (let i = 0; i < 4; i++) {
                            orderItems.push(
                                <OrderItem
                                    key={i}
                                    id={i}
                                    selected=
                                        {props.orders.selectedOrder === i}
                                    dispatch=
                                        {props.dispatch}
                                    orderData={props.orders.orderData[i]}
                                    pointsList={props.orders.pointsList}
                                    ref={refs}
                                    onOrderClick={props.onOrderClick}
                                />
                            )
                        }
                        return orderItems
                    })()}
                    <div
                        className={s.empty}
                        onClick={onEmptyClick}
                    ></div>
                </div>
            }
        </>
    )
})