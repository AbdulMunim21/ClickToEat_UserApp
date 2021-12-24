import axios from "axios";
import React from "react";
import RootNavigation from "./navigation/Navigator";

export default function App() {
  return <RootNavigation />;
}

// const API_ENDPOINT = "https://clicktoeat-b46f5-default-rtdb.firebaseio.com/";
// const [data, setData] = useState([]);
// // useEffect(async () => {
// //   var data = await axios.get(`${API_ENDPOINT}users.json`);
// //   setData(data);
// // }, []);
// const getData = async () => {
//   var response = await axios.get(`${API_ENDPOINT}cafe/rating.json`);
//   var resData = response.data;
//   const arr = [];
//   console.log(resData);
//   for (var key in resData) {
//     arr.push(resData[key]);
//   }
//   setData(arr);
// };
// const addData = async () => {
//   await axios.post(`${API_ENDPOINT}cafe/rating.json?auth=AIzaSyBCTbcaYIOInsCTmHJhEjiR7MbAmSsNHj8`, {
//     FirstName: "Abdul",
//     LastName: "Munim",
//     rating: "3",
//   });
//   console.log("Done");
// };
// return (
//   <View style={{ flex: 1, justifyContent: "center" }}>
//     <Button title="Add Data" onPress={addData} />
//     <Button title="Show Data" onPress={getData} />
//     <View style={{ width: "100%", height: "50%" }}>
//       <FlatList
//         data={data}
//         keyExtractor={(item, index) => {
//           return index;
//         }}
//         renderItem={(itemData) => {
//           return (
//             <View>
//               <Text>{itemData.item.FirstName}</Text>
//               <Text>{itemData.item.LastName}</Text>
//               <Text>Rating {itemData.item.rating}</Text>
//             </View>
//           );
//         }}
//       />
//     </View>
//   </View>
// );
