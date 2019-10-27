import Lottie from 'lottie-react-native';
import React from 'react';
import Wip from '../../../../../../assets/wip.json';
import {Container} from './styles';

export default function Video() {
  return (
    <Container>
      <Lottie source={Wip} autoPlay loop />
    </Container>
  );
}

// import React from 'react';
// // import Wip from '../../../../../../assets/wip.json';
// import {Container} from './styles';
// import {Text} from 'react-native';

// export default function Video({navigation}) {
//   // const photos = useSelector(state => state.occurrence.photos);
//   // const error = useSelector(state => state.error);

//   // const dispatch = useDispatch();

//   // const [camera, setCamera] = useState(null);

//   // useEffect(() => {
//   //   if (error) {
//   //     Toast.show(error, {
//   //       duration: Toast.durations.SHORT,
//   //       position: Toast.positions.BOTTOM,
//   //       shadow: true,
//   //       animation: true,
//   //       hideOnPress: true,
//   //     });
//   //   }
//   // }, [error]);

//   // async function handleClick() {
//   //   await requestStoragePermission();

//   //   const {uri} = await camera.takePictureAsync({
//   //     quality: 0.8,
//   //     fixOrientation: true,
//   //     skipProcessing: true,
//   //     pauseAfterCapture: false,
//   //   });

//   //   dispatch(addPhoto(uri));

//   //   if (error) {
//   //     Toast.show(error, {
//   //       duration: Toast.durations.SHORT,
//   //       position: Toast.positions.BOTTOM,
//   //       shadow: true,
//   //       animation: true,
//   //       hideOnPress: true,
//   //     });
//   //   }
//   // }

//   return (
//     <Container>
//       <Text>aa</Text>
//       {/* <Lottie source={Wip} autoPlay autoSize loop /> */}
//       {/* <CameraContainer>
//         <Camera navigation={navigation} setCamera={setCamera} />
//       </CameraContainer> */}
//       {/* <MediaContainer> */};
//       {/* <MediaListContainer>
//           <MediaList tiles={photos} />
//         </MediaListContainer>
//         <ActionButtonContainer>
//           <ActionButton onPress={handleClick}>
//             <ActionButtonInner>
//               <CameraIcon />
//             </ActionButtonInner>
//           </ActionButton>
//         </ActionButtonContainer> */}
//       {/* </MediaContainer> */}
//     </Container>
//   );
// }
