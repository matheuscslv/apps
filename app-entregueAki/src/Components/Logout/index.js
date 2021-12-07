import store from '~/services/storage';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

import appleAuth, {
  AppleButton,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';

export default async function logout() {

  GoogleSignin.configure({
    webClientId:
      Platform.OS == 'ios'
        ? '247632958355-9uebldrr58pohb8lqa3gfdmnm8gj0ds5.apps.googleusercontent.com'
        : '247632958355-sui9371tf19ge6phjduat1l1rj3al4nu.apps.googleusercontent.com',

    offlineAccess: true,
    hostsDomain: '',
    loginHint: '',
    forceConsentPrompt: true,
    accountName: '',
    iosClientId:
      Platform.OS == 'ios'
        ? '247632958355-9uebldrr58pohb8lqa3gfdmnm8gj0ds5.apps.googleusercontent.com'
        : '247632958355-sui9371tf19ge6phjduat1l1rj3al4nu.apps.googleusercontent.com',
  });

  try {
    const access_token = await store.get("access_token");
    const idToken = await store.get("idToken");
    const authorizationCode = await store.get("authorizationCode");

    if (access_token != null) {
      FBLogout(access_token);
      await store.save("access_token", null);
    } else if (idToken != null) {
      signOut();
      await store.save("idToken", null);
    } else if (authorizationCode != null) {
      signOutApple();
      await store.save("authorizationCode", null);
    }

  } catch (error) {
    alert(error)
  }
}

async function signOutApple() {
  try {
    // performs logout request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGOUT,
    });

    // get current authentication state for user
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );

    // use credentialState response to ensure the user credential's have been revoked
    if (credentialState === AppleAuthCredentialState.REVOKED) {
      console.log(appleAuthRequestResponse);
    }
  } catch (error) { }
}

function FBLogout(access_token) {
  try {
    let logout = new GraphRequest(
      'me/permissions/',
      {
        accessToken: access_token,
        httpMethod: 'DELETE',
      },
      (error, result) => {
        if (error) {
          console.log('Error fetching data: ' + error.toString());
        } else {
          console.log(result);
          LoginManager.logOut();
        }
      }
    );
    new GraphRequestManager().addRequest(logout).start();
  } catch (error) {
    console.log(error)
  }
}

async function signOut() {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    //setAuth({ userInfo: null, logged: false }); // Remember to remove the user from your app's state as well
  } catch (error) {
    console.log(String(error));
  }
}

async function getCurrentUserInfo() {
  try {
    const userInfo = await GoogleSignin.signInSilently();
    setAuth({ ...auth, userInfo });
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      // user has not signed in yet
      setAuth({ ...auth, logged: false });
    } else {
      // some other error
      setAuth({ ...auth, logged: false });
    }
  }
}
