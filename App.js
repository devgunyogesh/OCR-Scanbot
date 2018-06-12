/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button
} from 'react-native';
import {
  ScanbotSDK,
  ScanbotCameraView,
  ScanbotCroppingView,
} from 'react-native-scanbot-sdk';
import { RNCamera } from 'react-native-camera';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      openCam: false,
    }
  }
  componentWillMount() {
    this.initializeSDK();
  }

  initializeSDK() {
    let options = {
      licenseKey: '',
      loggingEnabled: true
    };

    ScanbotSDK.initializeSDK(options, (result) => {
      // Scanbot SDK successfully initialized
      console.log("Scan bot initialized");
      console.log(result);
    }, (error) => {
      // Scanbot SDK initialiation failed
      console.log("Eror of scanbot");
      console.log(error);
    });
  }

  takePicture() {
    if (this.camera) {
      this.camera
        .takePictureAsync()
        .then(data => {
          this.setState({ imagePath: data.uri })
          let sendingOptions = {
            imageFileUris: [data.uri],
            languages: ['en'],
            outputFormat: 'PLAIN_TEXT'
          }
          console.log("sending", sendingOptions)
          ScanbotSDK.performOCR(sendingOptions, (result) => {
            // Scanbot SDK succesfully initialized
            alert("YUP")
            alert(result)
            console.log("OCR Output");
            console.log(result);
          }, (error) => {
            alert("ERRO")

            console.log("OCR Error");
            console.log(error);
          });

          console.log("ENDING")
        })
        .catch(err => {
          alert("err");
          console.log(err);
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
       <Button onPress={() => this.setState({ openCam: true })} title="Click to Click" />
        {this.state.openCam ?
          <View style={styles.container}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              permissionDialogTitle={'Permission to use camera'}
              permissionDialogMessage={'We need your permission to use your camera phone'}
            />
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', }}>
              <TouchableOpacity
                onPress={this.takePicture.bind(this)}
                style={styles.capture}
              >
                <Text style={{ fontSize: 14 }}> SNAP </Text>
              </TouchableOpacity>
            </View>
          </View>

          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});
