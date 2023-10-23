import { ThemingProps } from "@chakra-ui/react";
import {
	mainnet,
	goerli,
	sepolia,
	polygon,
	optimism,
	arbitrum,
	polygonMumbai,
} from "@wagmi/chains";

export const SITE_NAME = "Carbon Credits Transfer";
export const SITE_DESCRIPTION = "Carbon Credits Description";

export const THEME_INITIAL_COLOR = "system";
export const THEME_COLOR_SCHEME: ThemingProps["colorScheme"] = "gray";
export const THEME_CONFIG = { initialColorMode: THEME_INITIAL_COLOR };

export const INFURA_KEY = "a8c6853953a14516b7b662d25b90011a";
export const PROJECT_ID = "bd21103961eeb454b63eba27d0201c67"; // from wallet connect cloud
// export const NETWORKS = [mainnet, goerli, sepolia, polygon, optimism, arbitrum]
export const NETWORKS = [polygonMumbai];
