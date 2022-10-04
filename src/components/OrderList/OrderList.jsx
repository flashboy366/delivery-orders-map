import s from './OrderList.module.scss'
import { OrderItem } from './OrderItem/OrderItem'
import { forwardRef } from 'react'

export const OrderList = forwardRef((props, refs) => {
    
    return(
        <>
            {
                <div
                    className={s.orderList}
                >
                    <div className={s.listHeaders}>
                        <div className={`${s.headerItem} ${s.titleHeader}`}>
                            Title
                        </div>
                        <div className={`${s.headerItem} ${s.pointHeader}`}>
                            Load point
                        </div>
                        <div className={`${s.headerItem} ${s.pointHeader}`}>
                            Unload point
                        </div>
                    </div>
                    {(() => {
                        const orderItems = []
                        for (let i = 0; i < 4; i++) {
                            orderItems.push(
                                <OrderItem
                                    id={i}
                                    selected={props.orders.selectedOrder === i}
                                    changeSelectedOrder={props.changeSelectedOrder}
                                    orderData={props.orders.orderData[i]}
                                    pointsList={props.pointsList}
                                    changePoint={props.changePoint}
                                    ref={refs}
                                    onOrderClick={props.onOrderClick}
                                />
                            )
                        }
                        return orderItems
                    })()}
                </div>
            }
        </>
    )
})