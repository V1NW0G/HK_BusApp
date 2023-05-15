import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';


function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [routeJson , setRouteJson] = useState(null);
  const navigation = useNavigation();

  const fetchRoute = async() => {
    await axios.get(`https://data.etabus.gov.hk/v1/transport/kmb/route/`)
    .then(response => {
      const {data} = response.data;
      setRouteJson(data);
      setResults(data);
    })
    .catch(error => {
      console.error(error);
    });
  }

  //searching with route or destination
  const handleSearch = text => {
    setQuery(text);

    if (/^\d+|[a-zA-Z0-9]+$/g.test(text)) {
        const filteredData = routeJson.filter(item =>
            item.route.includes(text)
        );
        setResults(filteredData);
    } else {
        const filteredData = routeJson.filter(item =>
            item.dest_tc.includes(text)
        );
        setResults(filteredData);
    }
};

  useEffect(() => {
    fetchRoute();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={{ width:"95%",height: 45, borderColor: 'lightgray', borderWidth: 1, padding: 10, borderRadius:10, alignSelf:"center"}}
        placeholder="輸入路線或目的地..."
        placeholderTextColor={"#a39b9b"}
        color={"black"}
        value={query}
        onChangeText={handleSearch}
      />
      <FlatList
        data={results}
        // keyExtractor={item => item.route.toString()}
        renderItem={({ item }) => (
        <TouchableOpacity
        activeOpacity={0.8}

        onPress={() => navigation.navigate("Detail", { 
            route: item.route,
            serviceType: item.service_type,
            stopId: "BFA3460955AC820C",
            bound: item.bound,
            destination: item.dest_tc
        })}>

          <View style={styles.itemContainer}>
            <Text style={styles.routeText}>{item.route}</Text>
            <Text style={styles.disText}>由</Text> 
            <Text style={styles.destText}>{item.orig_tc}</Text>
            <Text style={styles.disText}>往</Text>
            <Text style={styles.destText}>{item.dest_tc}</Text> 
          </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    itemContainer: {
      flexDirection: "row",
      borderColor: "lightgray",
      borderBottomWidth: 0.5,
      padding: 10,
      paddingTop: 15,
      paddingBottom:15,
      paddingLeft: 20,
      paddingRight: -30,
    },

    routeText: {
      fontSize: 18,
      fontWeight: "bold",
      paddingRight: 50,
      color: "black"
    },

    destText: {
      fontSize: 18,
      paddingRight: 10,
      color: "black"
    },

    disText: {
      fontSize: 13,
      alignSelf: "flex-end",
      paddingRight: 5,
      color: "gray"
      
    }


})

export default SearchScreen;