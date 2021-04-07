import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  TextInput,
  LogBox,
} from "react-native";
import { VictoryLegend, VictoryPie } from "victory-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import Filter from "react-native-vector-icons/MaterialCommunityIcons";
import { Dropdown } from "react-native-material-dropdown-v2";
import * as Data from "../../data";

export default function RevenueChart({data, categories}) {
  const pieData = [
    { x: "10K", y: 10 },
    { x: "20K", y: 20 },
    { x: "5K", y: 5 },
    { x: "30K", y: 30 },
    { x: "15K", y: 15 },
  ];

  const pieLegendName = [
    { name: "Mobile & Computers" },
    { name: "Video Games" },
    { name: "Appliances" },
    { name: "Sports & Fitness" },
    { name: "Books" },
  ];

  const color = ["#ff6d00", "#ffde03", "#0336ff", "#27c658", "#ff0266"];

  const dropData = [
    {value: "Mobile & Computer"},
    {value: "Video Games"},
    {value: "Appliances"},
    {value: "Sports & Fitness"},
    {value: "Books"}
  ]

  const timeDropDownData = [
    { value: "week" },
    { value: "month" },
    { value: "All Time" },
  ];

  const [chartData, setChartData] = useState([]);
  const [legendData, setLegentData] = useState([])
  const [isModalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState([])
 
  const [categoryLabel, setCategoryLabel] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(categoryLabel.length > 0 ? categoryLabel[0].value : '')
  const [selectedTime, setSelectedTime] = useState(timeDropDownData[2].value)


  const toggleModal = function () {
    setModalVisible(!isModalVisible);
  };

  const onCancel = function () {
    console.log("cancel");
  };

  useEffect(() => {
    LogBox.ignoreAllLogs()
    setChartData(data.data)
    setLegentData(data.productName)
    setCategory(categories)
    let tempArray = []
    categories.map((cat) => {
      return tempArray.push({value: cat.categoryName})
    })
    setCategoryLabel(tempArray)
  }, [data]);

  useEffect(()=> {
    if(categoryLabel.length > 0) {
      setSelectedCategory(categoryLabel[0].value)
    }
  }, [categoryLabel])

  function findCategoryId() {
    for(i = 0; i< category.length; i++) {
      if(selectedCategory == category[i].categoryName) {
          return category[i]._id
      }
    }
  }

  // useEffect(() => {
  function onFilter() {
    if(selectedCategory != '') {
      console.log("CALLEDDDDD")
      console.log(selectedTime)
      console.log(findCategoryId())
      console.log(selectedCategory)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
      };

      fetch(
        "https://shopany-api.herokuapp.com/api/seller/"+Data.currentUser[0]._id+"/revenueChart?time="+selectedTime+"&category="+findCategoryId(),
        requestOptions
      )
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setChartData(result.pieChart.data)
        setLegentData(result.pieChart.productName)
        toggleModal()
      })
      .catch((error) => console.log("error", error));
    }
  }
  // }, [selectedCategory, selectedTime]);


  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={{ ...styles.txtPlaceOrder, marginTop: 55 }}>Revenue</Text>
        <TouchableOpacity>
          <Filter
            name="filter"
            onPress={toggleModal}
            backgroundColor="#ddd"
            color="black"
            size={22}
            style={{ marginTop: 58, marginRight: 15 }}
          />
        </TouchableOpacity>
      </View>
      {chartData.length > 0 ? (<View style={{alignItems:'center',justifyContent:'center'}}>
        <VictoryPie
          width={wp(90)}
          // x={100}
          data={chartData}
          alignment="start"
          animate={{ duration: 2000 }}
          style={{
            
            data: {
              fill: ({ index }) => color[index],
            },
            labels: {
              fontWeight: "bold",
            },
          }}
        />
        <VictoryLegend
          x={Dimensions.get("screen").width / 2 - 80}
          y={10}
          colorScale={color}
          orientation="vertical"
          gutter={15}
          style={{ title: { fontSize: 20 } }}
          data={legendData}
        />
      </View>) : (<View></View>)}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
      >
        <View style={styles.modalView}>
          <View>
            <Dropdown
              label="Select Category"
              data={categoryLabel}
              value={selectedCategory}
              rippleCentered={true}
              dropdownPosition={0}
              onChangeText={(item) => setSelectedCategory(item)}
              pickerStyle={{
                width: wp(80),
                borderRadius: 8,
                elevation: 8,
              }}
            />
          </View>
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
              onPress={()=>onFilter()}
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

const styles = StyleSheet.create({
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  txtPlaceOrder: {
    fontSize: 20,
    margin: 15,
    marginBottom: 5,
    fontWeight: "bold",
  },
  modalView: {
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 20,
    height: hp(40),
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
  },
});
