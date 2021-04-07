import {View, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import CategorySaleChart from './statistics/CategorySaleChart';
import ProductSaleChart from './statistics/ProductSaleChart';
import RevenueChart from './statistics/RevenueChart';
import {Avatar} from 'react-native-elements';
import {useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as Data from '../data';

export default function ReportScreen({navigation}) {
  const [data, setData] = useState ({
    pieChart: {
      data: [],
      productName: [],
    },
    productChartData: [],
    categoryChartData: [],
    categories: [],
  });
  const [isLoading, setLoading] = useState (false);

  const count = 0;

  useEffect (
    () => {
      const unsubscribe = navigation.addListener ('focus', () => {
        setLoading (true);
        var myHeaders = new Headers ();
        myHeaders.append ('Content-Type', 'application/json');

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
        };

        fetch (
          'https://shopany-api.herokuapp.com/api/seller/' +
            Data.currentUser[0]._id +
            '/homeStats',
          requestOptions
        )
          .then (response => response.json ())
          .then (result => {
            setData (result);
          })
          .catch (error => console.log ('error', error));
      });
      return unsubscribe;
    },
    [navigation]
  );

  return (
    <View style={styles.Container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerCol}>
          <Text style={styles.appName}>Statistics</Text>
          <View style={{flex: 1}}>
            <Avatar
              size="small"
              rounded
              title={Data.currentUser[0].name.charAt (0).toUpperCase ()}
              containerStyle={{
                backgroundColor: 'gray',
              }}
              onPress={() => navigation.navigate ('ProfileScreen')}
            />
          </View>
        </View>
      </View>
      <ScrollView>
        {data.productChartData.length > 0
          ? <View>
              <CategorySaleChart data={data.categoryChartData} />
              <ProductSaleChart
                data={data.productChartData}
                categories={data.categories}
              />
              <RevenueChart data={data.pieChart} categories={data.categories} />
            </View>
          : <View>
              <Text>Loading..</Text>
            </View>}
      </ScrollView>
    </View>
  );
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
    alignItems: 'center',
    marginLeft: 20,
    flexDirection: 'row',
    flex: 1,
  },
  appName: {
    fontSize: 23,
    color: '#000000',
    flex: 5,
  },
});
