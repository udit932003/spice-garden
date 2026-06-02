import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const menu = [
  // Starters
  { name: "Paneer Tikka", desc: "Char-grilled cottage cheese marinated in spiced yogurt.", price: 280, category: "STARTERS", veg: true, spicy: true, featured: true, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80" },
  { name: "Chicken 65", desc: "Crispy fried chicken tossed with curry leaves and chilli.", price: 320, category: "STARTERS", veg: false, spicy: true, featured: false, image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=600&q=80" },
  { name: "Veg Spring Rolls", desc: "Crispy rolls filled with seasoned vegetables.", price: 220, category: "STARTERS", veg: true, spicy: false, featured: false, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80" },
  // Mains
  { name: "Butter Chicken", desc: "Tender chicken in a rich, creamy tomato gravy.", price: 420, category: "MAINS", veg: false, spicy: false, featured: true, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80" },
  { name: "Paneer Butter Masala", desc: "Cottage cheese in a velvety makhani sauce.", price: 360, category: "MAINS", veg: true, spicy: false, featured: true, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80" },
  { name: "Dal Makhani", desc: "Slow-cooked black lentils with butter and cream.", price: 290, category: "MAINS", veg: true, spicy: false, featured: false, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80" },
  // Biryani
  { name: "Hyderabadi Chicken Biryani", desc: "Fragrant basmati rice layered with spiced chicken.", price: 380, category: "BIRYANI", veg: false, spicy: true, featured: true, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80" },
  { name: "Veg Dum Biryani", desc: "Aromatic rice cooked with vegetables and saffron.", price: 320, category: "BIRYANI", veg: true, spicy: true, featured: false, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&q=80" },
  // Desserts
  { name: "Gulab Jamun", desc: "Warm milk dumplings soaked in rose syrup.", price: 150, category: "DESSERTS", veg: true, spicy: false, featured: false, image: "https://images.unsplash.com/photo-1601303516361-66cf03f01b46?w=600&q=80" },
  { name: "Gajar Ka Halwa", desc: "Carrot pudding with ghee, nuts and cardamom.", price: 180, category: "DESSERTS", veg: true, spicy: false, featured: false, image: "https://images.unsplash.com/photo-1605197788044-5a32c7078486?w=600&q=80" },
  // Drinks
  { name: "Mango Lassi", desc: "Thick, sweet yogurt smoothie with Alphonso mango.", price: 120, category: "DRINKS", veg: true, spicy: false, featured: false, image: "https://images.unsplash.com/photo-1626078299034-94f6f6f6f6f6?w=600&q=80" },
  { name: "Masala Chai", desc: "Spiced Indian tea brewed with milk.", price: 60, category: "DRINKS", veg: true, spicy: false, featured: false, image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=600&q=80" },
];

async function main() {
  console.log("🌱 Seeding Spice Garden...");
  await prisma.reservation.deleteMany();
  await prisma.menuItem.deleteMany();

  for (const m of menu) {
    await prisma.menuItem.create({
      data: {
        name: m.name,
        description: m.desc,
        price: m.price,
        category: m.category,
        image: m.image,
        isVeg: m.veg,
        spicy: m.spicy,
        featured: m.featured,
      },
    });
  }
  console.log(`✅ Created ${menu.length} menu items`);

  const now = new Date();
  const day = (n: number) => new Date(now.getTime() + n * 86400000);
  const reservations = [
    { name: "Ananya Rao", email: "ananya@example.com", phone: "9876543210", date: day(1), time: "20:00", guests: 4, status: "CONFIRMED", notes: "Window seat please" },
    { name: "Vikram Singh", email: "vikram@example.com", phone: "9123456780", date: day(2), time: "13:00", guests: 2, status: "PENDING", notes: null },
    { name: "Meera Nair", email: "meera@example.com", phone: "9988776655", date: day(3), time: "19:30", guests: 6, status: "PENDING", notes: "Birthday celebration 🎂" },
  ];
  for (const r of reservations) {
    await prisma.reservation.create({ data: r });
  }
  console.log(`✅ Created ${reservations.length} reservations`);
  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
