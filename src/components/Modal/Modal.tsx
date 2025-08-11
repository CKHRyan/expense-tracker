import ReactModal from "react-modal";
import { twMerge } from "tailwind-merge";
import "./style.css";

ReactModal.setAppElement("#root");

type Props = { contentClassname?: string } & ReactModal.Props;

export const Modal = ({ contentClassname, ...otherProps }: Props) => (
  <ReactModal
    overlayClassName={{
      base: "overlay-base",
      afterOpen: "overlay-after",
      beforeClose: "overlay-before",
    }}
    className={{
      base: twMerge("content-base p-4 flex flex-col", contentClassname),
      afterOpen: "content-after",
      beforeClose: "content-before",
    }}
    closeTimeoutMS={200}
    ariaHideApp={false}
    {...otherProps}
  />
);
