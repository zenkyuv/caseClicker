import { useContext, useState } from "react"
import { Pressable, View, Text } from "react-native"
import UserStore from "../../states-store/states/userStore"
import CreateTrade from "./createTrade/createTrade"
import JoinTrade from "./joinTrade/joinTrade"

const TradePanel = () => {
	const userStore = useContext(UserStore)
	const [lobby, setLobby] = useState<'Join' | "Create" | undefined>(undefined)
	return (
		<View style={{ flex: 1 }}>
			{lobby == 'Create' ? <CreateTrade />
				: lobby == "Join" ? <JoinTrade />
				: <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text style={{fontSize: 20, margin: 10}}>Choose lobby type:</Text>
			<Pressable onPress={() => setLobby("Join")} style={{borderWidth:1, borderColor: 'green', backgroundColor: 'green', width: 70, alignItems: 'center', borderRadius: 5, margin: 5}}>
				<Text style={{fontSize: 15}}>Join</Text>
			</Pressable>
				<Pressable onPress={() => setLobby("Create")} style={{ borderWidth: 1, borderColor: 'green', backgroundColor: 'green', width: 70, alignItems: 'center', borderRadius: 5, margin: 5 }}>
					<Text style={{fontSize: 15}}>Create</Text>
				</Pressable>
		</View>}
	</View>)
}

export default TradePanel