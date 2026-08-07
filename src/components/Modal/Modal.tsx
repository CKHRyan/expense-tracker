import ReactModal from "react-modal";
import { twMerge } from "tailwind-merge";
import "./style.css";

ReactModal.setAppElement("#root");

export type ModalProps = { contentClassname?: string } & ReactModal.Props;

export const Modal = ({ contentClassname, ...otherProps }: ModalProps) => (
  <ReactModal
    overlayClassName={{
      base: "overlay-base",
      afterOpen: "overlay-after",
      beforeClose: "overlay-before",
    }}
    className={{
      base: twMerge(
        "content-base w-full max-w-9/10 p-4 flex flex-col focus:outline-none",
        contentClassname,
      ),
      afterOpen: "content-after",
      beforeClose: "content-before",
    }}
    closeTimeoutMS={200}
    ariaHideApp={false}
    {...otherProps}
  />
);
