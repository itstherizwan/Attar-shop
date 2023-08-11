import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { getMyOrders } from "../Redux/Actions/OrderAction";
import { FlatList } from "react-native";
import orderPng from '../assets/order.png'
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Loader from "./Loader";

const MyOrder = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { orders, loading, error } = useSelector((state) => state.myOrder);
  
 
  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
      });
    }

    dispatch(getMyOrders());
  }, [dispatch, error]);

  const renderOrderItem = ({ item }) => {
    const createdAtDate = new Date(item.createdAt);
    const formattedCreatedAt = createdAtDate.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    const handleOrderPress = () => {
        // Navigate to OrderDetailsScreen with the order ID as a parameter
        navigation.navigate('OrderDetails', { orderId: item._id });
      };
    return (
      <>
      {loading ? (
        <Loader/>
      ):(<TouchableOpacity onPress={handleOrderPress}>
        <View style={styles.orderItem}>
          <Text style={styles.text}> {item.orderStatus}</Text>
            <Image source={orderPng} style={styles.itemImage} />
          <Text style={styles.heading}>Order ID: {item._id}</Text>
          <Text style={styles.text}>Name: {item.user.name}</Text>
          <Text style={styles.text}>Total Amount: Rs.{item.totalAmount}</Text>
          <Text style={styles.text}>Order Date: {formattedCreatedAt}</Text>
          {/* Add more fields as needed */}
          
        </View>
        </TouchableOpacity>)}
        </>
      );
    };
  
    return (
        <View style={styles.container}>
          <FlatList
            data={orders}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item._id}
          />
        </View>
      );
    };

export default MyOrder;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      padding: 10,
    },
    orderItem: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 16,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    heading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333',
    },
    text: {
      fontSize: 16,
      marginBottom: 6,
      color: '#555',
    },
    itemImage: {
      width: 120,
      height: 120,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginTop: 20,
    },
  });
  
