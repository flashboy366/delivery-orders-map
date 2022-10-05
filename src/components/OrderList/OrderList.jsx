import s from './OrderList.module.scss'

import { OrderItem } from './OrderItem/OrderItem'
import { changeSelectedOrderActionCreator } from '../../redux/ordersReducer'



export const OrderList = (props) => {

    // order selection
    const changeSelection = (orderID = null) => {
        props.dispatch(changeSelectedOrderActionCreator(orderID))
    }

    // handle empty space click
    const onEmptyClick = () => {
        changeSelection()
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
                        let orderItemsJSX = []
                        for (let i = 0; i < 4; i++) {
                            orderItemsJSX.push(
                                <OrderItem
                                    key={i}
                                    id={i}
                                    selected=
                                        {props.orders.selectedOrder === i}
                                    orderData={props.orders.orderData[i]}
                                    pointsList={props.orders.pointsList}
                                    changeSelection={changeSelection}
                                    dispatch={props.dispatch}
                                />
                            )
                        }
                        return orderItemsJSX
                    })()}
                    <div
                        className={s.empty}
                        onClick={onEmptyClick}
                    ></div>
                </div>
            }
        </>
    )
}