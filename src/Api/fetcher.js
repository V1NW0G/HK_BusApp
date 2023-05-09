import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const filterFetchStop = async() => {
    const response = await axios.get(`https://data.etabus.gov.hk/v1/transport/kmb/stop`)
    const filteredStop = response.data.data.filter(
        (response) => getDistanceFromLatLonInKm(response.lat,response.long,userLatLong.latitude,userLatLong.longitude) <= 0.5)
    const stops = filteredStop.map((stop) => stop.stop);
    console.log("entered query")
    return stops
}

export const UseGetFetchStop = () =>{
    const {isLoading,stops} = useQuery(['AllStop'],filterFetchStop);
    return stops,isLoading;
}

