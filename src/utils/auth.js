import { GoogleSignin, statusCodes } from "react-native-google-signin";
import auth from '@react-native-firebase/auth';


const signInWithGoogle = (setUser,setIsAuthenticated, setAlertIsVisible,setAlertMessage)=>{

    GoogleSignin.hasPlayServices().then(hasPlayServices=>{
        if(hasPlayServices){
            GoogleSignin.signIn().then(userInfo=>{
                const idToken = userInfo.idToken;
                GoogleSignin.getTokens().then(res=>{

                        const accessToken = res.accessToken;

                        const credential = auth.GoogleAuthProvider.credential(
                            idToken,
                            accessToken,
                        );

                        auth().signInWithCredential(credential).then(()=>{
                            
                            setUser({
                                email:userInfo.user.email,
                                fullName:userInfo.user.name,
                                photo:userInfo.user.photo,
                                firstName:userInfo.user.givenName,
                            });

                            setIsAuthenticated(true);


                        });

                });
            }).catch((err)=>{
                if (err.code === statusCodes.SIGN_IN_CANCELLED){
                    // alert('Sign-in Cancelled');
                }else if( err.code === 7){
                    //Network error
                    setAlertIsVisible(true);
                    setAlertMessage('No Internet connection :(');
                }

            });
        }else{
            setAlertIsVisible(true);
            setAlertMessage('Play Services Not Available :(');
        };
    });

};

const signOutWithGoogle = (setUser,setIsAuthenticated)=>{

    GoogleSignin.revokeAccess().then(()=>{
        GoogleSignin.signOut().then(()=>{

            setIsAuthenticated(false);
            setUser({});

        });
    });

};


export {signInWithGoogle,signOutWithGoogle};