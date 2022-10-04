import s from './Map.module.scss'
import { Route } from "./Route/Route"
import { MapContainer} from "react-leaflet"
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import { Canvas } from './Canvas/Canvas'

export const Map = (props) => {

    return(
        <MapContainer
            className={s.mapContainer}
            center={[51.505, -0.09]}
            zoom={13}
            minZoom={2}
            maxZoom={15}
        >
            <Canvas 
                fitMapSubscribe={props.fitMapSubscribe}
            />
            <Route
                currentRoute={props.currentRoute}
            />
        </MapContainer>
    )
}