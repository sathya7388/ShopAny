import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Edit from 'react-native-vector-icons/AntDesign';
import Delete from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';

export default function CategoryCard({data,updateCategory,deleteCategory}) {
  const [textData, settextData] = useState (data.categoryName);
  const [isModalVisible, setModalVisible] = useState (false);
  const updateCat = function () {
    toggleModal ();
  };
  const deleteCat = function () {
    deleteCategory(data);
  };
  const toggleModal = function () {
    setModalVisible (!isModalVisible);
  };
  const saveName = function () {
    var tempData = data;
    tempData.categoryName = textData;
    updateCategory(tempData)
    setModalVisible (!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            onChangeText={settextData}
            value={textData}
          />
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={[styles.modalContainer, {backgroundColor: '#66bb6a'}]}
              onPress={saveName}
            >
              <Text>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalContainer}
              onPress={toggleModal}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.cardContainer}>
        <Text>{data.categoryName}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.touchContainer}>
          <Edit
            name="edit"
            onPress={updateCat}
            backgroundColor="#ddd"
            color="black"
            size={21}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchContainer}>
          <Delete
            name="delete-outline"
            onPress={deleteCat}
            backgroundColor="#ddd"
            color="black"
            size={22}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create ({
  container: {
    borderRadius: 8,
    elevation: 5,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    marginVertical: 10,
    width: wp (90),
    height: hp (10),
    flexDirection: 'row',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    flex: 1,
  },
  touchContainer: {
    height: hp (5),
    width: wp (10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  input: {
    borderWidth: 0.3,
    borderRadius: 8,
    color: 'black',
    textAlign: 'center',
  },
  modalView: {
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 20,
    height: hp (20),
    width: wp (90),
    bottom: 0,
    position: 'absolute',
  },
  modalContainer: {
    alignItems: 'center',
    borderRadius: 4,
    justifyContent: 'center',
    width: wp (35),
    height: hp (5),
    backgroundColor: '#ddd',
    marginHorizontal: 10,
    marginVertical: 20,
  },
});
