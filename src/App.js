import s from './App.module.scss'
import { Map } from "./components/Map/Map"
import { OrderList } from "./components/OrderList/OrderList"
import Split from 'react-split'
import 'antd/dist/antd.min.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export const App = (props) => {
  let appState = props.appState

  // convert lat/long points to leaflet coord objects
  const routeToCoords = (route) => {
    return route.map(point => { 
        return new L.latLng(point[0], point[1])
      })
  }

  // subscriber for fitting route on map resize
  let fitMap = () => { }
  const fitMapSubscribe = (observer) => fitMap = observer
  // drag event for map resize and route fitting
  const onDragEnd = () => {
    let selectedOrder = appState.orders.selectedOrder
    let currentCoords = routeToCoords(appState.orders.currentRoute)

    fitMap(
      selectedOrder,
      currentCoords,
    )
  }

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
          orders={appState.orders}
          dispatch={props.dispatch}
        />
        <Map
          fitMapSubscribe={fitMapSubscribe}
          currentRoute={appState.orders.currentRoute}
        />
      </Split>
    </div>
  );
}