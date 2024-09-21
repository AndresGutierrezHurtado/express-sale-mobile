import { Feather } from "@expo/vector-icons";

// TabIcons (Home, shoppingBag, Cart, user)
export const HomeIcon = (props) => (
    <Feather name="home" size={24} color={"#6b7280"} {...props} />
);

export const BagIcon = (props) => (
    <Feather name="shopping-bag" size={24} color={"#6b7280"} {...props} />
);

export const CartIcon = (props) => (
    <Feather name="shopping-cart" size={24} color={"#6b7280"} {...props} />
);

export const UserIcon = (props) => (
    <Feather name="user" size={24} color={"#6b7280"} {...props} />
);

// extra icons
export const SearchIcon = (props) => (
    <Feather name="search" size={24} color={"#6b7280"} {...props} />
);

export const ChevronsLeftIcon = (props) => (
    <Feather name="chevrons-left" size={24} color="#6b7280" {...props} />
);
