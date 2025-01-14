import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

import { supabase } from '../utils/supabase';

export default function AuthScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            Alert.alert('Login Error', error.message);
        } else {
            navigation.navigate('Posts');
        }
    };

    return (
        <View style={{ padding: 20, display: 'flex', justifyContent: 'center', flex: 1 }}>
            <Text style={{ fontSize: 42, marginBottom: 50, textAlign: 'center', fontWeight: 900 }}>Assessment Application</Text>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
            <TextInput
                placeholder="Email"
                style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 10 }}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                style={{ borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 10 }}
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} color='black' />
            <Text style={{ textAlign: 'center', marginTop: 20 }}>Don't have an account? Sign up <Text style={{ color: 'blue' }} onPress={() => navigation.navigate('SignUp')}>here</Text></Text>
        </View>
    );
}
