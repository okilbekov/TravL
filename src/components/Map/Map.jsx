import React from "react"
import GoogleMapReact from "google-map-react"
import { Paper, Typography, useMediaQuery } from "@material-ui/core"
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined"
import { Rating } from "@material-ui/lab"

import useStyles from './styles'
import mapStyles from "./mapStyles"

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData }) => {
  const classes = useStyles()
  const isMobile = useMediaQuery("(max-width:600px)")

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(event) => {
          setCoordinates({ lat: event.center.lat, lng: event.center.lng })
          setBounds({ ne: event.marginBounds.ne, sw: event.marginBounds.sw })
        }}
        onChildClick={(child) => {
          setChildClicked(child)
        }}
      >
        {places?.map((place, index) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={index}
          >
            {
              isMobile ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper className={classes.paper} elevation={3}>
                  <Typography className={classes.typography} gutterBottom variant="subtitle2">
                    {place.name}
                  </Typography>
                  <img 
                    className={classes.pointer}
                    src={place.photo? place.photo.images.large.url : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"}
                    alt={place.name}
                  />
                  <Rating size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )
            }
          </div>
        ))}
        {weatherData?.list?.map((data, i) => (
          <div
            key={i}
            lat={data.coord.lat}
            lng={data.coord.lon}
          >
            <img height={100} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt='weather icon' />
          </div>
        ))}
      </GoogleMapReact>

    </div>
  )
}

export default Map
