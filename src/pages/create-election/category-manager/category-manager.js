import { AddCircle } from "@mui/icons-material";
import React from "react";
import PortfolioCard from "../components/portfolio-card";
import { useCreateElectionServices } from "../context/create-election-context";
import CategoryCard from "./category-card";

export default function CategoryManager() {
  const {
    bluePrintState,
    addCategory,
    errors,
    setError,
    deletePosition,
    updatePosition,
  } = useCreateElectionServices();

  const ejectCategories = () => {
    const allCategories = !!bluePrintState ? bluePrintState.Categories : [];
    console.log(allCategories);
    return allCategories?.map((item, index) => {
      return (
        <CategoryCard
          error={errors.includes(`Category${item.Id}`)}
          key={index}
          data={item}
          name={`Definition${index}`}
          disabled={item.Title === "Name" || item.Title === "Image"}
          handleChange={(data) => {
            if (errors.length) setError([]);
            updatePosition(data);
          }}
          handleDelete={(data) => {
            if (errors.length) setError([]);
            deletePosition(data);
          }}
        />
      );
    });
  };
  return (
    <div>
      <div className="w-full h-auto mb-5 mt-2 flex items-center ">
        <strong className="whitespace-nowrap flex items-center mr-2">
          Catgegories
        </strong>
      </div>
      {ejectCategories()}

      <div className="w-[95%] flex items-center h-[50px]  mb-3">
        <div className="w-[100%] h-[50px] mr-2  mb-3"></div>
        <div
          onClick={() => {
            addCategory();
          }}
          className="w-[50px] ml-3 hover:animate-rise text-gray-300 hover:text-blue-500 justify-end cursor-pointer px-2 h-[50px] flex items-center mb-3"
        >
          <span className="whitespace-nowrap mr-3 ">Add Category</span>
          <AddCircle style={{ fontSize: 30 }} className="mr-2 " />
        </div>
      </div>
    </div>
  );
}
