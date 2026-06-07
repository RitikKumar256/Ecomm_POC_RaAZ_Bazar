import * as React from "react";
import DrawerList from "../../admin seller/components/drawerList/DrawerList";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import { Category } from "@mui/icons-material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

const menu = [
    {
        name: "Dashboard",
        path: "/admin",
        icon: <DashboardIcon className="text-primary-color" />,
        activeIcon: <DashboardIcon />,
    },
    {
        name: "Coupons",
        path: "/admin/coupon",
        icon: <IntegrationInstructionsIcon className="text-primary-color" />,
        activeIcon: <DashboardIcon />,
    },
    {
        name: "Add New Coupon",
        path: "/admin/add-coupon",
        icon: <AddIcon className="text-primary-color" />,
        activeIcon: <DashboardIcon />,
    },
    {
        name: "Home Page",
        path: "/admin/home-grid",
        icon: <HomeIcon className="text-primary-color" />,
        activeIcon: <DashboardIcon />,
    },
    {
        name: "Electronics Category",
        path: "/admin/electronics-category",
        icon: <ElectricBoltIcon className="text-primary-color" />,
        activeIcon: <DashboardIcon />,
    },
    {
        name: "Shop By Category",
        path: "/admin/shop-by-category",
        icon: <Category className="text-primary-color" />,
        activeIcon: <DashboardIcon />,
    },
    {
        name: "Deals",
        path: "/admin/deals",
        icon: <LocalOfferIcon className="text-primary-color" />,
        activeIcon: <DashboardIcon />,
    },
   
];

const menu2 = [

    {
        name: "Account",
        path: "/seller/account",
        icon: <AccountBoxIcon className="text-primary-color" />,
        activeIcon: <DashboardIcon />,
    },
    {
        name: "Logout",
        path: "/",
        icon: <LogoutIcon className="text-primary-color" />,
        activeIcon: <DashboardIcon />,
    },

]

interface DrawerListProps{
    toggleDrawer?:any;
}

const AdminDrawerList = ({ toggleDrawer }: DrawerListProps) => {

    return (
        <>
            <DrawerList toggleDrawer={toggleDrawer} menu={menu} menu2={menu2}/>
        </>
    );
}; 

export default AdminDrawerList;
