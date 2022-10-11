import {styles} from "../styles/sidenavStyles"
import { useContext, useState } from "react";
import PageStore from "../states-store/states/pageStore";
import { Image, Pressable, View, Text } from "react-native";
import BlurView from "expo-blur/build/BlurView";


const Sidenav = () => {
	const pageStore = useContext(PageStore);
      return(
				<BlurView tint="dark" intensity={80} style={styles.container}>
					<View style={styles.elContainer}>
						<Text style={styles.text}>Case</Text>
						<Text style={styles.text}>Clicker</Text>
					</View>
					<Pressable style={styles.navTextCnt} onPress={() => {pageStore.setInventoryVisible(true)}}>
						<Text style={styles.navText}>Inventory</Text>
					</Pressable>
					<Pressable style={styles.navTextCnt} onPress={() => {pageStore.setClickerVisible(true)}}>
						<Text style={styles.navText}>Clicker</Text>
					</Pressable>
					<Pressable style={styles.navTextCnt} onPress={() => {pageStore.setChestShopVisible(true)}}>
						<Text style={styles.navText}>Cases</Text>
					</Pressable>
					<Pressable style={styles.navTextCnt} onPress={() => {pageStore.setCoinFlipVisible(true)}}>
						<Text style={styles.navText}>Coin Flip</Text>
					</Pressable>
					<Pressable style={styles.navTextCnt} onPress={() => { pageStore.setTradePanelVisible(true)}}>
						<Text style={styles.navText}>Trade</Text>
					</Pressable>
				</BlurView>
      );
}
export default Sidenav;