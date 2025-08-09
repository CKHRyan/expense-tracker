import ReactModal from "react-modal";
import { twMerge } from "tailwind-merge";
import "./style.css";

type Props = { contentContainerClassname?: string } & ReactModal.Props;

export const Modal = ({
  children,
  contentContainerClassname,
  ...otherProps
}: Props) => (
  <ReactModal
    overlayClassName={{
      base: "overlay-base",
      afterOpen: "overlay-after",
      beforeClose: "overlay-before",
    }}
    className={{
      base: "content-base",
      afterOpen: "content-after",
      beforeClose: "content-before",
    }}
    closeTimeoutMS={200}
    {...otherProps}
  >
    <div className={twMerge("p-4 flex flex-col", contentContainerClassname)}>
      {children}
    </div>
  </ReactModal>
);
