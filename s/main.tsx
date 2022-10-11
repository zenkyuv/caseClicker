import { styles } from "./styles/mainpageStyles"
import Sidenav from "./components/sidenav";
import Inventory from "./components/inventory";
import { useContext } from "react";
import PageStore  from "./states-store/states/pageStore";
import { observer } from "mobx-react-lite";
import { ImageBackground, View } from "react-native";
import ProfileBar from "./components/profilebar";
import Clicker from "./components/clicker/clicker";
import Header from "./components/header";
import CaseShop from "./components/caseShop/caseShop";
import { StatusBar } from 'expo-status-bar';
import CoinFlip from "./components/coinFlip/coinFlip";
import TradePanel from "./components/tradePanel/tradePanel";

const Mainpage = observer(() => {
const pageStore = useContext(PageStore);
	return (
		<View style={styles.container}>
			<StatusBar hidden={true} />
			<ImageBackground source={require("./images/backgroundImage2.webp")} style={styles.image}>
				<Sidenav />
				<View style={styles.flexColumn}>
					<Header/>
					{pageStore.inventoryVisible
						? <Inventory />
						: pageStore.clickerVisible
						? <Clicker />
						: pageStore.chestShopVisible
						? <CaseShop />
						: pageStore.coinFlipVisible
						? <CoinFlip />
						: pageStore.tradePanelVisible ? <TradePanel /> : null}
				</View>
				<ProfileBar />
			</ImageBackground>
			</View>
			)})
export default Mainpage;
