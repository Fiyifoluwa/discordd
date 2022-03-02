import { createDrawerNavigator } from '@react-navigation/drawer';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="TabOne" component={TabOneScreen} />
      <Drawer.Screen name="TabTwo" component={TabTwoScreen} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
