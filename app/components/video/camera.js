import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class CameraVid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recordStarted: null,
        }
    }

    componentDidMount() {
        this.setState({
            recordStarted: false,
            recording: false,
            processing: false,
        })
    }

    render() {
        const { recording, processing } = this.state;
    
        let button = (
          <TouchableOpacity
            onPress={this.startRecording.bind(this)}
            style={styles.capture}
          >
            <Text style={{ fontSize: 14 }}> RECORD </Text>
          </TouchableOpacity>
        );
    
        if (recording) {
          button = (
            <TouchableOpacity
              onPress={this.stopRecording.bind(this)}
              style={styles.capture}
            >
              <Text style={{ fontSize: 14 }}> STOP </Text>
            </TouchableOpacity>
          );
        }
    
        if (processing) {
          button = (
            <View style={styles.capture}>
              <ActivityIndicator animating size={18} />
            </View>
          );
        }
    
        return (
          <View style={styles.container}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              permissionDialogTitle={"Permission to use camera"}
              permissionDialogMessage={
                "We need your permission to use your camera phone"
              }
            />
            <View
              style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
            >
              {button}
            </View>
          </View>
        );
      }

  startRecording = async function() {
    if (this.camera) {
      const options = { orientation: "landscapeLeft" };
      const data = await this.camera.recordAsync();
      this.setState({
            recordStarted: true,
      });
      console.log("recording strated");
      console.log(data.uri);
    }
  };

  stopRecording() {
      this.camera.stopRecording();
      this.setState({
        recordStarted: false,
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
