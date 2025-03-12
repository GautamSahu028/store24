"use client";
import { useActionState, useEffect } from "react";
import { actionFunction } from "@/utils/types";
import { toast } from "sonner";

const initialState = {
  message: "",
};

const FormContainer = ({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) => {
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    console.log("state : ", state);

    if (state.message) {
      toast(state.message);
    }
  }, [state]);
  return <form action={formAction}>{children}</form>;
};

export default FormContainer;
