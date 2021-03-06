import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginSignup from "../screens/loginsignup";
import Login from "../screens/login";
const Stack = createNativeStackNavigator();

const AuthRoute = ({setIsAuthenticated,setUser})=>{


    return (
            <Stack.Navigator initialRouteName="Home">

                <Stack.Screen name="Home" options={{headerShown:false}} >
                    {(props) => <LoginSignup {...props}/>}
                </Stack.Screen>

                <Stack.Screen name="Login">
                    {(props) => <Login  setIsAuthenticated={setIsAuthenticated} setUser={setUser} {...props}/>}
                </Stack.Screen>
                    


            </Stack.Navigator>
    );
};

export default AuthRoute;
