import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { greenIcon, redIcon } from "../../../resources";



export const Route = (props) => {
    const map = useMap()

    // route update
    useEffect(() => {
        if (!map) return

        const routingControl = new L.Routing.Control({
            waypoints: props.currentRoute,
            fitSelectedRoutes: true,
            routeWhileDragging: false,
            createMarker: (i, wp) => {
                let icon, label
                if (i === 0) {
                    icon = redIcon
                    label = 'Load'
                }
                else {
                    icon = greenIcon
                    label = 'Unload'
                }
                return L.marker(wp.latLng, {icon: icon}).bindTooltip(label);
              },
            lineOptions: {
                styles: [
                    {color: 'blue', opacity: 0.8, weight: 6},
                ],
                addWaypoints: false,
            },
            autoRoute: true,
            show: false,
        }).addTo(map)

        return () => map.removeControl(routingControl)
    })

    return null;
}