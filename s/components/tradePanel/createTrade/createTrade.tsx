import { useContext, useState } from "react"
import { View, Text, Pressable } from "react-native"
import UserStore from "../../../states-store/states/userStore"
import CreatePublicTrade from "./lobbyTypes/createPublicTrade"

const CreateTrade = () => {
	const userStore = useContext(UserStore)
	const [lobbys, setLobbys] = useState<'Private' | "Public" | "">("")
	return (
		<View style={{ flex: 1 }}>
			{lobbys == "Public" ? <CreatePublicTrade />
				: <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
					<Pressable onPress={(() => setLobbys("Public"))} style={{borderWidth:1, borderColor: 'green', backgroundColor: 'green', width: 70, alignItems: 'center', borderRadius: 5, margin: 5}}>
						<Text style={{fontSize: 15}}>Public</Text>
					</Pressable>
					<Pressable onPress={(() => setLobbys("Private"))} style={{borderWidth:1, borderColor: 'green', backgroundColor: 'green', width: 70, alignItems: 'center', borderRadius: 5, margin: 5}}>
						<Text style={{fontSize: 15}}>Private</Text>
					</Pressable>
			</View>}
		</View>
	)
}

export default CreateTrade