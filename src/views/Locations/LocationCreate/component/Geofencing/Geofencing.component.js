import React, {Component} from 'react'
import constants from '../../../../../config/constants';

class Geofencing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_set: false,
            map_rendered: false,
            rendered: false,
            polygon: [],
        };
        this.map = null;
        this.google = null;

        this._smoothZoom = this._smoothZoom.bind(this);
        this.initMap = this.initMap.bind(this);
        this._updatePolygon = this._updatePolygon.bind(this);
        this._renderNewPolygon = this._renderNewPolygon.bind(this);
        this._renderUpdatePolygon = this._renderUpdatePolygon.bind(this);
    }

    componentDidMount() {
        const {order_id} = this.props;

        this.renderMap();
        
    }
    componentDidUpdate(prevProps) {
        console.log('Updated Polygon:', this.props.polygon, prevProps);
        if (this.props.polygon !== prevProps.polygon) {
            this._updatePolygon(this.props.polygon);
            this._renderUpdatePolygon(); // Add this line to re-render the map with updated polygon
        }
    }
    

    componentWillUnmount() {
        const {is_error, booking_id} = this.state;
        if (!is_error) {

        }
    
       
    }


    _smoothZoom(map, max, cnt) {
        const prop = this;
        if (cnt >= max) {
            return;
        } else {
            this.z = window.google.maps.event.addListener(map, 'zoom_changed', function (event) {
                window.google.maps.event.removeListener(prop.z);
                prop._smoothZoom(map, max, cnt + 1);
            });
            setTimeout(function () {
                map.setZoom(cnt)
            }, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
        }
       
    }

    callCenter(data) {

        if (window.google && this.map) {
            var location = new window.google.maps.LatLng(data[0], data[1]);
            // this.map.setZoom(14);
            this.map.panTo(location);
            this._smoothZoom(this.map, 12, this.map.getZoom());
        }
    }




    renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=" + constants.GOOGLE_MAP_KEY + "&libraries=geometry,drawing,places&callback=initMap");
        window.initMap = this.initMap
    }

    
    _updatePolygon(data) {
        const { handleSave } = this.props;
        console.log('Updated Polygon:', this.props.polygon);
        this.setState({
            polygon: data,
        });
        handleSave(data);
       
    }

    _renderUpdatePolygon() {
        const google = window.google;
        const { polygon } = this.props;
    
        // Check if the polygon array is empty or undefined
        if (!polygon || polygon.length === 0) {
            // Handle the case where the polygon is empty
            console.warn('Polygon data is empty or undefined.');
            return;
        }
    
        const subArea = new window.google.maps.Polygon({
            paths: polygon.map((val) => ({ lat: val[0], lng: val[1] })),
            fillOpacity: 0.5,
            strokeWeight: 2,
            strokeColor: '#57ACF9',
            clickable: true,
            editable: true,
            draggable: true,
            zIndex: 1,
        });
    
        subArea.setMap(this.map);
    
        const prop = this;
    
        google.maps.event.addListener(subArea, 'click', function () {
            // console.log(this.id + ' ' + this.getPath().getArray().toString());
        });
    
        google.maps.event.addListener(subArea, 'dragend', function () {
            const tempArray = [];
            this.getPath().getArray().forEach((val) => {
                tempArray.push([val.lat(), val.lng()]);
            });
            prop._updatePolygon(tempArray);
        });
    
        google.maps.event.addListener(subArea.getPath(), 'insert_at', getPath);
        google.maps.event.addListener(subArea.getPath(), 'remove_at', getPath);
        google.maps.event.addListener(subArea.getPath(), 'set_at', getPath);
    
        function getPath() {
            const path = subArea.getPath();
            const len = path.getLength();
            const tempArray = [];
            for (let i = 0; i < len; i++) {
                const temp = this.getAt(i);
                tempArray.push([temp.lat(), temp.lng()]);
            }
            prop._updatePolygon(tempArray);
        }
    }
    

    _renderNewPolygon(drawingManager) {
        const polygonArray = [];
        const google = window.google;
        const map = this.map;
        const prop = this;
        google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
            drawingManager.setDrawingMode(null);
            // To hide:
            drawingManager.setOptions({
                drawingControl: false
            });
            polygon.setOptions({
                id: 1,
                editable: true,
                draggable: true
            });

            // document.getElementById('info').innerHTML += "polygon points:" + "<br>";
            for (var i = 0; i < polygon.getPath().getLength(); i++) {
                // document.getElementById('info').innerHTML +=  + "<br>";
                // polygonArray.push(polygon.getPath().getAt(i).toUrlValue(6));
                const temp = polygon.getPath().getAt(i);
                polygonArray.push([temp.lat(), temp.lng()]);
            }

            prop._updatePolygon(polygonArray);

            google.maps.event.addListener(polygon, 'click', function () {
                // console.log(this.id + ' ' + this.getPath().getArray().toString());
            });

            google.maps.event.addListener(polygon, 'dragend', function () {
                const tempArray = [];
                this.getPath().getArray().forEach((val) => {
                    tempArray.push([val.lat(), val.lng()]);
                })
                prop._updatePolygon(tempArray);
            });

            google.maps.event.addListener(polygon.getPath(), "insert_at", getPath);
            google.maps.event.addListener(polygon.getPath(), "remove_at", getPath);
            google.maps.event.addListener(polygon.getPath(), "set_at", getPath);

            function getPath() {
                var path = polygon.getPath();
                var len = path.getLength();
                const tempArray = [];
                for (var i = 0; i < len; i++) {
                    const temp = this.getAt(i);
                    tempArray.push([temp.lat(), temp.lng()]);
                    // tempArray.push(this.getAt(i).toUrlValue(6));
                }
                prop._updatePolygon(tempArray);
            }

        });

    }

    initMap = () => {
        const {polygon} = this.props;
        const polygonArray = [];
        const google = window.google;
        // this.google = window.google;
        // Create A Map
        this.map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: constants.MAP_CENTER.lat, lng: constants.MAP_CENTER.lng},
            zoom: 10,
            // styles: tempGoogleMapStyles,
            mapTypeControl: false,
            scaleControl: false,
        });
        const drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                    // google.maps.drawing.OverlayType.MARKER,
                    // google.maps.drawing.OverlayType.CIRCLE,
                    google.maps.drawing.OverlayType.POLYGON,
                    // google.maps.drawing.OverlayType.POLYLINE,
                    // google.maps.drawing.OverlayType.RECTANGLE
                ]
            },
            /* not useful on jsfiddle
            markerOptions: {
              icon: 'images/car-icon.png'
            }, */
            circleOptions: {
                fillColor: '#ffff00',
                fillOpacity: 1,
                strokeWeight: 5,
                clickable: false,
                editable: true,
                zIndex: 1
            },
            polygonOptions: {
                fillColor: '#BCDCF9',
                fillOpacity: 0.5,
                strokeWeight: 2,
                strokeColor: '#57ACF9',
                clickable: true,
                editable: true,
                draggable: true,
                zIndex: 1
            }
        });

        drawingManager.setMap(this.map)
        if (polygon.length > 0) {
            drawingManager.setDrawingMode(null);
            // To hide:
            drawingManager.setOptions({
                drawingControl: false
            });
            this._renderUpdatePolygon();
        } else {
            this._renderNewPolygon(drawingManager);
        }

        this.setState({
            map_rendered: true,
        });

    };


    render() {
        
        return (
            <div>
                <main style={{height: '400px', width: '100%'}}>
                    <div id="map" style={{height: '100%', width: '100%'}}></div>
                </main>

            </div>
        )
    }
}

function loadScript(url) {
    var index = window.document.getElementsByTagName("script")[0];

    var script = window.document.createElement("script");
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}

export default Geofencing;
