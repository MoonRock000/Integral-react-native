import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

import { supabase } from '../utils/supabase';

export default function SignupScreen({ navigation }) {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSignup = async () => {
        if (!user.name || !user.email || !user.password) {
            return Alert.alert('Error', 'All fields are required.');
        }

        const { data, error } = await supabase.auth.signUp({
            email: user.email,
            password: user.password,
            options: {
                data: { name: user.name, display_name: user.name, },
            },
        });

        if (error) {
            Alert.alert('Signup Error', error.message);
        } else {
            Alert.alert('Success', 'Account created successfully. You can now log in.');
            navigation.replace('Auth');
        }
    };


    return (
        <View style={{ padding: 20, display: 'flex', justifyContent: 'center', flex: 1 }}>
            <Text style={{ fontSize: 42, marginBottom: 50, textAlign: 'center', fontWeight: 900 }}>
                Assessment Application
            </Text>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Create a new account</Text>
            <TextInput
                placeholder="Full Name"
                style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 10 }}
                value={user.name}
                onChangeText={(text) => setUser((prev) => ({ ...prev, name: text }))}
            />
            <TextInput
                placeholder="Email"
                style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 10 }}
                value={user.email}
                onChangeText={(text) => setUser((prev) => ({ ...prev, email: text }))}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                style={{ borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 10 }}
                value={user.password}
                onChangeText={(text) => setUser((prev) => ({ ...prev, password: text }))}
            />
            <Button title="Sign up" onPress={handleSignup} color="black" />
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
                Already have an account?{' '}
                <Text
                    style={{ color: 'blue' }}
                    onPress={() => navigation.navigate('Auth')}
                >
                    Login here
                </Text>
            </Text>
        </View>
    );
}
