import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from "react-native"
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';
import Icon from "react-native-vector-icons/AntDesign"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation} from '@react-navigation/native';
interface HeaderBarProps {
  title?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title }: any) => {
  const navigation=useNavigation()

  const handleLogout = async () => {
    try {
      const bool = JSON.stringify(false); // Store boolean as a string
      await AsyncStorage.setItem("Login", bool);
      navigation.navigate("LogIn");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <View style={styles.HeaderContainer}>
      <TouchableOpacity onPress={() => handleLogout()} style={styles.logoutbtn}>
        <Text style={{
          color: "#fff",
          fontFamily: FONTFAMILY.poppins_medium
        }}> Logout</Text>
      </TouchableOpacity>

      <Text style={styles.HeaderText}>{title}</Text>
      <ProfilePic />
    </View>
  );
};

const styles = StyleSheet.create({
  logoutbtn:{
    height:30,
    width:65,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,
    backgroundColor:COLORS.primaryOrangeHex,  
  },
  HeaderContainer: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
});

export default HeaderBar;
