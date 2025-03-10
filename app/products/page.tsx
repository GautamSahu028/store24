import ProductsContainer from "@/components/products/ProductsContainer";
import React from "react";

interface ProductsPageProps {
  searchParams: { layout?: string; search?: string };
}
const ProductsPage: React.FC<ProductsPageProps> = async ({ searchParams }) => {
  const layout = searchParams.layout || "grid";
  const search = searchParams.search || "";
  return <ProductsContainer layout={layout} search={search} />;
};

export default ProductsPage;
