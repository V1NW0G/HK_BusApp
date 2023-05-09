# HK_BusApp

### Install
<hr>

```
npm install @react-navigation/stack
npm install @react-navigation/native
npm install @react-navigation/bottom-tabs
npm i react-native-axios
npm i react-native-geolocation-service
npm i react-native-maps
npm i moment
```
</br>
### Set Up
<hr>

### Simulator SetUp

#### Android Studio
You might need to change the path in this file in order to run the simulator. 
```../BusApp/android/local.properties```</br>
Also please choose an Android simulator have Google Play service, or you might not able to run the map.


### Simulator Location Setup, in order to use the nearby Bus stop feature

#### iOS
<ul>
<li>Run app in iOS simulator.</li>
<li>At the top menu bar, you'll find Features -> Location -> Custom Location..(or you can choose to use others).</li>
<li>Set the Latitude & Longitude for the location.</li>
</ul>

#### Android
<ul>
<li>Run app in Android emulator.</li>
<li>Click on the ellipsis (...) in the toolbar.</li>
<li>Edit the coordinates in the newly opened settings under Location.</li>
</ul>

</br></br>
### Usage
<hr>

```
npx react-native run-android	//for android
npx react-native run-ios	//For iOS
```
There might be some axios network bug on First page, you might simply ctrl + s the page to refresh it.
</br></br>

### Discussion
<hr>

I have seperated the whole App into ```Detail.js```, ```Listing.js``` and```Seach.js``` 

```Listing.js``` initially will show the Stop of stop id BFA3460955AC820C & 5FB1FCAF80F3D97D. </br>
After pull down refresh, the useState will updated with the stop id filtered by Haversine formula, comparing User and stops lat,long and sorting bus stops within user's 500m range.</br>
ETA time are convert by moment js library, from ISO time format to Mins</br>
<div><img src = "https://github.com/V1NW0G/HK_BusApp/blob/main/img/Listing_an.png" height= 500>
<img src = "https://github.com/V1NW0G/HK_BusApp/blob/main/img/listing_ios.png" height= 500>
<img src = "https://github.com/V1NW0G/HK_BusApp/blob/main/img/locationpermission.png" height= 500><div/></br>
As I am living in SSP, so I set my simulator location to ssp and shown all nearby stops

<hr>

```Seach.js```  Allows you to search through route number and destination by using Regex.</br>
<img src = "https://github.com/V1NW0G/HK_BusApp/blob/main/img/search.png" height= 500></br>
</br>
#### Route Search</br><hr>

<div><img src = "https://github.com/V1NW0G/HK_BusApp/blob/main/img/search_3.png" height= 500>
<img src = "https://github.com/V1NW0G/HK_BusApp/blob/main/img/search_n21.png" height= 500><div/>
  
#### Destination Search </br><hr>

<div><img src = "https://github.com/V1NW0G/HK_BusApp/blob/main/img/search_tw.png" height= 500>
<img src = "https://github.com/V1NW0G/HK_BusApp/blob/main/img/search_tst.png" height= 500><div/>

</br>
### Detail Page
<hr>
I used react native map for the map function. I have add a google android map sdk api to the Android native module to make the map work in Android.
<div><img src = "https://github.com/V1NW0G/HK_BusApp/blob/main/img/detail_ios1.png" height= 500>
<img src = "https://github.com/V1NW0G/HK_BusApp/blob/main/img/detail_ios.png" height= 500>
<img src = "https://github.com/V1NW0G/HK_BusApp/blob/main/img/detail_an.png" height= 500><div/>
  
The corresponsiding eta will show on the accordion menus pops down on the Station name tab. Map will show the destination of that station.

</br>
The app also support both iOS and Android platform</br>
<img src = "https://github.com/V1NW0G/HK_BusApp/blob/main/img/Listing_an.png" height= 500>
<img src = "https://github.com/V1NW0G/HK_BusApp/blob/main/img/listing_ios.png" height= 500>