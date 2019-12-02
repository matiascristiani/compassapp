import React, {Component} from 'react';
import { Platform, Alert, View, Text, TextInput, FlatList, StyleSheet, TouchableHighlight, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';

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
          array.forEach((item)=>{
            let date = new Date(item.datetime);
            let minutes = (date.getMinutes()<10? '0':'') + date.getMinutes();
            item.datestring = date.getDate() +'/'+ (date.getMonth()+1) +'/'+ date.getFullYear() + ' - ' + date.getHours() +':'+minutes;
          })
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
  
  _onPress(item) {
    console.log("@OnPress")
    
    Alert.alert(
      ('['+item.direction+'] Lat and Longitude'),
      'LAT ('+item.lat+')\n LONG ('+item.long+').',
      [
        { text: 'Perfect!', onPress: () => console.log('pressed') },
      ],
      { cancelable: false }
    );


  }

  _FlatListHeader = () => {
    return (         
        <Grid>

          <Col size={10} style={styles.headerD}>
           <Text style={styles.headerTextD}>DIR</Text>
         </Col>

         <Col size={40} style={styles.headerA}>
           <Text style={styles.headerTextA}>DATE</Text>
         </Col>
         
         <Col size={25} style={styles.headerB}>
           <Text style={styles.headerTextB}>LAT</Text>
         </Col>

         <Col size={25} style={styles.headerC}>
           <Text style={styles.headerTextC}>LONG</Text>
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
        
        <Row size={10} style={styles.searchContainer}>
          
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
                      <View style={styles.ViewList}>
                        <Grid>
                            <Col size={10}>
                              <Text>{item.direction}
                              </Text></Col>

                            <Col size={40}>
                              <Text>{item.datestring}
                              </Text></Col>

                            <Col size={25}>
                              <Text numberOfLines = { 1 } ellipsizeMode = 'tail'>
                              {item.lat}
                              </Text></Col>
                              
                            <Col size={25}>
                              <Text numberOfLines = { 1 } ellipsizeMode = 'tail'>
                              {item.long}
                              </Text></Col>
                            
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
  
  searchContainer: {
    backgroundColor: '#DADADA',
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
  
 

  headerA: {
      paddingTop: 5, 
      paddingBottom: 5, 
      textAlign: 'left',
      backgroundColor: '#393939', 
      color: '#FFFFFF'
  },
  headerTextA: {fontSize: 14, paddingLeft: 5, color: '#FFFFFF', textAlign: 'left' },

  headerB: {
      paddingTop: 5, 
      paddingBottom: 5, 
      textAlign: 'left',
      backgroundColor: '#393939', 
      color: '#FFFFFF'
  },
  headerTextB: {fontSize: 14, paddingLeft: 5, color: '#FFFFFF', textAlign: 'left' },

  headerC: {
      paddingTop: 5, 
      paddingBottom: 5, 
      textAlign: 'left',
      backgroundColor: '#393939', 
      color: '#FFFFFF'
  },
  headerTextC: {fontSize: 14, paddingLeft: 5, color: '#FFFFFF', textAlign: 'left' },

  headerD: {
      paddingTop: 5, 
      paddingBottom: 5, 
      textAlign: 'center',
      backgroundColor: '#393939', 
      color: '#FFFFFF'
  },
  headerTextD: {fontSize: 14, color: '#FFFFFF', textAlign: 'center' },

  
  ViewList: {
    padding: 10,
  },

  listItem: {
  },

 
});

