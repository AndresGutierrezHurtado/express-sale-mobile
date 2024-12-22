import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";

const HomeIcon = (props) => <Octicons name="home" {...props} />;

const ShopIcon = (props) => <Feather name="shopping-bag" {...props} />;

const CartIcon = (props) => <Feather name="shopping-cart" {...props} />;

const ProfileIcon = (props) => <Feather name="user" {...props} />;

const CartPlusIcon = (props) => <FontAwesome5 name="cart-plus" {...props} />;

const SearchIcon = (props) => <AntDesign name="search1" {...props} />;

export { HomeIcon, ShopIcon, CartIcon, CartPlusIcon, ProfileIcon, SearchIcon };
