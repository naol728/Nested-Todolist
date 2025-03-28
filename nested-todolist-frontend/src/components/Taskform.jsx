import React, { useState } from "react";
import Button from "./Button";
import { FiStar } from "react-icons/fi";
import { IoMdAdd, IoIosArrowBack } from "react-icons/io";
import { useParams } from "react-router";
import Modal from "./Modal";
export default function Taskform() {
  const { id } = useParams();
  const [isopen, setIsopen] = useState(false);
  const isfav = false;
  return (
    <div className="flex flex-col h-full items-center">
      <div className="flex flex-col space-y-3  min-w-[50%] ">
        <div className="flex space-x-3 items-center -ml-3">
          <Button type="add">
            <IoIosArrowBack />
          </Button>
          <span className="font-bold text-lg">%COLLECTION NAME% {id}</span>
          <FiStar
            className={`h-7 w-7 ${
              isfav ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
            }`}
          />
        </div>

        <div className="font-semibold flex space-x-3 items-center">
          <Button type="add" onClick={() => setIsopen(!isopen)}>
            <IoMdAdd />
          </Button>
          <span className="text-md">Add Task</span>
        </div>
        {isopen ? (
          <Modal isopen={isopen} setIsopen={setIsopen}>
            this is the modal
          </Modal>
        ) : (
          <></>
        )}

        <div className="flex space-y-3 flex-col  ">
          <div className="text-sm font-semibold">task-0</div>
          <div className="ml-2">there is no task 🤗</div>
        </div>
      </div>
    </div>
  );
}
