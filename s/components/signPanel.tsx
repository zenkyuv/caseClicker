import { Formik } from "formik";
import { useContext, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { createUser, signUser } from "../firebaseApi/auth";
import UserStore from "../states-store/states/userStore";
import { styles } from "../styles/signPanelStyles";



export default function SignPanel(props: any) {
	const userStore = useContext(UserStore);
	const [showPanel, setPanel] = useState({
		signIn: true,
		signUp: false
	})
	
	const handleSignUp = (userData:any) => {
		createUser({ userData, userStore })
	}

console.log(showPanel.signIn)
	const handleSignIn = (userData: any) => {
		signUser({ userData, userStore });
	}
	return (<View style={styles.container}>
		<Formik initialValues={{ email: "", password: "" }}
			onSubmit={values => showPanel.signIn ? handleSignIn(values) : handleSignUp(values)}
		>
			{({ handleChange, handleBlur, handleSubmit, values }) => (
				<>
					<Text>Email</Text>
					<TextInput
						onChangeText={handleChange('email')}
						style={styles.textInput}
						value={values.email}
					/>
					<Text>Password</Text>
					<TextInput
						secureTextEntry={true}
						textContentType={"password"}
						onChangeText={handleChange('password')}
						style={styles.textInput}
						value={values.password}
					/>
					<Text style={styles.smallText}>{showPanel.signIn ? "Not registered yet?" : "Back to "}
						<Text onPress={() => setPanel({
							signIn: !showPanel.signIn,
							signUp: !showPanel.signUp
						})}
							style={styles.registerText}>{showPanel.signIn ? " Register" : "Login"}</Text></Text>
					<Button
						onPress={() => handleSubmit()}
						title={showPanel.signIn ? "Login" : "Register"}
						color="#841584"
						accessibilityLabel="Learn more about this purple button" /></>)}
			</Formik>
</View>)
	};
	
