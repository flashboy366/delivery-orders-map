import s from './App.module.scss'
import { Map } from "./components/Map/Map"
import { OrderList } from "./components/OrderList/OrderList"
import Split from 'react-split'
import 'antd/dist/antd.min.css'
import 'leaflet/dist/leaflet.css'
import { createRef, useEffect, useRef } from 'react'

export const App = (props) => {

  let appState = props.appState  

  // subscriber for fitting route on map resize
  let invalidateMapSize = () => { }
  const fitMapSubscribe = (observer) => invalidateMapSize = observer
  const onDragEnd = () => {
    invalidateMapSize(
      appState.orders.selectedOrder,
      appState.orders.currentRoute
    )
  }

  // order list clicks handling
  const onOrderClick = (orderItemID) => (() => {
    props.changeSelectedOrder(orderItemID)
  })()

  const onOutsideOrderClick = () => (() => {
    console.log('outside click')
    props.changeSelectedOrder(null)
  })()

  const useOutsideOrderClick = (callback) => {
    // const ref = createRef()
    const orderItemRef = createRef()
    const selectMenuRef = createRef()
    const refs = useRef({orderItemRef, selectMenuRef})
    // const ref = useRef()

    useEffect(() => {
      const onClick = (e) => {
        if (
          (refs.current.orderItemRef &&
          !refs.current.orderItemRef.current.contains(e.target)) &&
          !refs.current.selectMenuRef.current.contains(e.target)
        ) {
          callback()
        }
      }

      document.addEventListener('click', onClick)
      return () => document.removeEventListener('click', onClick)
    })

    return refs
  }
  // const orderItemRef = useOutsideOrderClick(onOutsideOrderClick)
  // const selectMenuRef = useOutsideOrderClick(onOutsideOrderClick)
  // const refs = useRef({orderItemRef, selectMenuRef})
  const refs = useOutsideOrderClick(onOutsideOrderClick)

  return (
    <div
      className={s.app}
    >
      <Split
        className={s.split}
        sizes={[25, 75]}
        onDragEnd={onDragEnd}
      >
        <OrderList
          onOrderClick={onOrderClick}
          orders={appState.orders}
          pointsList={appState.pointsList}
          changeSelectedOrder={props.changeSelectedOrder}
          changePoint={props.changePoint}
          ref={refs}
        />
        <Map 
          fitMapSubscribe={fitMapSubscribe}
          currentRoute={appState.orders.currentRoute}
        />
      </Split>
    </div>
  );
}