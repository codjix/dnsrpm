"use client";
import { useRouter } from "next/navigation";
import { Divider, Modal, ModalProps } from "@mantine/core";
import { createContext, Dispatch, useState } from "react";

import FormInfo from "./FormInfo";
import FormToggle from "./FormToggle";
import FormDel from "./FormDel";
export * from "./FormTrigger";

export const FormControlCtx = createContext<Dispatch<any>>(null);

type FormControlProps = {
  state: any;
  table: "dns" | "proxy";
  children?: React.ReactNode;
};

const FormControl = ({ state, table, children }: FormControlProps) => {
  const router = useRouter();
  const [data, setData] = useState(null);

  const formArrays = ["stack", "host"].map((target: "stack" | "host") =>
    [
      { label: "New", Form: FormInfo, view: "modal" },
      { label: "Edit", Form: FormInfo, view: "modal" },
      { label: "Enable", Form: FormToggle, view: "dialog" },
      { label: "Disable", Form: FormToggle, view: "dialog" },
      { label: "Delete", Form: FormDel, view: "dialog" },
    ].map(({ label, Form, view }) => {
      const action = label.toLowerCase();
      const tableName = table == "dns" ? "DNS" : "Proxy";
      return {
        [[action.toLowerCase(), target].join("-")]: {
          title: [label, tableName, target].join(" "),
          content: <Form {...{ table, data, target, action }} />,
          view,
        },
      };
    })
  );

  const formObjects = formArrays[0].concat(formArrays[1]);
  const forms = Object.assign({}, ...formObjects);

  type ModalType = { title: string; content: React.ReactNode; view: "modal" | "dialog" };
  const modal: ModalType = forms[state?.action];
  const modalProps: ModalProps = {
    zIndex: 300,
    lockScroll: false,
    title: modal?.title ?? "",
    centered: modal?.view == "dialog" ? true : false,
    size: modal?.view == "dialog" ? "md" : "lg",
    opened: Object.keys(forms).includes(state?.action),
    onClose: () => {
      router.push("/" + table);
      router.refresh();
      setData(null);
    },
  };

  return (
    <>
      <FormControlCtx.Provider value={setData}>
        {children}
        <Modal {...modalProps}>
          <Divider />
          {modal?.content}
        </Modal>
      </FormControlCtx.Provider>
    </>
  );
};

export default FormControl;
