"use client";
import React, { useEffect, useState } from "react";
import { fetchFeaturedProducts } from "@/utils/action";
import EmptyList from "../global/EmptyList";
import SectionTitle from "../global/SectionTitle";
import ProductsGrid from "../products/ProductsGrid";
import { Product } from "@prisma/client";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await fetchFeaturedProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error fetching featured products:", err);
        setError("Failed to load featured products");
      }
    };
    fetchData();
  }, []);

  if (error)
    return <div className="pt-24 text-center text-red-500">{error}</div>;
  if (!products) return <EmptyList />;

  return (
    <section className="pt-24">
      <SectionTitle text="Featured Products" />
      <ProductsGrid products={products} />
    </section>
  );
};

export default FeaturedProducts;
