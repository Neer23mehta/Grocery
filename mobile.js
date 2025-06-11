const mockPhones = [
    {
        id: 1,
        name: "iPhone 14 Pro Max",
        brand: "Apple",
        screen: "6.7-inch OLED",
        camera: "48MP + 12MP + 12MP",
        storage: "128GB/256GB/512GB/1TB",
        image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg"
    },
    {
        id: 2,
        name: "Samsung Galaxy S23 Ultra",
        brand: "Samsung",
        screen: "6.8-inch AMOLED",
        camera: "200MP + 12MP + 10MP + 10MP",
        storage: "256GB/512GB/1TB",
        image: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s23-ultra-5g-1.jpg"
    },
    {
        id: 3,
        name: "Google Pixel 8 Pro",
        brand: "Google",
        screen: "6.7-inch LTPO OLED",
        camera: "50MP + 48MP + 48MP",
        storage: "128GB/256GB/512GB/1TB",
        image: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-pro-1.jpg"
    },
    {
        id: 4,
        name: "OnePlus 11",
        brand: "OnePlus",
        screen: "6.7-inch AMOLED",
        camera: "50MP + 48MP + 32MP",
        storage: "128GB/256GB/512GB",
        image: "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11-1.jpg"
    },
    {
        id: 5,
        name: "Xiaomi Mi 13 Pro",
        brand: "Xiaomi",
        screen: "6.73-inch AMOLED",
        camera: "50MP + 50MP + 50MP",
        storage: "128GB/256GB/512GB",
        image: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-13x-1.jpg"
    },
    {
        id: 6,
        name: "Samsung Galaxy Z Fold 5",
        brand: "Samsung",
        screen: "7.6-inch Dynamic AMOLED 2X",
        camera: "50MP + 12MP + 10MP",
        storage: "256GB/512GB/1TB",
        image: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-z-fold5-5g-r0.jpg"
    },
    {
        id: 7,
        name: "Sony Xperia 1 IV",
        brand: "Sony",
        screen: "6.5-inch OLED",
        camera: "12MP + 12MP + 12MP + TOF 3D",
        storage: "256GB/512GB",
        image: "https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-1-iv-1.jpg"
    },
    {
        id: 8,
        name: "Motorola Edge 40 Pro",
        brand: "Motorola",
        screen: "6.67-inch AMOLED",
        camera: "50MP + 50MP + 12MP",
        storage: "256GB/512GB",
        image: "https://fdn2.gsmarena.com/vv/pics/motorola/motorola-edge-40-pro-1.jpg"
    },
    {
        id: 9,
        name: "Oppo Find X5 Pro",
        brand: "Oppo",
        screen: "6.7-inch AMOLED",
        camera: "50MP + 50MP + 13MP",
        storage: "256GB/512GB",
        image: "https://fdn2.gsmarena.com/vv/pics/oppo/oppo-find-x5-pro-1.jpg"
    },
    {
        id: 10,
        name: "Realme GT 2 Pro",
        brand: "Realme",
        screen: "6.7-inch AMOLED",
        camera: "50MP + 50MP + 2MP",
        storage: "128GB/256GB",
        image: "https://fdn2.gsmarena.com/vv/pics/realme/realme-gt-2-pro-1.jpg"
    },
    {
        id: 11,
        name: "Vivo X90 Pro",
        brand: "Vivo",
        screen: "6.78-inch AMOLED",
        camera: "50MP + 50MP + 12MP",
        storage: "256GB/512GB",
        image: "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-x90-pro-1.jpg"
    },
    {
        id: 12,
        name: "Asus ROG Phone 6 Pro",
        brand: "Asus",
        screen: "6.78-inch AMOLED",
        camera: "50MP + 13MP + 5MP",
        storage: "512GB/1TB",
        image: "https://fdn2.gsmarena.com/vv/pics/asus/asus-rog-phone-6-pro-1.jpg"
    },
    {
        id: 13,
        name: "Huawei P50 Pro",
        brand: "Huawei",
        screen: "6.6-inch OLED",
        camera: "50MP + 64MP + 13MP",
        storage: "128GB/256GB/512GB",
        image: "https://fdn2.gsmarena.com/vv/pics/huawei/huawei-p50-pro-1.jpg"
    },
    {
        id: 14,
        name: "Redmi Note 12 Pro",
        brand: "Xiaomi",
        screen: "6.67-inch AMOLED",
        camera: "50MP + 8MP + 2MP",
        storage: "64GB/128GB/256GB",
        image: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-12-pro-1.jpg"
    },
    {
        id: 15,
        name: "Samsung Galaxy A54 5G",
        brand: "Samsung",
        screen: "6.4-inch Super AMOLED",
        camera: "50MP + 12MP + 5MP",
        storage: "128GB/256GB",
        image: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a54-5.jpg"
    },
    {
        id: 16,
        name: "Nokia X30 5G",
        brand: "Nokia",
        screen: "6.43-inch AMOLED",
        camera: "50MP + 13MP",
        storage: "128GB/256GB",
        image: "https://fdn2.gsmarena.com/vv/pics/nokia/nokia-x30-5g-1.jpg"
    },
    {
        id: 17,
        name: "Honor Magic5 Pro",
        brand: "Honor",
        screen: "6.81-inch OLED",
        camera: "50MP + 50MP + 50MP",
        storage: "256GB/512GB",
        image: "https://fdn2.gsmarena.com/vv/pics/honor/honor-magic5-pro-1.jpg"
    },
    {
        id: 18,
        name: "Poco F4 GT",
        brand: "Poco",
        screen: "6.67-inch AMOLED",
        camera: "64MP + 8MP + 2MP",
        storage: "128GB/256GB",
        image: "https://fdn2.gsmarena.com/vv/pics/poco/poco-f4-gt-1.jpg"
    },
    {
        id: 19,
        name: "Realme GT Neo 3",
        brand: "Realme",
        screen: "6.7-inch AMOLED",
        camera: "50MP + 8MP + 2MP",
        storage: "128GB/256GB",
        image: "https://fdn2.gsmarena.com/vv/pics/realme/realme-gt-neo3-0.jpg"
    },
    {
        id: 20,
        name: "iQOO 9 Pro",
        brand: "iQOO",
        screen: "6.78-inch AMOLED",
        camera: "50MP + 50MP + 16MP",
        storage: "256GB/512GB",
        image: "https://fdn2.gsmarena.com/vv/pics/iqoo/iqoo-9-pro-1.jpg"
    }
]

export default mockPhones
