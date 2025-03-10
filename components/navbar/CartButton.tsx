import { Button } from "../ui/button";
import Link from "next/link"; // Import Link from Next.js, not from lucide-react
import { LucideShoppingCart } from "lucide-react";

const CartButton = () => {
  const nItems = 4;
  return (
    <Button
      variant="outline"
      size="icon"
      className="flex justify-center items-center relative"
      asChild
    >
      <Link href="/cart">
        <LucideShoppingCart /> {/* Use the TiShoppingCart icon */}
        <span className="absolute -top-3 -right-3 bg-primary text-white dark:text-black rounded-full h-6 w-6 flex items-center justify-center text-xs">
          {nItems}
        </span>
      </Link>
    </Button>
  );
};

export default CartButton;
