// TODO fetch from DB, filter by visible frame https://github.com/reggie3/react-native-webview-leaflet/blob/8e5830fc23d121db19f51d7dea872d553c253ba5/web/mapComponent.js#L307
import locations from '../locationsList.json';

export default class LocationsProvider {
    /* 
     * Define ranges of lat/lon if map provides corners
     * otherwise let server figure it out
     * @param latMin 
     * @param latMax
     * @param lonMin
     * @param lonMax 
     *
     */
    static getLocations() { //only static until we're actually pulling data
        return(LocationsProvider.convertFromList(locations.markers));
    }

    static convertFromList(locations) {
        return(
            locations.map((location) => {
                return {
                    id: location.nid,
                    key: location.nid,
                    name: location.name,
                    coords: [location.lat, location.lon],
                    icon: '⛰AA',
                    size: [24, 24]
                }
            })
        );
    }
}
