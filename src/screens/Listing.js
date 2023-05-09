import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, ScrollView, RefreshControl} from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import GetLocation from 'react-native-get-location'

// import { getLocales } from "react-native-localize";

const Listing = () => {
  const [userLatLong, setUserLatLong] = useState(null)
  const [stop, setStop] = useState(["BFA3460955AC820C","5FB1FCAF80F3D97D"]);
  const [stopJson, setStopJson] = useState(null);
  const [data,setData] = useState([]);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const filterFetchStop = async() => {
    await axios.get(`https://data.etabus.gov.hk/v1/transport/kmb/stop`)
    .then(response => {
      const filteredStop = response.data.data.filter(
        (response) => getDistanceFromLatLonInKm(response.lat,response.long,userLatLong.latitude,userLatLong.longitude) <= 0.5)
      
        const stops = filteredStop.map((stop) => stop.stop);
        setStop(stops);
        // console.log(stops)
        
    })
    .catch(error => {
      console.error(error);
    });
  }

    const fetchData = async () => {
      const requests = stop.map(stopId => axios.get(`https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/${stopId}`));
      const responses = await Promise.all(requests);
      const responseData = responses.map(response => response.data.data);
      const mergedData = responseData.flat(); // merge data from both bus stops into a single array
      setData(mergedData);
    }

    function formatEtaDate(dateString,remark) {
      if(dateString != null){
        const current = moment();
        const diff = moment.duration(moment(dateString).diff(current)); 
        const minutes = diff.asMinutes();
        const minutesLeft = Math.floor(minutes)
        if(minutesLeft<=0){
          return "-- mins"
        }
        return minutesLeft+" mins"
      }else{ //show error if no bus

        if(remark != ""){
          // return remark
          return "⛔"

        }else{
          // return "沒有預定班次"
          return "⛔️"
        }
      }
    }
    

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  //get user Location
  const getGeolocation = () =>{
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 6000,
    })
    .then(location => {
      // console.log(location)
      const {latitude, longitude} = location;
      setUserLatLong({latitude, longitude});
      console.log(userLatLong)
    })
    .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
    })

  }

  //count user to stop distance
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    // console.log(d)
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  useEffect(() => {
    getGeolocation(); 
    filterFetchStop();   
    fetchData();
  }, [refreshing]);



  return (
    <View style={styles.container}>
        
        <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            
            {data.map(item => (
                <TouchableOpacity 
                    activeOpacity={0.8}
                
                    onPress={() => navigation.navigate("Detail", { 
                        route: item.route,
                        serviceType: item.service_type,
                        stopId: "BFA3460955AC820C",
                        bound: item.dir,
                        destination: item.dest_tc
                    })}>
                      
              
                    {item.eta_seq === 1 && (
                    <View style={styles.itemContainer}>
                        <Text style={styles.routeText}>{item.route}</Text>
                        <Text style={styles.destText}>{item.dest_tc}</Text>
                        
                        <Text style={styles.etaText}>{formatEtaDate(item.eta,item.rmk_tc)}</Text>
                        <Text> </Text>
                    </View>
                    )}
                </TouchableOpacity>
            ))}
            
        </ScrollView>
       

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    itemContainer: {
      flexDirection: "row",
      borderColor: "lightgray",
      borderBottomWidth: 0.5,
      justifyContent: "space-between",
      padding: 10,
      paddingTop: 15,
      paddingBottom:15,
      paddingLeft: 20,
      paddingRight: -30,
    },

    routeText: {
      fontSize: 20,
      fontWeight: "bold"
    },

    destText: {
      fontSize: 20,
      paddingLeft: 40

    },

    etaText: {
      fontSize: 20,
      paddingLeft: 50
    }


});

export default Listing;