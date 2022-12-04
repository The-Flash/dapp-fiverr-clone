import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    await prisma.category.deleteMany({});
    await prisma.category.createMany({
        data: [
            {   
                id: 1,
                name: "Graphics & Design",
                image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/3f1b7ea10295936b6846bcff0afd38cf-1626595415203/graphics-design-desktop.png",
                slug: "graphic-design"
            },
            {
                id: 2,
                name: "Digital Marketing",
                image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/3f1b7ea10295936b6846bcff0afd38cf-1626595415207/digital-marketing-desktop.png",
                slug: "digital-marketing"
            },
            {
                id: 3,
                name: "Writing & Translation",
                image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/42593ecc6f1e40fd735892b99f001ea4-1631622804534/writing%20_%20translation.png",
                slug: "writing-translation"
            },
            {
                id: 4,
                name: "Video & Animation",
                image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/0f6552319e77504dc5f59479b7ad83f1-1631622668242/Video%20_%20Animation.png",
                slug: "video-animation"
            },
            {
                id: 5,
                name: "Music & Audio",
                image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/3f1b7ea10295936b6846bcff0afd38cf-1626595415210/music-audio-desktop.png",
                slug: "music-audio"
            },
            {
                id: 6,
                name: "Programming & Tech",
                image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/3f1b7ea10295936b6846bcff0afd38cf-1626595415213/programming-tech-desktop.png",
                slug: "programming-tech"
            },
        ]
    });
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    await prisma.$disconnect();
});