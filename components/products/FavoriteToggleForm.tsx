"use client";

import { toggleFavoriteAction } from "@/utils/action";
import { usePathname } from "next/navigation";
import React from "react";
import FormContainer from "../form/FormContainer";
import { CardSubmitButton } from "../form/Buttons";

type FavoriteToggleFormProps = {
  favoriteId: string | null;
  productId: string;
};

const FavoriteToggleForm: React.FC<FavoriteToggleFormProps> = ({
  favoriteId,
  productId,
}) => {
  const pathname = usePathname();
  const toggleAction = toggleFavoriteAction.bind(null, {
    productId,
    favoriteId,
    pathname,
  });
  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  );
};

export default FavoriteToggleForm;
