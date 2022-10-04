import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

export const Route = (props) => {

    const map = useMap()

    // route building
    useEffect(() => {
        if (!map) return

        let greenIcon = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })

        let redIcon = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })

        // building route onto the map
        const routingControl = new L.Routing.Control({
            waypoints: props.currentRoute,
            fitSelectedRoutes: true,
            routeWhileDragging: false,
            createMarker: (i, wp) => {
                if (i === 0) return L.marker(wp.latLng, {icon: redIcon})
                else return L.marker(wp.latLng, {icon: greenIcon});
              },
            lineOptions: {
                styles: [
                    {color: 'blue', opacity: 0.8, weight: 6},
                ],
            },
            autoRoute: true,
            pointMarkerStyle: {
                color: 'white',
                radius: '3',
            },
            show: false,
        }).addTo(map)

        return () => map.removeControl(routingControl)
    })

    return null;
}