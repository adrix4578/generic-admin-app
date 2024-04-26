import {useState} from "react";
import {Button} from "./Button.tsx";

interface ModalProps{
  visibility:boolean,
  closeModal:()=>void,
  children:React.ReactNode
}
export const Modal = ({visibility , closeModal ,children}:ModalProps) => {
  return (
    <div
      className={`fixed w-full h-full bg-black/50 flex items-center justify-center ${visibility ? "visible" : "hidden"}`}>
      <div className={"w-fit h-fit bg-white"}>
        <div className={" w-36 h-fit"}>
          <Button
            url={""}
            type={"button"}
            onClick={() => {
              closeModal()
            }}
            className={"h-10 m-2 bg-white rounded-2xl border-primary-2  w-2/12  transition ease-in-out delay-50 hover:bg-primary-1 hover:text-white duration-300 self-end"}
          ><p className={"icon-arrow-left"}>{children}</p>
          </Button>
        </div>
        <div>


        </div>
      </div>
    </div>
  )
}