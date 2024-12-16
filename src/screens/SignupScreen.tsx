import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../theme/theme';

export default function Login({ navigation }: any) {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [tempPass, setTempPass] = useState("");
  const [error, setError] = useState({
    name: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const validate = () => {
    let isValid = true;
    let newError = { name: "", password: "", email: "", confirmPassword: "" };

    // Name validation
    if (formData.name.length < 3) {
      newError.name = "Name should be at least 3 characters";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newError.email = "Please enter a valid email";
      isValid = false;
    }

    // Password validation
    if (formData.password.length < 8) {
      newError.password = "Password should be at least 8 characters";
      isValid = false;
    }

    // Confirm Password validation
    if (formData.password !== tempPass) {
      newError.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleSubmit = async () => {
    try {
      if (validate()) {
        const result = await AsyncStorage.setItem("user", JSON.stringify(formData))
        console.log("Form Submitted:", JSON.stringify(formData));
      navigation.navigate("LogIn")

      }
    }
    catch (err) {
      console.log(err, "dhjasvbfjm")
    }

  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.primaryBlackHex,
    }}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Welcome to Coffee Shop</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            style={styles.input}
            placeholder="Full Name"
          />
          {error.name ? <Text style={styles.errorText}>{error.name}</Text> : null}

          <TextInput
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            style={styles.input}
            placeholder="Email"
          />
          {error.email ? <Text style={styles.errorText}>{error.email}</Text> : null}

          <TextInput
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            style={styles.input}
            placeholder="Password"
            secureTextEntry
          />
          {error.password ? <Text style={styles.errorText}>{error.password}</Text> : null}

          <TextInput
            value={tempPass}
            onChangeText={(text) => setTempPass(text)}
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
          />
          {error.confirmPassword ? <Text style={styles.errorText}>{error.confirmPassword}</Text> : null}
        </View>

        <TouchableOpacity style={styles.logInBtn} onPress={handleSubmit}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.footerText} onPress={() => navigation.navigate("LogIn")}>
              Already have an account? <Text style={styles.loginLink}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: COLORS.primaryBlackHex,

  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
    marginVertical: 150
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FAFAFA",
    height: 50,
    borderRadius: 25,
    paddingLeft: 15,
    marginBottom: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    paddingLeft: 15,
  },
  logInBtn: {
    backgroundColor: "#666",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  loginLink: {
    color: "#fff",
    fontWeight: "bold",
  },
});
