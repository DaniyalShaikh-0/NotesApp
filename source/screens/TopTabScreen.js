import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import Animated, {
  withSpring,
  useSharedValue,
  Easing,
  useAnimatedStyle,
  withTiming,
  withSequence,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
} from 'react-native-reanimated';
import IpAddress from '../data/IpAddress';
import HeaderDrawer from '../components/DrawerHeader';
import {useUser} from '../global/UserContext';
// import HomeScreen from "",
import socket from '../global/Socket';
import {FAB, Card, Avatar} from 'react-native-elements';
import CustomButton from '../components/Button';
const retrieveTasks = async userid => {
  let headersList = {
    Accept: '*/*',
    'User-Agent': 'client',
    userid: userid,
  };

  return await fetch(IpAddress + 'task/given', {
    method: 'GET',
    headers: headersList,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    });
};
const TaskCard = ({task}) => {
  return (
    <TouchableNativeFeedback>
      <Card
        // wrapperStyle={{backgroundColor: 'blue'}}
        containerStyle={{
          width: '100%',
          alignSelf: 'center',
          borderRadius: 10,
          backgroundColor: '#dd8877',
          // padding:0
          maxHeight: 250,
          margin: 0,
        }}>
        <Card.Title>{task.tasktitle}</Card.Title>
        <Card.Divider color="#000" />
        <Text
          style={{
            marginVertical: 5,
            width: '70%',
            alignSelf: 'center',
            textAlign: 'center',
          }}
          numberOfLines={3}>
          {task.taskcontent}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            // flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: '600'}}>
            Assigned By: {' ' + task.assignor + '  '}
          </Text>
          <Avatar
            size={40}
            rounded
            source={{
              uri:
                'https://randomuser.me/api/portraits/men/' +
                parseInt(Math.random() * 50) +
                '.jpg',
            }}
          />
        </View>
        {task.istimebound && (
          <Text style={{color: '#555', fontWeight: '800', textAlign: 'center'}}>
            Task Deadline : {new Date(task.deadline).toDateString()}
          </Text>
        )}
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
          }}>
          <CustomButton title="View" spacing={2} style={{marginRight: 10}} />
          <CustomButton
            title="Start"
            spacing={2}
            color="#00b800"
            style={{marginLeft: 10}}
          />
        </View>
      </Card>
    </TouchableNativeFeedback>
  );
};
const Tab = createMaterialTopTabNavigator();
function HomeScreen() {
  const offset = useSharedValue(100);
  const [Toggle, setToggle] = useState(false);
  const [User, setUser] = useUser();
  const [Tasks, setTasks] = useState([]);
  React.useEffect(() => {
    socket.on('Task Assigned', data => {
      setToggle(true);
      // console.log(data + ' is assigned succesfully to  :  ', User.userid);
    });
  }, []);

  React.useEffect(() => {
    retrieveTasks(User.userid).then(tasks => setTasks(tasks));
    return () => {};
  }, []);
  React.useEffect(() => {
    let time;
    if (Toggle) {
      time = setTimeout(() => setToggle(false), 3000);
    }
    return () => clearTimeout(time);
  }, [Toggle]);
  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: offset.value,
        },
      ],
    };
  });

  return (
    <View style={{flex: 1}}>
      <ScrollView overScrollMode="never" style={{flexGrow: 1}}>
        {Tasks.map((task, ind) => {
          return (
            <View
              key={ind}
              style={{
                zIndex: -1,
                width: '90%',
                alignSelf: 'center',
                marginVertical: 10,
              }}>
              <TaskCard task={task} />
            </View>
          );
        })}
        {/* <Text
        style={{
          textAlign: 'center',
          color: 'black',
          fontWeight: 'bold',
          fontSize: 26,
          width: '100%',
          marginTop: 10,
          // backgroundColor: '#EE9644',
          // position: 'absolute',
          // top: '51%',
        }}>
        Assigned Tasks
      </Text>

      <Button
        title="Show"
        onPress={() => {
          setToggle(!Toggle);
          // offset.value = withSequence(withTiming(100), withTiming(-30));
        }}
      /> */}
      </ScrollView>
      {Toggle && (
        <Animated.View
          entering={SlideInDown}
          exiting={SlideOutDown}
          style={{
            position: 'absolute',
            bottom: 0,
            // zIndex: -100,
            // transform: [{translateY: 450}],
            // alignSelf: 'flex-end',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
            backgroundColor: '#44436e',
            width: '90%',
            padding: 15,
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <Icon name="info-with-circle" size={20} color="#0d0" />
          <Text style={{color: '#ddd'}}>
            {'  You have been assigned a new task'}
          </Text>
          <TouchableOpacity
            style={{marginLeft: 20}}
            onPress={() => setToggle(!Toggle)}>
            <Text style={{color: '#dd5533', fontSize: 16, fontWeight: '600'}}>
              close
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

export default function TopTabScreen({navigation}) {
  function SettingsScreen() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text onPress={() => navigation.navigate('BottomTabScreen')}>
          In Progress
        </Text>
      </View>
    );
  }
  function DoneScreen() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text onPress={() => navigation.navigate('BottomTabScreen')}>Done</Text>
      </View>
    );
  }
  return (
    <Tab.Navigator
      // tabBar={props => (
      //   <Text style={{color: 'black'}}>{JSON.stringify(props.state)}</Text>
      // )}
      screenOptions={{
        // tabBarLabel: 'hello',
        // tabBarIndicator: props => <Text>JEE</Text>,
        // tabBarAccessibilityLabel: 'Task',

        tabBarStyle: {
          backgroundColor: '#EE9644',
          // elevation: 0,
          // alignSelf: 'center',
        },
        tabBarLabelStyle: {
          fontWeight: '800',

          // fontFamily: 'monospace',
          // color: 'black',
          // textTransform: 'none',
        },

        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#8888',
        tabBarIndicatorStyle: {backgroundColor: 'white', height: 2.5},
        tabBarPressColor: '#ccc4',
      }}>
      <Tab.Screen
        name="Todo"
        component={HomeScreen}
        // options={{}}
        // options={{tabBarIndicatorStyle: {backgroundColor: 'yellow'}}}
      />
      <Tab.Screen name="In Progress" component={SettingsScreen} />
      <Tab.Screen name="Done" component={DoneScreen} />
    </Tab.Navigator>
  );
}
