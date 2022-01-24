import React, {useState, useEffect, useRef} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {FAB, Card, Avatar} from 'react-native-elements';
import CustomButton from '../components/Button';
import {useUser} from '../global/UserContext';
import IpAddress from '../data/IpAddress';
import socket from '../global/Socket';
const {height, width} = Dimensions.get('window');
const maxCardHeight = 220;
export default function Home() {
  const [User, setUser] = useUser();
  const [GivenTasks, setGivenTasks] = useState([]);
  const Data_to_Send = {
    tasktitle: 'Come to Office\\',
    taskcontent:
      'restarting due to changes...\n[nodemon] starting `node index.js',
    istimebound: false,
    assignedby: 'u1007',
    assignedto: 'u1003',
    priority: 'x',
    deadline: '2022-01-23T06:04:18.615',
  };
  const AddTask = () => {
    let headersList = {
      Accept: '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
      'Content-Type': 'application/json',
    };

    fetch(IpAddress + 'task/add', {
      method: 'POST',
      body: JSON.stringify(Data_to_Send),
      headers: headersList,
    })
      .then(response => {
        socket.emit('Added Task', Data_to_Send);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  };
  const RetrieveTasksGivenByMe = async () => {
    let headersList = {
      Accept: '*/*',
      'User-Agent': 'Client',
      userid: User.userid,
    };

    return await fetch(IpAddress + 'task/your', {
      method: 'GET',
      headers: headersList,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setGivenTasks(data);
      });
  };

  const TaskCard = ({task}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          width: '47%',
          // backgroundColor: '#7dce',
          margin: 5,
          maxHeight: maxCardHeight,
          // maxHeight: 100,
          // alignSelf: 'flex-start',
          // alignContent: 'center',
          // justifyContent: 'center',
          // alignItems: 'center',
        }}>
        <Card
          // wrapperStyle={{backgroundColor: 'blue'}}
          containerStyle={{
            width: '100%',
            alignSelf: 'center',
            borderRadius: 10,
            backgroundColor: '#d8e',
            // padding:0

            margin: 0,
          }}>
          <Card.Title>{task.tasktitle}</Card.Title>
          <Card.Divider />
          <Text
            style={{paddingVertical: 5, textAlign: 'center'}}
            numberOfLines={5}>
            {task.taskcontent}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              // flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: '600'}}>Assigned To: </Text>
            <Avatar
              size={30}
              rounded
              source={{
                uri:
                  'https://randomuser.me/api/portraits/men/' +
                  parseInt(Math.random() * 20) +
                  '.jpg',
              }}
            />
          </View>
        </Card>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    RetrieveTasksGivenByMe();
    return () => {};
  }, []);
  // console.log(GivenTasks.length);
  return (
    <>
      <ScrollView
        style={{flexGrow: 1}}
        // stickyHeaderIndices={[1]}
      >
        {/* <Text>Welcome User</Text> */}

        <Text
          style={{
            fontWeight: '700',
            color: 'black',
            backgroundColor: '#EE9644',
            textAlign: 'center',
            // marginTop: 10,
            paddingTop: 10,
            fontSize: 24,
            fontFamily: 'serif',
          }}>
          Tasks Given By You
        </Text>

        <View
          style={{
            width: '100%',
            // backgroundColor: 'lightgreen',
            paddingVertical: 20,
            // flexDirection: 'row',

            // height: height,
            // alignSelf: 'center',
            // justifyContent: 'space-evenly',
            flexWrap: 'wrap',
            // maxWidth: '90%',
            maxHeight:
              (maxCardHeight -
                Math.min(15, Math.floor(GivenTasks.length / 2))) *
                Math.ceil(GivenTasks.length / 2) +
              50,
            // flexBasis: 2,
            // flexShrink: 0.1,
            // overflow: 'scroll',
            // flexGrow: 1,
            // flexBasis: 1,
            // maxWidth: '90%',
            // flexBasis: 0.1,
            // flexShrink: 0.1,
            alignContent: 'center',
          }}>
          {GivenTasks.map((Task, val) => (
            <TaskCard key={val} task={Task} />
          ))}
        </View>
      </ScrollView>
      <FAB
        onPress={e => AddTask()}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          marginRight: 25,
          marginBottom: 30,
        }}
        visible={true}
        icon={{name: 'add', color: 'white'}}
        color="#EE9666"
      />
    </>
  );
}
