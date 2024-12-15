import React, { useRef, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { AuthActionsEnum, TooltipPositionEnum } from "../helper/constant";
import { drawerList } from "../helper/staticData";
import { useClickOutSide } from "../hooks/useClickOutSide";
import { postSignOut } from "../service/authService";
import { IDrawerListItem } from "../types/staticDataType";
import Button from "./Button";
import { Icon, Image } from "./common";
import Tooltip from "./Tooltip";

// lay ra phan payload va decode
// const parseJwt = (token) => {
//   try {
//     return JSON.parse(atob(token.split(".")[1]));
//   } catch (error) {
//     return null;
//   }
// };
const UserDropdown = () => {
  const { state, dispatch } = useAuthContext();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    const accessToken = localStorage.getItem("access_token") as string;
    try {
      const resJson = await postSignOut("/auth/signout", accessToken);
      if (resJson) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        dispatch({
          type: AuthActionsEnum.LOGOUT,
          payload: resJson.data,
        });
        navigate("/quiz");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute sm:min-w-80 min-w-60 top-full z-50 right-4 bg-gray-100 shadow-small rounded-medium">
      <div className="">
        <div className="py-small px-medium flex gap-small items-center border-b-2 border-gray-300">
          <div className="w-16 h-16 rounded-full">
            <Image
              imageName={state?.user?.avatar}
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-base text-gray-800 font-semibold">
              {state?.user?.name}
            </p>
            <p className="text-base text-gray-600 font-semibold">
              {state?.user?.username}
            </p>
          </div>
        </div>
        <div className="py-small">
          <div className="px-medium hover:bg-gray-300">
            <Link to={`/user/${state?.user?.id}`}>
              <div className="flex gap-small py-xsmall items-center text-gray-600">
                <div className="h-6 w-6">
                  <Icon iconName="settings" />
                </div>
                <span className="">Profile</span>
              </div>
            </Link>
          </div>
          <div className="py-xsmall hover:bg-gray-300">
            <Button
              buttonClass="w-full flex px-medium gap-small items-center text-gray-600"
              type="button"
              handleClick={handleSignOut}
            >
              <div className="h-6 w-6">
                <Icon iconName="logout" />
              </div>
              <span className="">Sign out</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

type ItemProps = {
  asideActive: boolean;
  itemInformation: IDrawerListItem;
};

const Item: React.FC<ItemProps> = (props) => {
  const { asideActive, itemInformation } = props;
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { state } = useAuthContext();
  return (
    <div className="mb-small relative">
      {!asideActive && (
        <Tooltip direction={TooltipPositionEnum.RIGHT} elementRef={linkRef}>
          <span>{itemInformation.tooltipText}</span>
        </Tooltip>
      )}
      <NavLink
        to={
          itemInformation.to
            ? itemInformation.to
            : `/user/${state?.user?.id}/sets`
        }
        ref={linkRef}
      >
        {({ isActive }) => (
          <div
            className={`h-10 select-none relative flex items-center pl-xsmall pr-small text-twilight-500 rounded-medium ${
              isActive ? "bg-twilight-500 bg-opacity-10" : "bg-gray-100"
            }`}
          >
            <div className="lg:w-10 lg:h-10"></div>
            <div className="p-xsmall lg:absolute w-10 h-10 mr-small lg:top-1/2 lg:left-0 lg:-translate-y-1/2">
              <Icon iconName={itemInformation.iconName} />
            </div>
            <span
              className={`${
                asideActive ? "opacity-100 visible" : "opacity-0 invisible"
              } font-medium text-small transition-all`}
            >
              {itemInformation.iconName}
            </span>
          </div>
        )}
      </NavLink>
    </div>
  );
};

const Drawer: React.FC = () => {
  const { state } = useAuthContext();
  const [userDropdownActive, setUserDropdownActive] = useState<boolean>(false);
  const [asideActive, setAsideActive] = useState<boolean>(false);
  const refAvatar = useRef<HTMLDivElement>(null);
  const handleClickMenuIcon = () => {
    setAsideActive(!asideActive);
  };
  const handleClickAvatar = () => {
    setUserDropdownActive(!userDropdownActive);
  };
  useClickOutSide(refAvatar, () => {
    setUserDropdownActive(false);
  });

  return (
    <>
      <header className="sticky top-0 bg-gray-100 text-gray-800 z-50">
        <div className="px-small py-xsmall flex justify-between">
          <div className="">
            <div className="flex gap-xsmall">
              <div
                onClick={handleClickMenuIcon}
                className="w-10 h-10 p-xsmall text-gray-800 cursor-pointer"
              >
                <Icon iconName="menu" />
              </div>
              <Link to="/quiz">
                <div className="w-10 h-10 p-xsmall text-twilight-500">
                  <Icon iconName="minilogo" />
                </div>
              </Link>
            </div>
          </div>
          <div
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={handleClickAvatar}
            ref={refAvatar}
          >
            <div className="w-full h-full rounded-full select-none">
              <Image
                imageName={state?.user?.avatar}
                className="w-full h-full rounded-full"
              />
            </div>
          </div>
        </div>
        {userDropdownActive && <UserDropdown />}
      </header>
      <div className="flex">
        <aside
          className={`${
            asideActive ? "lg:w-60" : "lg:w-18"
          } relative lg:flex-shrink-0 lg:flex-grow-0 transition-all bg-gray-100`}
        >
          <div
            className={`${
              asideActive
                ? "lg:pr-medium lg:w-60 left-0 w-64"
                : "lg:pr-small lg:w-18 -left-full w-0"
            } lg:sticky lg:left-0 lg:top-14 lg:pl-small lg:pt-small pl-medium max-h-screen fixed top-0 bottom-0 z-50 bg-gray-100 transition-all`}
          >
            <div className="lg:hidden h-16 flex items-center">
              <div className="flex gap-xsmall">
                <div
                  onClick={handleClickMenuIcon}
                  className="w-10 h-10 p-xxsmall text-gray-800 cursor-pointer"
                >
                  <Icon iconName="menu" />
                </div>
                <Link to="/quiz">
                  <div className="w-10 h-10 p-xxsmall text-twilight-500">
                    <Icon iconName="minilogo" />
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex flex-col lg:pr-0 pr-medium pt-small">
              {drawerList &&
                drawerList.map((item: IDrawerListItem, index: number) => (
                  <Item
                    key={index}
                    asideActive={asideActive}
                    itemInformation={item}
                  />
                ))}
            </div>
          </div>
        </aside>
        <main className="max-w-full flex-grow flex-shrink bg-gray-200 min-h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Drawer;
