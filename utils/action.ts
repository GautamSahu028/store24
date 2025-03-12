"use server";
import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { error, log } from "console";
import { redirect } from "next/navigation";
import { imageSchema, productSchema, validateWithZodSchema } from "./schemas";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }
  return user;
};

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "There was an error...",
  };
};

export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });
  return products;
};

export const fetchAllProducts = async ({ search = "" }: { search: string }) => {
  return db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const fetchSingleProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) redirect("/products");
  return product;
};

export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    // console.log("rawData : ", rawData);
    // const validatedRawData = productSchema.safeParse(rawData);
    // console.log("validatedRawData : ", validatedRawData);
    // if (!validatedRawData.success) {
    //   const errors = validatedRawData.error.errors.map((e) => e.message);
    //   throw new Error(errors.join(","));
    // }
    const file = formData.get("image") as File;
    const validatedFields = validateWithZodSchema(productSchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });
    // console.log("Validate image : ", validatedFile);
    // console.log("validatedData : ", validatedFields);

    await db.product.create({
      data: {
        ...validatedFields,
        image: "/images/product-1.jpg",
        clerkId: user.id,
      },
    });

    return { message: "product created" };
  } catch (error) {
    return renderError(error);
  }
};
