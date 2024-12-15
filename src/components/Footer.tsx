import { Link } from "react-router-dom";
import { IFooterData } from "../types/staticDataType";
import { footerData } from "../helper/staticData";
import React from "react";

const FooterItem = ({ label, list }: IFooterData) => {
  return (
    <div className="text-gray-800 mb-8 md:w-1/3 w-1/2">
      <h5 className="text-small font-bold mb-6">{label}</h5>
      <ul className="flex flex-col gap-4">
        {list &&
          list.map((item, index) => (
            <li key={index} className="font-semibold text-base">
              <Link
                to={item.path}
                className="hover:text-twilight-500 transition-all"
              >
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="pt-16">
      <div className="footer-top">
        <div className="container flex md:flex-nowrap flex-wrap">
          {footerData &&
            footerData.map((item, index) => (
              <FooterItem key={index} label={item.label} list={item.list} />
            ))}
        </div>
      </div>
      <div className="container">
        <div className="py-2">
          <div className="w-full bg-gray-400 h-px"></div>
        </div>
      </div>
      <div className="container text-center my-5">
        <span className="">© 2024 Quiz, Inc.</span>
      </div>
    </footer>
  );
};

export default Footer;
