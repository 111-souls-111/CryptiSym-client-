import { useAuth } from "../../../hooks/useAuth"
import { Avatar, Dropdown, Space } from "antd"
import { UserOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons"
import { type MenuProps} from "antd"
import style from "./UserMenu.module.css"

function UserMenu(){
    const { user, isAuthenticated, logout, hhh } = useAuth(); 

    if (!isAuthenticated){
        return null;
    }

    const items: MenuProps["items"] = [
        // {
        //     key: 'profile',
        //     icon: <UserOutlined />,
        //     label: "Профиль"
        // },
        // {
        //     key: "setting",
        //     icon: <SettingOutlined />,
        //     label: "Настройки",
        // },
        // {
        //     type: 'divider',
        // },
        {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: 'Выйти',
        onClick: () => logout(),
        danger: true,
        },

    ]

    const avatar = user?.profile?.picture ? (
        <Avatar className = {style.avatar} src={user.profile.picture}  />
    ) : ( 
        <Avatar className = {style.avatar} src={<UserOutlined />}  />
    );

    return (
        <Dropdown menu={{ items }} className={style.drop}>
            <Space>
                {avatar}
                <span className={style.userName}>
                    {user?.profile?.email || "User"}
                </span>
            </Space>
        </Dropdown>
    )
}

export default UserMenu;