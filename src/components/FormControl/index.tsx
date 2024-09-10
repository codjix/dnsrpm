"use client";
import { useRouter } from "next/navigation";
import { Divider, Modal, ModalProps } from "@mantine/core";
import { createContext, Dispatch, useState } from "react";

import FormInfo from "./forms/FormInfo";
import FormToggle from "./forms/FormToggle";
import FormDel from "./forms/FormDel";
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

  const formArrays = ["stack", "host"].map((target: "stack" | "host") => {
    const actions = [
      { actionName: "New", Form: FormInfo, view: "modal" },
      { actionName: "Edit", Form: FormInfo, view: "modal" },
      { actionName: "Enable", Form: FormToggle, view: "dialog" },
      { actionName: "Disable", Form: FormToggle, view: "dialog" },
      { actionName: "Delete", Form: FormDel, view: "dialog" },
    ];
    return actions.map(({ actionName, Form, view }) => {
      const action = actionName.toLowerCase();
      return {
        [[action, target].join("-")]: {
          title: [actionName, table, target].join(" "),
          content: <Form {...{ table, data, target, action }} />,
          view,
        },
      };
    });
  });

  const formObjects = formArrays[0].concat(formArrays[1]);
  const forms = Object.assign({}, ...formObjects);

  type ModalType = { title: string; content: React.ReactNode; view: "modal" | "dialog" };
  const modal = forms[state?.action] as ModalType;
  const modalProps: ModalProps = {
    zIndex: 9999,
    lockScroll: false,
    title: modal?.title ?? "",
    centered: modal?.view == "dialog" ? true : false,
    size: modal?.view == "dialog" ? "md" : "lg",
    opened: Object.keys(forms).includes(state?.action),
    onClose: () => {
      router.push("/" + table);
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
