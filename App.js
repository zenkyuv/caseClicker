import { StatusBar } from 'expo-status-bar'
import { useContext } from 'react'
import UserStore from './s/states-store/states/userStore'
import { StyleSheet, View } from 'react-native'
import SignPanel from "./s/components/signPanel"
import Main from './s/main'
import { observer } from 'mobx-react-lite'
import { StoresProvider, stores } from "./s/states-store/store";

	const App = observer(() => {
	const userStore = useContext(UserStore);
	return (

		<StoresProvider value={stores}>
		<View style={styles.container}>
			{userStore.userIsLogged ? <Main/> : <SignPanel/>}
			<StatusBar style="auto" />
			</View>
			</StoresProvider>
	)
	})

	const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	})

export default App
