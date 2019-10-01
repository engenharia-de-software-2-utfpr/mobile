import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Title } from 'react-native-paper';

import { LoginManager, AccessToken } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import { SvgUri } from 'react-native-svg';

export default class Login extends Component {

    signInWithFacebook = async () => {
        await LoginManager.logInWithPermissions(['public_profile']);
        const data = await AccessToken.getCurrentAccessToken();

        if (data) {
            const credential = auth.FacebookAuthProvider.credential(data.accessToken);

            const firebaseUserCredential = await auth().signInWithCredential(credential);
            const token = await firebaseUserCredential.user.getIdToken()
        }

    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", padding: 40 }}>
                <Title>Rio do Campo Limpo</Title>
                <SvgUri
                    width="80%"
                    height="80%"
                    uri="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/environment_iaus.svg"
                />
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <Button mode="contained" onPress={async () => this.signInWithFacebook()}>Entrar utilizando Facebook</Button>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    text: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});