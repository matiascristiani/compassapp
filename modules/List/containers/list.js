import React, {Component} from 'react';
import { Platform, View, Text, TextInput, FlatList, StyleSheet, TouchableHighlight, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { SearchBar } from "react-native-elements";

// metodo-1-by-redux
import {connect} from 'react-redux';

// metodo-2-by-async-storage
import { AsyncStorage } from 'react-native';
const STORAGE_KEY = 'points';
export default class List extends Component {

  constructor() {
    super();

    this.state = {
      data: null,
      arrayholder: [],
      valueSearch: '',
      showError: false,
    };

  }

  componentWillMount() {
   
  };
  
  componentDidMount() {
    this._fechItems();
  };

  componentWillUnmount() {

  };

  _fechItems() {
      AsyncStorage.getItem(STORAGE_KEY)
      .then(req => JSON.parse(req))
      .then(array => { 

        if (array && array.length > 0) {
          console.log("success")
          
          this.setState({ 
              data: array,
              arrayholder: array,
              valueSearch: '',
              showError: false,
          });

          console.log(this.state.data);
        }

       }).catch(error => {  console.log('error@_fechItems') });
  }
  
  _onPress() {
    console.log("@OnPress Touchable!")
  }

  _FlatListHeader = () => {
    return (         
        <Grid>
         <Col size={40} style={styles.header}>
           <Text style={styles.headerTextA}>Datetime</Text>
         </Col>
         
         <Col size={20} style={styles.header}>
           <Text style={styles.headerTextA}>LAT</Text>
         </Col>

         <Col size={20} style={styles.header}>
           <Text style={styles.headerTextA}>LONG</Text>
         </Col>

         <Col size={20} style={styles.header}>
           <Text style={styles.headerTextB}>Direction</Text>
         </Col>

      </Grid>
    );
  }

  _FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#dadada",
        }}
      />
    );
  }

  _handleSearch = (textValue) => {
   
      const newData = this.state.arrayholder.filter(item => {      

          const strData = item.direction.toLowerCase();   
          const textData = textValue.toLowerCase();  

          return strData.indexOf(textData) > -1;    
      });
      
      this.setState({ data: newData });  
  };

  render() {
    const {text} =  this.state.valueSearch;
    return (
    
      <Grid style={styles.gridContainer}>
        
        <Row size={10}>
          
          <TextInput
            style={styles.textInputStyle}
            onChangeText={text => this._handleSearch(text)}
            value={text}
            placeholder="Search Direction W,S,N,O here..."
          />

        </Row>

        <Row size={90} style={{alignItems: 'center'}}>
  
            { (this.state.data && this.state.data.length>0)? ( 
                 
                 <FlatList
                  style={{height: '100%'}}
                  data={this.state.data}  
                  enableEmptySections={true}
                  keyExtractor={(item,index) =>  index.toString() }
                  ListHeaderComponent = { this._FlatListHeader }   
                  ItemSeparatorComponent = { this._FlatListItemSeparator }
                  renderItem={({item, index, separators}) => (
                    
                    <TouchableHighlight
                      style={styles.listItem}
                      onPress={() => this._onPress(item)}
                      onShowUnderlay={separators.highlight}
                      onHideUnderlay={separators.unhighlight}>
                      <View>
                        <Grid>
                            <Col>
                              <Text style={styles.colView}>{item.datetime}</Text></Col>
                            <Col>
                              <Text style={styles.colView}>{item.lat}</Text></Col>
                            <Col>
                              <Text style={styles.colView}>{item.long}</Text></Col>
                            <Col>
                              <Text style={styles.colView}>{item.direction}</Text></Col>
                        </Grid>
                      </View>
                    </TouchableHighlight>

                  )}
                />

            ):(
                <Text style={styles.showError}>Ups! Al parecer aun no posees elementos guardados</Text>
            )}

        </Row>

      </Grid>

 

    );
  };
}


const styles = StyleSheet.create({
  gridContainer: {
    height: window.height,
    backgroundColor: '#FFFFFF',
  },
  
  showError: {
    alignItems: 'center',
    color: '#dadada',
  },
  textInputStyle: {
    height: '100%',
    width: '100%',
    paddingLeft: 10,
    backgroundColor: '#FFFFFF',
  },
  
  listItem: {
    padding: 5,
  },

  header: {
      padding: 10, 
      backgroundColor: '#393939', 
      color: '#FFFFFF'
  },

  headerTextA: {padding: 2, color: '#FFFFFF', textAlign: 'left' },
  headerTextB: {padding: 2, color: '#FFFFFF', textAlign: 'center' },
});

