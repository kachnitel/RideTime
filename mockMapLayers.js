const mapLayers = [
   {
    name: 'OpenStreetMap',
    checked: 'true',
    type: 'TileLayer',
    baseLayer: true,
    url: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
    attribution:
      '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
  }
];

export default mapLayers;
