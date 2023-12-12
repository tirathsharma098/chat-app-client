import React, { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as ChatSvg } from "../../assets/icons/chatSVG.svg";
// import { ReactComponent as MenuSvg } from '../../assets/icons/menu-1.svg';
import style from "./AppHeader.module.css";
// import { sidebarActions } from '../../store/sidebar';
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
// import axios from 'axios';
// import { API } from '../../config/api/api.config';
// import { getAuthToken } from '../../utils/auth';
// import { notificationActions } from '../../store/notification';

const AppHeader = () => {
    // const notiCount = useSelector((state) => state.notification.count);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const sidebarShow = useSelector((state) => state.sidebar.sidebarShow);
    const profileMenuRef = useRef(null);
    // get notification count and set state
    // useEffect(() => {
    //   async function getCount() {
    //     return await axios({
    //       url: API.endpoint + '/notification/get-count',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: getAuthToken(),
    //       },
    //     });
    //   }
    //   getCount()
    //     .then((result) => {
    //       dispatch(notificationActions.set({ count: result.data.data.count }));
    //     })
    //     .catch((err) => {
    //       // do nothing
    //     });
    // }, []);
    let profileMenuItems = [
        {
            label: "Profile",
            icon: "pi pi-user",
            command: (e) => {
                navigate("/user-profile-new");
            },
        },
        { label: "Settings", icon: "pi pi-cog" },
        { separator: true },
        {
            label: "Logout",
            icon: "pi pi-sign-out",
            command: (e) => {
                navigate("/logout");
            },
        },
    ];
    return (
        <>
            <div className={style.mainNav}>
                <div>
                    <ul className={style.topnav}>
                        <li>
                            <i
                                className="pi pi-bars"
                                style={{ fontSize: "1.5rem" }}
                            ></i>
                        </li>
                        <li
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            Home
                        </li>
                        <li>
                            <ChatSvg
                                style={{ height: "28px", width: "28px" }}
                                className={style.navIcon}
                                onClick={() => navigate("/chat")}
                            />
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li
                        // onClick={() => {
                        //   navigate('/notifications');
                        // }}
                        >
                            <i
                                className="pi pi-bell p-overlay-badge"
                                style={{
                                    fontSize: "1.5rem",
                                    color: "#708090",
                                    position: "relative",
                                }}
                            >
                                <Badge
                                    value="3"
                                    style={{
                                        backgroundColor: "#63b6f1",
                                    }}
                                ></Badge>
                            </i>
                        </li>
                        <li
                            onClick={(event) =>
                                profileMenuRef.current.toggle(event)
                            }
                        >
                            <Avatar
                                image="/assets/images/TirathSharmaProfilePic.jpeg"
                                shape="circle"
                                className={style.navItem}
                                aria-haspopup
                                aria-controls="profile_menu_popup"
                            />
                            <Menu
                                model={profileMenuItems}
                                popup
                                ref={profileMenuRef}
                                id="profile_menu_popup"
                                popupAlignment="left"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default AppHeader;
