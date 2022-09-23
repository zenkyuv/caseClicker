import { View, Text, Image } from "react-native"
import BlurView from "expo-blur/build/BlurView";
import { styles } from "../styles/profilebarStyles"

const ProfileBar = () => {
	return (
		<BlurView tint="dark" intensity={80} style={styles.container}>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={require("../images/profile-img.jpg")} />
			</View>
			<Image style={styles.rank} source={require("../images/silver4.png")} />
			<View style={styles.infoContainer}>
				<Text style={styles.info}>i</Text>
			</View>
		</BlurView>
	)
}

export default ProfileBar