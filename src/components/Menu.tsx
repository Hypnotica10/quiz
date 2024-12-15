import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { menu } from "../helper/staticData";
import { useClickOutSide } from "../hooks/useClickOutSide";
import { IMenu } from "../types/staticDataType";
import { ISubject } from "../types/subject";
import { Icon } from "./common";

const SubMenu = ({
  dropdownActive,
  subMenu,
}: {
  dropdownActive: boolean;
  subMenu: ISubject[];
}) => {
  return (
    <div
      className={`${
        dropdownActive ? "opacity-100 visible" : "opacity-0 invisible"
      } absolute top-full -left-5 h-full`}
    >
      <div className="bg-gray-100 rounded-medium shadow-small border-xxsmall border-gray-300">
        {subMenu && (
          <ul className="py-xsmall text-gray-600">
            {subMenu.map((item: ISubject) => {
              return (
                <Link key={item.id} to={`/${item.name.replace(/\s+/g, "-").toLowerCase()}`}>
                  <li className="w-60 py-xsmall px-medium flex items-center gap-4 hover:bg-gray-300 transition-all group">
                    <div className="w-6 h-6">
                      <Icon
                        iconName={item.name.replace(/\s+/g, "").toLowerCase()}
                      />
                    </div>
                    <span>{item.name}</span>
                  </li>
                </Link>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

const MenuItem = ({ item }: { item: IMenu }) => {
  const [dropdownActive, setDropdownActive] = useState<boolean>(false);
  const ref = useRef<HTMLLIElement>(null);

  const handleClickDropdown = (): void => {
    setDropdownActive((dropdownActive) => !dropdownActive);
  };
  useClickOutSide(ref, () => {
    setDropdownActive(false);
  });

  return (
    <li
      className={`h-full flex items-center ml-large font-bold gap-xsmall cursor-pointer relative before:absolute before:w-full before:h-1 before:0 before:bg-twilight-300 before:rounded-full before:bottom-0 before:transition-all capitalize ${
        dropdownActive
          ? "before:opacity-100 before:visible"
          : "before:opacity-0 before:invisible"
      }`}
      onClick={handleClickDropdown}
      ref={ref}
    >
      <span>{item.name}</span>
      <div className="w-3 h-3">
        <Icon iconName="arrowDown" />
      </div>
      <SubMenu dropdownActive={dropdownActive} subMenu={item.subMenu} />
    </li>
  );
};

const Menu: React.FC = () => {
  return (
    <div className="menu">
      {menu && (
        <ul className="h-full flex items-center">
          {menu.map((item: IMenu) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Menu;
