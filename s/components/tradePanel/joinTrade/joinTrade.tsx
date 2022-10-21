import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import JoinPublicTrade from "./lobbyTypes/joinPublicTrade"

const JoinTrade = () => {
	const [lobbys, setLobbys] = useState<'Private' | "Public" | "">("")
	return (
		<View style={{ flex: 1 }}>
			{lobbys == "Public" ? <JoinPublicTrade />
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

export default JoinTrade