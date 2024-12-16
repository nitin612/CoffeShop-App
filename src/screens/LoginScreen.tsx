import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }: any) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    let isValid = true;
    let newError = { email: "", password: "" };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newError.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (formData.password.length < 8) {
      newError.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validate()) {

      return;
    }

    try {
      const storedUserData = await AsyncStorage.getItem("user");

      if (storedUserData) {
        const userData = JSON.parse(storedUserData);

        if (
          userData.email === formData.email &&
          userData.password === formData.password
        ) {
          Alert.alert("Success", "Login successful!");
          console.log("Login successful");
          // Navigate to home or dashboard screen
          navigation.navigate("Tab");
        } else {
          Alert.alert("Error", "Invalid email or password");
        }
      } else {
        Alert.alert("Error", "No user data found. Please sign up first.");
        navigation.navigate("SignUp");
      }
    } catch (error) {
      console.error("Error accessing AsyncStorage:", error);
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };
  useEffect(() => {
    setFormData({
      email: "",
      password: "",
    })
  },[])
  return (
    <ImageBackground
      source={{ uri: "data:image/jpeg;base64,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" }}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.Applogo}>
            <Text style={{ fontSize: 34, fontWeight: "700" }}> Coffee Shop</Text>
          </View>
          <View style={styles.inputBack}>
            <TextInput
              value={formData.email}
              onChangeText={(text) =>
                setFormData({ ...formData, email: text })
              }
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
            />
            {error.email ? (
              <Text style={styles.errorText}>{error.email}</Text>
            ) : null}
          </View>
          <View style={styles.inputBack}>
            <TextInput
              value={formData.password}
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
              }
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="#888"
            />
            {error.password ? (
              <Text style={styles.errorText}>{error.password}</Text>
            ) : null}
          </View>
          <View>
            <TouchableOpacity style={styles.forget}>
              <Text style={{ color: '#fff', fontWeight: '500' }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.LogInBtn} onPress={handleSubmit}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>
          <View style={{ alignSelf: 'center', marginTop: 3 }}>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={{ color: '#fff' }}>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.tagline}>
          {/* <Image
            style={{ width: 200, height: 100 }}
            source={IMAGES.tagline2}
          /> */}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  Applogo: {
    alignItems: 'center',
    marginTop: 270,
    marginBottom: 10,
  },
  inputBack: {
    height: 48,
    marginHorizontal: 14,
    marginVertical: 7,
    borderRadius: 30,
    paddingLeft: 10,
    opacity: 0.5,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  input: {
    paddingLeft: 10,
    opacity: 1,
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 20,
  },
  forget: {
    alignItems: 'flex-end',
    marginHorizontal: 14,
    marginBottom: 6,
    marginTop: 4,
  },
  LogInBtn: {
    height: 50,
    width: 410,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    alignSelf: 'center',
    marginVertical: 8,
  },
  loginText: {
    color: '#ffffff',
  },
  tagline: {
    alignItems: 'center',
    marginTop: 275,
  },
});
