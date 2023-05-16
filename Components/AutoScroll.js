// import React, { useState, useRef } from 'react';
// import { View, Text, FlatList } from 'react-native';

// const App = () => {
//   const [isMomentumScrolling, setIsMomentumScrolling] = useState(false);
//   const flatListRef = useRef(null);
//   const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
//   const interval = 1000;
//   const currentIndex = useRef(0).current;

//   const renderItem = ({ item }) => {
//     return (
//       <View
//         style={{
//           width: 100,
//           height: 100,
//           backgroundColor: '#ededed',
//           justifyContent: 'center',
//           alignItems: 'center',
//           margin: 10,
//         }}>
//         <Text>{item}</Text>
//       </View>
//     );
//   };

//   const handleScroll = ({ nativeEvent }) => {
//     const { contentOffset, layoutMeasurement, contentSize } = nativeEvent;
//     const maxOffset =
//       contentSize && contentSize.width - layoutMeasurement.width;

//     if (maxOffset && contentOffset.x >= maxOffset) {
//       flatListRef.current.scrollToIndex({ animated: true, index: 0 });
//     } else if (!isMomentumScrolling) {
//       flatListRef.current.scrollToIndex({
//         animated: true,
//         index:
//           (currentIndex === data.length - 1 ? 0 : currentIndex + 1) %
//           data.length,
//       });
//     }
//   };

//   const handleMomentumScrollBegin = () => {
//     setIsMomentumScrolling(true);
//   };

//   const handleMomentumScrollEnd = () => {
//     setIsMomentumScrolling(false);
//   };

//   setInterval(() => {
//     if (!isMomentumScrolling) {
//       handleScroll({ nativeEvent: { contentOffset: { x: 0 } } });
//     }
//   }, interval);

//   return (
//     <FlatList
//       ref={flatListRef}
//       horizontal={true}
//       data={data}
//       renderItem={renderItem}
//       keyExtractor={(item, index) => index.toString()}
//       onScroll={handleScroll}
//       snapToInterval={120}
//       snapToAlignment={'start'}
//       onMomentumScrollBegin={handleMomentumScrollBegin}
//       onMomentumScrollEnd={handleMomentumScrollEnd}
//       showsHorizontalScrollIndicator={false}
//     />
//   );
// };

// export default App;
