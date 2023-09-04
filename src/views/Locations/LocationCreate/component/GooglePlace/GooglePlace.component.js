import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";
import classnames from "classnames";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "./GoogolePlace.module.css";
import Constants from "../../../../../config/constants";
import GoogleMapsUtils from "../../../../../libs/GoogleMapsUtils";
import LogUtils from "../../../../../libs/LogUtils";

class GooglePlaceComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      errorMessage: "",
      latitude: null,
      longitude: null,
      isGeocoding: false,
      map_loaded: false,
    };
    this.map = null;
    this.marker = null;
    this._smoothZoom = this._smoothZoom.bind(this);
    this.initializeMap = this.initializeMap.bind(this);
    this.geoCodePosition = this.geoCodePosition.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentWillMount() {
    const { lat, lng } = this.props;
    if (lat && lng) {
      this.setState({
        latitude: lat,
        longitude: lng,
      });
    }
  }

  componentDidMount() {
    console.log("googlemap mounted");
    window.initializeMap = this.initializeMap;
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${Constants.GOOGLE_MAP_KEY}&libraries=places&callback=initializeMap&region=IN`);
  }

  // componentWillUnmount() {
  //   removeScript();
  // }

  _smoothZoom(map, max, cnt) {
    const prop = this;
    if (cnt >= max) {
      return;
    } else {
      this.z = window.google.maps.event.addListener(
        map,
        "zoom_changed",
        function (event) {
          window.google.maps.event.removeListener(prop.z);
          prop._smoothZoom(map, max, cnt + 1);
        }
      );
      setTimeout(function () {
        map.setZoom(cnt);
      }, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
    }
  }

  callCenter(data) {
    console.log("Google map", data);
    if (window.google && this.map) {
      var location = new window.google.maps.LatLng(data[0], data[1]);
      // this.map.setZoom(14);
      this.map.panTo(location);
      this._smoothZoom(this.map, 14, this.map.getZoom());
    }
  }

  initializeMap() {
    const { latitude, longitude } = this.state;
    if (!this.state.map_loaded) {
      this.setState(
        {
          map_loaded: true,
        },
        () => {
          const google = window.google;
          this.map = new window.google.maps.Map(
            document.getElementById("map2"),
            {
              center: { lat: 30.6942, lng: 76.8606 },
              zoom: 12,
              // styles: tempGoogleMapStyles
            }
          );
          this.marker = new window.google.maps.Marker({
            position: { lat: 30.6942, lng: 76.8606 },
            map: this.map,
            title: "Restaurant Location",
            draggable: true,
          });
          const prop = this;
          this.marker.addListener("dragend", function (evt) {
            prop.geoCodePosition(
              prop.marker.getPosition(),
              evt.latLng.lat(),
              evt.latLng.lng()
            );
          });
          if (latitude && longitude) {
            const latLng = new window.google.maps.LatLng(latitude, longitude);
            prop.geoCodePosition(latLng, latitude, longitude);
            this.marker.setPosition(latLng);
            this.callCenter([latitude, longitude]);
          }
        }
      );
    }
  }
  handleChange = (address) => {
    this.setState({
      address,
      latitude: null,
      longitude: null,
      errorMessage: "",
    });
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.state.latitude != prevState.latitude &&
      this.state.longitude != prevState.longitude
    ) {
      if (this.state.latitude && this.state.longitude) {
        this.props.updateAddress(
          this.state.latitude,
          this.state.longitude,
          this.state.address
        );
      }
    }
  }

  geoCodePosition(pos, lat, lng) {
    console.log(pos);
    const prop = this;
    const google = window.google;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        latLng: pos,
      },
      function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          prop.props.handelCityCountry(
            GoogleMapsUtils.getCityCountryFromAddress(results[0])
          );
          prop.setState({
            address: results[0].formatted_address,
            latitude: lat,
            longitude: lng,
          });
        }
      }
    );
  }
  handleSelect = (selected) => {
    this.setState({ isGeocoding: true, address: selected });
    geocodeByAddress(selected)
      .then((res) => {
        const address = res[0];
        this.props.handelCityCountry(
          GoogleMapsUtils.getCityCountryFromAddress(address)
        );
        return getLatLng(res[0]);
      })
      .then(({ lat, lng }) => {
        this.setState({
          latitude: lat,
          longitude: lng,
          isGeocoding: false,
        });
        if (this.map) {
          if (this.marker) {
            var newLatLng = new window.google.maps.LatLng(
              parseFloat(lat),
              parseFloat(lng)
            );
            this.marker.setPosition(newLatLng);
          } else {
          }
          this.callCenter([lat, lng]);
        }
      })
      .catch((error) => {
        this.setState({ isGeocoding: false });
        console.log("error", error); // eslint-disable-line no-console
      });
  };

  handleCloseClick = () => {
    this.setState({
      address: "",
      latitude: null,
      longitude: null,
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log("Error from Google Maps API", status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  render() {
    console.log("window.google", window.google);
    if (this.state.map_loaded) {
      const { address, errorMessage, latitude, longitude, isGeocoding } =
        this.state;

      return (
        <div className={"googlePlaceContainer"}>
          <PlacesAutocomplete
            onChange={this.handleChange}
            value={address}
            onSelect={this.handleSelect}
            onError={this.handleError}
            shouldFetchSuggestions={address.length > 2}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => {
              return (
                <div className="Demo__search-bar-container">
                  <div className="Demo__search-input-container">
                    <input
                      {...getInputProps({
                        placeholder: "Search Places...",
                        className: "Demo__search-input",
                      })}
                    />
                    {this.state.address.length > 0 && (
                      <button
                        className="Demo__clear-button"
                        onClick={this.handleCloseClick}
                      >
                        x
                      </button>
                    )}
                  </div>
                  {suggestions.length > 0 && (
                    <div className="Demo__autocomplete-container">
                      {suggestions.map((suggestion) => {
                        const className = classnames("Demo__suggestion-item", {
                          "Demo__suggestion-item--active": suggestion.active,
                        });

                        return (
                          /* eslint-disable react/jsx-key */
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                            })}
                          >
                            <strong>
                              {suggestion.formattedSuggestion.mainText}
                            </strong>{" "}
                            <small>
                              {suggestion.formattedSuggestion.secondaryText}
                            </small>
                          </div>
                        );
                        /* eslint-enable react/jsx-key */
                      })}
                      <div className="Demo__dropdown-footer">
                        <div>
                          {/*<img*/}
                          {/*    src={require('../images/powered_by_google_default.png')}*/}
                          {/*    className="Demo__dropdown-footer-image"*/}
                          {/*/>*/}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }}
          </PlacesAutocomplete>
          {errorMessage.length > 0 && (
            <div className="Demo__error-message">No Result Found</div>
          )}

          <main style={{ height: "300px", flex: 1 }}>
            <div id="map2" style={{ height: "100%", width: "100%" }}></div>
          </main>
        </div>
      );
    } else {
      return (
        <div>
          <CircularProgress />
        </div>
      );
    }
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  // console.log(index.getAttribute('src'));
  if (index.getAttribute("src").indexOf("google") < 0) {
    var script = window.document.createElement("script");
    script.src = url;
    // script.async = true
    // script.defer = true
    index.parentNode.insertBefore(script, index);
  } else {
    LogUtils.log('google script not found')
    window.initializeMap();
  }
}

// function removeScript() {
//   var index = window.document.getElementsByTagName("script")[0];
//   if (index.getAttribute("src").indexOf("google") >= 0) {
//     index.remove();
//   }
// }

export default GooglePlaceComponent;
