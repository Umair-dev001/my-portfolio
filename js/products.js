/* ========================================
   Product Data
   One source powers every product detail view.
   ======================================== */
window.ECSTASY_PRODUCTS = {

    jacket: {
        id: "jacket",
        // name: "Urban Leather Jacket",
        name: "Premium Leather Jacket",
        category: "Outerwear / Premium",
        price: 129,
        compareAt: 169,
        badge: "Best Seller",
        rating: 4.8,
        reviews: 120,
        image: "assets/images/featured/jacket.jpg",
        description:
            "A confident outerwear essential designed for modern styling, everyday comfort, and an elevated finish that works from casual afternoons to evening plans.",
        details:
            "Structured silhouette, clean finishing, easy layering proportions, and a versatile neutral palette designed to pair with everyday wardrobe staples.",
        features: [
            "Premium statement outerwear silhouette",
            "Comfortable everyday layering fit",
            "Clean modern detailing",
            "Designed for versatile seasonal styling"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Black", value: "#171717" },
            { name: "Brown", value: "#9a5f3a" },
            { name: "Stone", value: "#d8c4ae" },
            { name: "Mist", value: "#d8dce2" }
        ],
        views: [
            { label: "Full view", position: "50% 50%", scale: 1 },
            { label: "Upper detail", position: "50% 26%", scale: 1.22 },
            { label: "Texture detail", position: "34% 42%", scale: 1.34 },
            { label: "Lower detail", position: "58% 72%", scale: 1.18 }
        ],
        related: ["shirt", "trouser"]
    },

    shirt: {
        id: "shirt",
        name: "Signature Casual Shirt",
        category: "Casual / Essentials",
        price: 69,
        compareAt: 89,
        badge: "New",
        rating: 4.7,
        reviews: 86,
        image: "assets/images/featured/shirt.jpg",
        description:
            "An easy everyday shirt with a refined shape, clean styling, and a relaxed character made for simple layering and effortless outfits.",
        details:
            "Lightweight visual profile, versatile everyday styling, balanced proportions, and a clean essential look designed for repeat wear.",
        features: [
            "Easy everyday essential",
            "Clean relaxed silhouette",
            "Designed for simple layering",
            "Versatile neutral styling"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "White", value: "#f8fafc" },
            { name: "Sky", value: "#b9d8ee" },
            { name: "Sand", value: "#d8c5a7" }
        ],
        views: [
            { label: "Full view", position: "50% 50%", scale: 1 },
            { label: "Collar detail", position: "50% 22%", scale: 1.24 },
            { label: "Fabric detail", position: "38% 43%", scale: 1.32 }
        ],
        related: ["jacket", "trouser"]
    },

    trouser: {
        id: "trouser",
        name: "Tailored Everyday Trouser",
        category: "Bottoms / Modern",
        price: 79,
        compareAt: 99,
        badge: "Bestseller",
        rating: 4.6,
        reviews: 94,
        image: "assets/images/featured/trouser.jpg",
        description:
            "A clean tailored trouser that balances polished structure with an easy everyday feel, designed to move naturally between smart and casual styling.",
        details:
            "Modern tailored shape, versatile neutral tone, clean waistband styling, and a balanced silhouette for everyday combinations.",
        features: [
            "Modern tailored silhouette",
            "Everyday wardrobe versatility",
            "Clean minimal detailing",
            "Easy smart-to-casual styling"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Beige", value: "#c9aa80" },
            { name: "Charcoal", value: "#4b5563" },
            { name: "Black", value: "#171717" }
        ],
        views: [
            { label: "Full view", position: "50% 50%", scale: 1 },
            { label: "Waist detail", position: "50% 18%", scale: 1.26 },
            { label: "Fabric detail", position: "44% 48%", scale: 1.32 }
        ],
//         related: ["jacket", "shirt"]
//     }
// };
        related: ["jacket", "shirt"]
    },

    hoodie: {
        id: "hoodie",
        name: "Oversized Hoodie",
        category: "Casual / Essentials",
        price: 89,
        compareAt: 109,
        badge: "New",
        rating: 4.8,
        reviews: 78,
        image: "assets/images/featured/hoodie.jpg",
        keywords: "hoodie oversized sweatshirt casual sage green streetwear",
        description:
            "A relaxed oversized hoodie designed for everyday comfort, effortless layering, and a clean modern streetwear look.",
        details:
            "Soft heavyweight feel, dropped shoulders, roomy proportions, ribbed cuffs, and an easy silhouette designed for casual everyday wear.",
        features: [
            "Relaxed oversized silhouette",
            "Comfortable everyday layering",
            "Soft heavyweight feel",
            "Modern streetwear styling"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Sage", value: "#87977d" },
            { name: "Black", value: "#171717" },
            { name: "Cream", value: "#e7dfcf" }
        ],
        views: [
            { label: "Full view", position: "50% 50%", scale: 1 },
            { label: "Upper detail", position: "50% 24%", scale: 1.22 },
            { label: "Fabric detail", position: "42% 46%", scale: 1.32 }
        ],
        related: ["tee", "jeans"]
    },

    tee: {
        id: "tee",
        name: "Heavyweight Tee",
        category: "Casual / Everyday",
        price: 49,
        compareAt: 69,
        badge: "Trending",
        rating: 4.7,
        reviews: 91,
        image: "assets/images/featured/tee.jpg",
        keywords: "tee t-shirt tshirt heavyweight black casual everyday shirt",
        description:
            "A structured heavyweight T-shirt with a clean everyday shape, premium visual weight, and relaxed styling.",
        details:
            "Substantial fabric feel, relaxed shoulders, clean neckline, and versatile proportions designed to work alone or under outerwear.",
        features: [
            "Premium heavyweight profile",
            "Relaxed everyday fit",
            "Clean crew neckline",
            "Easy layering essential"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Black", value: "#171717" },
            { name: "White", value: "#f8fafc" },
            { name: "Stone", value: "#c9bda9" }
        ],
        views: [
            { label: "Full view", position: "50% 50%", scale: 1 },
            { label: "Neck detail", position: "50% 20%", scale: 1.24 },
            { label: "Fabric detail", position: "38% 45%", scale: 1.34 }
        ],
        related: ["hoodie", "jeans"]
    },

    jeans: {
        id: "jeans",
        name: "Relaxed Jeans",
        category: "Bottoms / Denim",
        price: 89,
        compareAt: 119,
        badge: "New",
        rating: 4.8,
        reviews: 67,
        image: "assets/images/featured/jeans.jpg",
        keywords: "jeans denim relaxed blue pants bottoms straight leg",
        description:
            "Relaxed everyday denim with a clean straight-leg shape designed for easy casual outfits and comfortable movement.",
        details:
            "Classic denim construction, relaxed leg profile, clean waistband styling, and a versatile light-wash finish.",
        features: [
            "Relaxed straight-leg fit",
            "Classic denim styling",
            "Comfortable everyday shape",
            "Versatile light-wash finish"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Light Blue", value: "#9db9d0" },
            { name: "Indigo", value: "#34506d" },
            { name: "Black", value: "#252525" }
        ],
        views: [
            { label: "Full view", position: "50% 50%", scale: 1 },
            { label: "Waist detail", position: "50% 18%", scale: 1.25 },
            { label: "Denim detail", position: "42% 48%", scale: 1.32 }
        ],
        related: ["tee", "cargo"]
    },

    polo: {
        id: "polo",
        name: "Knit Polo",
        category: "Casual / Smart",
        price: 59,
        compareAt: 79,
        badge: "Bestseller",
        rating: 4.9,
        reviews: 105,
        image: "assets/images/featured/polo.jpg",
        keywords: "polo knit shirt smart casual navy premium",
        description:
            "A refined knit polo combining relaxed comfort with a clean smart-casual appearance for effortless everyday dressing.",
        details:
            "Textured knit appearance, structured collar, short sleeves, clean button placket, and balanced proportions.",
        features: [
            "Refined knit texture",
            "Smart casual silhouette",
            "Structured polo collar",
            "Comfortable everyday styling"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Navy", value: "#172033" },
            { name: "Cream", value: "#e7dfcf" },
            { name: "Black", value: "#171717" }
        ],
        views: [
            { label: "Full view", position: "50% 50%", scale: 1 },
            { label: "Collar detail", position: "50% 20%", scale: 1.24 },
            { label: "Knit detail", position: "40% 45%", scale: 1.34 }
        ],
        related: ["trouser", "bomber"]
    },

    cargo: {
        id: "cargo",
        name: "Cargo Pants",
        category: "Bottoms / Utility",
        price: 79,
        compareAt: 99,
        badge: "New",
        rating: 4.7,
        reviews: 83,
        image: "assets/images/featured/cargo.jpg",
        keywords: "cargo pants utility olive green bottoms streetwear",
        description:
            "Modern utility cargo pants with practical pocket detailing and a relaxed silhouette built for casual everyday styling.",
        details:
            "Relaxed utility construction, functional cargo pockets, clean waistband, and versatile proportions for modern streetwear outfits.",
        features: [
            "Functional utility pockets",
            "Relaxed everyday silhouette",
            "Modern cargo detailing",
            "Easy streetwear styling"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Olive", value: "#64684c" },
            { name: "Stone", value: "#a49274" },
            { name: "Black", value: "#171717" }
        ],
        views: [
            { label: "Full view", position: "50% 50%", scale: 1 },
            { label: "Waist detail", position: "50% 18%", scale: 1.24 },
            { label: "Pocket detail", position: "38% 52%", scale: 1.30 }
        ],
        related: ["jeans", "bomber"]
    },

    bomber: {
        id: "bomber",
        name: "Bomber Jacket",
        category: "Outerwear / Modern",
        price: 99,
        compareAt: 129,
        badge: "Trending",
        rating: 4.8,
        reviews: 112,
        image: "assets/images/featured/bomber.jpg",
        keywords: "bomber jacket black outerwear modern streetwear coat",
        description:
            "A clean modern bomber jacket with an easy everyday silhouette designed for versatile layering and contemporary styling.",
        details:
            "Streamlined bomber construction, ribbed finishing, front zip closure, practical pockets, and a balanced modern fit.",
        features: [
            "Modern bomber silhouette",
            "Easy everyday layering",
            "Clean zip-front construction",
            "Versatile outerwear styling"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Black", value: "#171717" },
            { name: "Olive", value: "#64684c" },
            { name: "Stone", value: "#b5aa98" }
        ],
        views: [
            { label: "Full view", position: "50% 50%", scale: 1 },
            { label: "Upper detail", position: "50% 22%", scale: 1.23 },
            { label: "Zip detail", position: "46% 45%", scale: 1.32 }
        ],
        related: ["jacket", "hoodie"]
    }
};