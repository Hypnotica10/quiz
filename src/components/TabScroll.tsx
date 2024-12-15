import React, { MouseEvent, useState } from "react";
import { menu } from "../helper/staticData";
import Button from "./Button";
import { TabScrollProps } from "../types/componentType";

const TabScroll: React.FC<TabScrollProps> = (props) => {
  const { getSubjectActive } = props;
  const [active, setActive] = useState<number>(1);

  const handleClick = (_e: MouseEvent<HTMLButtonElement>, id: number) => {
    getSubjectActive(id);
    setActive(id);
  };
  return (
    <div className="my-small">
      <div className="flex gap-large">
        {menu &&
          menu[1].subMenu.map((item) => (
            <div key={item.id} className="text-twilight-500">
              <Button
                handleClick={(e) => handleClick(e, item.id)}
                type="button"
                buttonClass={`${
                  active === item.id
                    ? "text-gray-100 bg-twilight-500 border-transparent"
                    : "text-gray-500 bg-transparent border-gray-400"
                } font-semibold capitalize text-small py-xsmall px-small border-2 rounded-medium transition-all`}
              >
                {item.name}
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TabScroll;
