import {
    FontAwesome,
    FontAwesome5,
    FontAwesome6,
    Feather,
    AntDesign,
    MaterialIcons,
    MaterialCommunityIcons,
    Entypo,
    Octicons,
} from "@expo/vector-icons";

const HomeIcon = (props) => <Octicons name="home" {...props} />;

const ShopIcon = (props) => <Feather name="shopping-bag" {...props} />;

const CartIcon = (props) => <Feather name="shopping-cart" {...props} />;

const ProfileIcon = (props) => <Feather name="user" {...props} />;

const CartPlusIcon = (props) => <FontAwesome5 name="cart-plus" {...props} />;

const SearchIcon = (props) => <AntDesign name="search1" {...props} />;

const AtIcon = (props) => <MaterialIcons name="alternate-email" {...props} />;

const GoogleIcon = (props) => <FontAwesome5 name="google" {...props} />;

const FacebookIcon = (props) => <FontAwesome name="facebook" {...props} />;

const GithubIcon = (props) => <Feather name="github" {...props} />;

const ChevronsLeft = (props) => <Feather name="chevrons-left" {...props} />;

const StarIcon = (props) => <AntDesign name="star" {...props} />;

const DotsIcon = (props) => <Entypo name="dots-three-vertical" {...props} />;

const XIcon = (props) => <Feather name="x" {...props} />;

const PencilIcon = (props) => <MaterialCommunityIcons name="pencil" {...props} />;

const TrashIcon = (props) => <FontAwesome6 name="trash-can" {...props} />;

const ReportIcon = (props) => <MaterialIcons name="report-problem" {...props} />;

export {
    HomeIcon,
    ShopIcon,
    CartIcon,
    CartPlusIcon,
    ProfileIcon,
    SearchIcon,
    ChevronsLeft,
    AtIcon,
    GoogleIcon,
    FacebookIcon,
    GithubIcon,
    StarIcon,
    DotsIcon,
    XIcon,
    PencilIcon,
    TrashIcon,
    ReportIcon,
};
