import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const HomeIcon = (props) => <Entypo name="home" {...props} />;

const ShopIcon = (props) => <Feather name="shopping-bag" {...props} />;

const CartIcon = (props) => <Feather name="shopping-cart" {...props} />;

const ProfileIcon = (props) => <FontAwesome6 name="user-large" {...props} />;

const CartPlusIcon = (props) => <FontAwesome5 name="cart-plus" {...props} />;

export { HomeIcon, ShopIcon, CartIcon, CartPlusIcon, ProfileIcon };
