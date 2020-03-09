import React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {offerType} from '../../types/offers-types.js';
import {MapSettings} from '../../../const.js';

class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this.mapRef = React.createRef();

    this.mapConfig = {
      center: this.props.city,
      zoom: MapSettings.ZOOM,
      zoomControl: false,
      marker: true
    };

    this.icon = leaflet.icon({
      iconUrl: MapSettings.ICON_URL,
      iconSize: MapSettings.ICON_SIZE,
    });

    this.markers = [];
  }

  componentDidMount() {
    this.map = leaflet.map(this.mapRef.current, this.MapConfig);
    this.map.setView(this.props.city, MapSettings.ZOOM);

    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this.map);
    this.addMarkers();

  }

  componentDidUpdate(prevProps) {
    if (prevProps.city !== this.props.city) {
      this.clearMarkers();
      this.map.setView(this.props.city, MapSettings.ZOOM);
      this.addMarkers();
    }
  }

  addMarkers() {
    this.props.offers.forEach((offer) => {
      const marker = leaflet
        .marker(offer.coords, this.icon)
        .addTo(this.map);
      this.markers.push(marker);
    });
  }

  clearMarkers() {
    if (this.map !== null) {
      this.markers.forEach((marker) => {
        this.map.removeLayer(marker);
      });
    }
    this.markers = [];
  }

  render() {
    return (
      <section className="cities__map map" id="map" ref={this.mapRef}></section>
    );
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(offerType).isRequired,
  city: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Map;