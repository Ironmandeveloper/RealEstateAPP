import {useCallback} from 'react';
import React, {useRef} from 'react';
import {Text, TouchableOpacity, UIManager} from 'react-native';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';

export default function Check(props) {
  const ref = useRef();
  const onCapture = useCallback(uri => {
    ref.current.capture().then(uri => {
      console.log('do something with ', uri);
      Share.open({message: 'Result', url: uri})
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log('error', err);
        });
    });
  }, []);

  return (
    <TouchableOpacity onPress={() => onCapture()}>
      <ViewShot
        ref={ref}
        options={{fileName: 'Captured', format: 'jpg', quality: 0.9}}>
        {props.children}
      </ViewShot>
    </TouchableOpacity>
  );
}
