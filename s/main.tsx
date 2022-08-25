import { styles } from "./styles/mainpageStyles"
import Sidenav from "./components/sidenav";
import Inventory from "./components/inventory";
import { useContext } from "react";
import PageStore  from "./states-store/states/pageStore";
import { observer } from "mobx-react-lite";
import { ImageBackground, View } from "react-native";
import ProfileBar from "./components/profilebar";
import Clicker from "./components/caseOpener/clicker/clicker";

const Mainpage = observer(() => {
const pageStore = useContext(PageStore);
	return (
		<View style={styles.container}>
				<ImageBackground source={require("./images/panorama.jpg")} style={styles.image}>
				<Sidenav />
				{pageStore.inventoryVisible
					? <Inventory />
					: pageStore.clickerVisible
					? <Clicker /> : null}
				<ProfileBar />
			</ImageBackground>
			</View>
			)})
export default Mainpage;
