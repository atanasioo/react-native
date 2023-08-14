import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StatusBar, StyleSheet, Text, View, Modal } from 'react-native';

const App = () => {
  const [data, setData] = useState([]);
  const API_URL = 'http://localhost:3000/';
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getid();
  }, []);

  const getid = async () => {
    try {
      const response = await fetch(API_URL);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => {
              setSelectedItem(item);
              setModalVisible(true);
            }}
          >
            <Text style={styles.textStyle}>{item.name}</Text>
          </Pressable>
        )}
      />

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedItem && (
                            <>
                            <Text style={styles.modalText}>{selectedItem.id}</Text>
                            <Text style={styles.modalText}>{selectedItem.name}</Text>
                            <Text style={styles.modalText}>{selectedItem.phone}</Text>
                            <Text style={styles.modalText}>{selectedItem.address}</Text>
                            </>
            )}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Hide Data</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 15,
    marginHorizontal: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor: 'black',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
