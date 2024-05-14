import React from "react";

function Paidcourses() {
  return (
    <div className="p-3">
      <div className=" text-xl font-medium">Paid Course</div>
      <div className=" py-3 pb-3">

      <div className="grid gap-5 800px:grid-flow-row 800px:grid-cols-2 1300px:grid-cols-3  items-center justify-center 800px:justify-start">
        <div className=" bg-[#87A1EC] border-2 border-black flex flex-col h-[350px] w-[80dvw] 800px:h-[35vh] 800px:w-[33vw] 1000px:w-[30vw] 1300px:w-[25vw] rounded-md  shadow-[6px_6px_3px__rgba(0,0,0,0.7)]">
          <div className=" w-full min-h-[60%] bg-yellow-200 rounded-t-lg"></div>
          <div className=" w-full h-[40%] rounded-b-lg p-3 ">
            <div className=" flex flex-col h-full w-full justify-between">
              <div className="1000px:text-sm 1200px:text-base">
                Full Stack Development
              </div>
              <div className="font-light text-xs 1200px:text-sm">FlexBox</div>
              <div className=" w-full h-auto ">
                <div className=" text-right 1000px:text-xs 1200px:text-sm">
                  30%
                </div>
                <div className=" bg-neutral-600 w-full h-[10px] rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
        
        
        
      </div>

      </div>
    </div>
  );
}

export default Paidcourses;
