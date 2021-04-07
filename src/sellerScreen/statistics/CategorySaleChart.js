import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  TextInput,
  LogBox
} from "react-native";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
} from "victory-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import Filter from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from "react-native-material-dropdown-v2";
import * as Data from "../../data";



export default function CategorySaleChart({data}) {


  const data1 = [
    { "x": "Mobile & Computers", "y": 10 },
    { "x": "Video Games", "y": 20 },
    { "x": "Appliances", "y": 5 },
    { "x": "Sports & Fitness", "y": 30 },
    { "x": "Books", "y": 15 }
  ];

  const [chartData, setChartData] = useState([]);


  const color=["#ff6d00", "#ffde03", "#0336ff", "#27c658", "#ff0266"]

  const timeDropDownData = [
    {value: "week"},
    {value: "month"},
    {value: "All Time"}
  ]

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(timeDropDownData[2].value)
  const [xAxisLabel, setXAxisLabel] = useState([])
  const toggleModal = function () {
    setModalVisible(!isModalVisible);
  };

  const onCancel = function () {
    console.log("cancel");
  };

  useEffect(()=>{
    LogBox.ignoreLogs (['Animated: `useNativeDriver`']);
    setChartData(data)
    let tempArray = []
    data.map((datum) => {
      tempArray.push(datum.x.split(" "))
    })
    setXAxisLabel(tempArray)
    console.log(tempArray)
  }, [data])

  // useEffect(() => {
    function onFilter() {
      console.log("CALLEDDDDD")
      console.log(selectedTime)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
      };

      fetch(
        "https://shopany-api.herokuapp.com/api/seller/"+Data.currentUser[0]._id+"/categoryChart?time="+selectedTime,
        requestOptions
      )
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setChartData(result.categoryChartData)
        toggleModal()
      })
      .catch((error) => console.log("error", error));
    }
// }, [selectedTime]);

  return (
    <View>
      <View style={styles.titleContainer}>
          <Text style={styles.txtPlaceOrder}>Category Wise Sale</Text>
          <TouchableOpacity>
              <Filter
                name="filter"
                onPress={toggleModal}
                backgroundColor="#ddd"
                color="black"
                size={22}
                style={{ marginTop: 20, marginRight: 15 }}
              />
          </TouchableOpacity>
      </View>
      {chartData.length > 0 ? (<VictoryChart height={300}>
        <VictoryBar
          data={(chartData === [] || chartData == null)? data1: chartData}
          alignment="start"
          barRatio={0.75}
          animate={{ duration: 2000, onLoad: { duration: 100 } }}
          style={{
            data: {
              fill: ({ index }) => color[index],
            },
          }}
        />
        <VictoryAxis 
          tickLabelComponent={<VictoryLabel dy={8} dx={15} />}
          // tickFormat={[
          //   ["Mobile &"," Computers"],
          //   ["Video ","Games"],
          //   ["Appliances"],
          //   ["Books"],
          //   ["Sports ","and Fitness"]
          // ]}
           tickFormat = {xAxisLabel}
        />  
           <VictoryAxis
          dependentAxis
          label="Sale"
          style={{ axisLabel: { padding: 32 } }} 
        />   
      </VictoryChart>) : (<View><Text>Loading</Text></View>)}

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
      >
        <View style={styles.modalView}>
          <View>
            <Dropdown
              label="Select Time"
              data={timeDropDownData}
              value={selectedTime}
              rippleCentered={true}
              dropdownPosition={0}
              onChangeText={(item) => setSelectedTime(item)}
              pickerStyle={{
                width: wp(80),
                borderRadius: 8,
                elevation: 8,
              }}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={[styles.modalContainer, { backgroundColor: "#66bb6a" }]}
              onPress={() => onFilter()}
              // onPress={toggleModal}
            >
              <Text>Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalContainer}
              onPress={() => toggleModal()}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}


const styles = StyleSheet.create ({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  txtPlaceOrder: {
    fontSize: 20,
    margin: 15,
    marginBottom: 5,
    fontWeight: "bold"
  },
  modalView: {
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 20,
    height: hp(28),
    width: wp(90),
    top: (Dimensions.get('screen').height/2 - 200),
    position: "absolute",
  },
  modalContainer: {
    alignItems: "center",
    borderRadius: 4,
    justifyContent: "center",
    width: wp(35),
    height: hp(5),
    backgroundColor: "#ddd",
    marginHorizontal: 10,
    marginVertical: 20,
  }
})
