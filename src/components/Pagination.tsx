import React, { useEffect, useState } from "react";
import { PaginationProps } from "../types/componentType";
import Button from "./Button";

const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    informationPage,
    handleSelectPage,
    currentPage,
    handlePreviousPage,
    handleNextPage,
  } = props;
  const [pageNumbers, setPageNumber] = useState<number[]>([]);

  useEffect(() => {
    const newPageNumber: number[] = [];
    const totalPage = informationPage.totalPage;
    for (let i = 0; i < totalPage; i++) {
      newPageNumber.push(i + 1);
    }
    setPageNumber(newPageNumber);
  }, []);

  return (
    <div className="my-large">
      <ul className="flex gap-xsmall items-center justify-end">
        <li className="">
          <Button
            handleClick={handlePreviousPage}
            buttonClass="w-8 h-8 flex items-center justify-center border-2 border-gray-400 rounded-full text-gray-500 hover:border-transparent hover:bg-twilight-500 hover:text-gray-100 transition-all"
            type="button"
          >
            {`<`}
          </Button>
        </li>
        {pageNumbers &&
          pageNumbers.map((item: number) => (
            <li key={item}>
              <Button
                handleClick={(e) => handleSelectPage(e, item)}
                buttonClass={`${
                  currentPage === item
                    ? "border-transparent bg-twilight-500 text-gray-100"
                    : "border-gray-400 bg-transparent text-gray-500"
                } w-8 h-8 flex items-center justify-center border-2 rounded-full  hover:border-transparent hover:bg-twilight-500 hover:text-gray-100 transition-all`}
                type="button"
              >
                {item}
              </Button>
            </li>
          ))}
        <li>
          <Button
            handleClick={handleNextPage}
            buttonClass="w-8 h-8 flex items-center justify-center border-2 border-gray-400 rounded-full text-gray-500 hover:border-transparent hover:bg-twilight-500 hover:text-gray-100 transition-all"
            type="button"
          >
            {`>`}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
