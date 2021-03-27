import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FavCard from '../components/favCard';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Snackbar} from 'react-native-paper';
import {FAB} from 'react-native-paper';
import CategoryCard from '../components/categoryCard';
import Modal from 'react-native-modal';
import * as Data from '../data';

export default function Category (props) {
  const navigation = useNavigation ();
  const [categories, setCategoryData] = useState ([]);
  const [visible, setVisible] = useState (false);
  const [snackMessage, setMessage] = useState ('');
  const [isLoading, setLoading] = useState (false);
  const [isModalVisible, setModalVisible] = useState (false);
  const [textData, settextData] = useState ('');
  const toggleModal = function () {
    setModalVisible (!isModalVisible);
  };
  useEffect (
    () => {
      const unsubscribe = props.navigation.addListener ('focus', () => {
        setLoading (true);
        const requestOptions = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        };
        fetch (
          'https://shopany-api.herokuapp.com/api/categories',
          requestOptions
        )
          .then (response => {
            return response.json ();
          })
          .then (responseData => {
            if (responseData.status == 'success') {
              setCategoryData (responseData.categories);
            }
          })
          .catch (error => console.error (error))
          .finally (() => {
            setLoading (false);
          });
      });
      return unsubscribe;
    },
    [props.navigation]
  );

  function updateCat (data) {
    setLoading (true);
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        categoryName: data.categoryName,
      }),
    };
    fetch (
      'https://shopany-api.herokuapp.com/api/category/' + data._id + '/update',
      requestOptions
    )
      .then (response => {
        return response.json ();
      })
      .then (responseData => {
        if (responseData.status == 'success') {
          setCategoryData (responseData.categories);
        }
      })
      .catch (error => console.error (error))
      .finally (() => {
        setLoading (false);
      });
  }
  function deleteCat (data) {
    setLoading (true);
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    fetch (
      'https://shopany-api.herokuapp.com/api/category/' + data._id + '/delete',
      requestOptions
    )
      .then (response => {
        return response.json ();
      })
      .then (responseData => {
        if (responseData.status == 'success') {
          setCategoryData (responseData.categories);
        }
      })
      .catch (error => console.error (error))
      .finally (() => {
        setLoading (false);
      });
  }
  function addCategory () {
    toggleModal ();
    setLoading (true);
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        categoryName: textData,
      }),
    };
    fetch ('https://shopany-api.herokuapp.com/api/category/add', requestOptions)
      .then (response => {
        return response.json ();
      })
      .then (responseData => {
        if (responseData.status == 'success') {
          setCategoryData (responseData.categories);
          settextData ('');
        }
      })
      .catch (error => console.error (error))
      .finally (() => {
        setLoading (false);
      });
  }

  const renderItem = ({item}) => (
    <CategoryCard
      data={item}
      updateCategory={updateCat}
      deleteCategory={deleteCat}
    />
  );
  // if (isLoading) {
  //   return (
  //     <View style={styles.activity}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }
  if (categories.length > 0) {
    return (
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
        <View style={styles.headerContainer}>
          <View style={styles.headerCol}>
            <Text style={styles.appName}>Category Management</Text>
          </View>
        </View>
        <SafeAreaView>
          {isLoading
            ? <View style={styles.activity}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            : <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: 80,
                }}
              />}

        </SafeAreaView>
        <FAB
          style={styles.fab}
          small={false}
          icon="plus"
          onPress={toggleModal}
        />
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
                onPress={addCategory}
              >
                <Text>Add Category</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalContainer}
                onPress={() => {
                  settextData ('');
                  toggleModal ();
                }}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Snackbar
          visible={visible}
          duration={2000}
          onDismiss={() => setVisible (false)}
        >
          {snackMessage}
        </Snackbar>
      </View>
    );
  } else {
    return (
      <View style={styles.Container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerCol}>
            <Text style={styles.appName}>Category Management</Text>
          </View>
        </View>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

          <Text style={{fontWeight: 'bold', fontSize: hp (4)}}>
            Categories is empty!
          </Text>
        </View>
        <FAB
          style={[styles.fab, {bottom: 50}]}
          small={false}
          icon="plus"
          onPress={toggleModal}
        />
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
                onPress={addCategory}
              >
                <Text>Add Category</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalContainer}
                onPress={() => {
                  settextData ('');
                  toggleModal ();
                }}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Snackbar
          visible={visible}
          duration={2000}
          onDismiss={() => setVisible (false)}
        >
          {snackMessage}
        </Snackbar>
      </View>
    );
  }
}
const styles = StyleSheet.create ({
  Container: {
    flexDirection: 'column',
    height: hp (100),
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    elevation: 8,
    height: hp (7),
    width: wp (100),
  },
  headerCol: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  appName: {
    fontSize: 23,
    color: '#000000',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  activity: {
    height: hp (100),
    marginTop:20,
    alignItems: 'center',    
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
