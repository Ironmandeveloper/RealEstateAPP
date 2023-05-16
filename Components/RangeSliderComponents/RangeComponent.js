import React, {useCallback, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Slider from 'rn-range-slider';
import Label from './Label';
import Notch from './Notch';
import Rails from './Rails';
import RailSelected from './RailSelected';
import Thumbs from './Thumbs';

const RangeComponent = () => {
  const [rangeDisabled, setRangeDisabled] = useState(false);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(200);
  const [floatingLabel, setFloatingLabel] = useState(false);

  const renderThumb = useCallback(name => <Thumbs name={name} />, []);
  const renderRail = useCallback(() => <Rails />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((lowValue, highValue) => {
    console.log('====================================');
    console.log(lowValue, highValue);
    console.log('====================================');
    setLow(lowValue);
    setHigh(highValue);
  }, []);

  return (
    <ScrollView>
      <View style={styles.root}>
        <View style={styles.header}>
          <Text style={styles.text}>Range slider demo</Text>
        </View>
        <Slider
          style={styles.slider}
          min={min}
          max={max}
          step={1}
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderLabel={renderLabel}
          renderNotch={renderNotch}
          //   onValueChanged={(low, high) => handleValueChange(low, high)}
          onValueChanged={(low, high) => console.log('===>>', low, high)}
        />
        <View style={styles.horizontalContainer}>
          <Text style={styles.valueText}>{low}</Text>
          <Text style={styles.valueText}>{high}</Text>
        </View>
        <View style={{height: 1000}} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    alignItems: 'stretch',
    padding: 12,
    flex: 1,
    backgroundColor: '#555',
  },
  slider: {},
  button: {},
  header: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 12,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  valueText: {
    width: 50,
    color: 'white',
    fontSize: 20,
  },
});
export default RangeComponent;
