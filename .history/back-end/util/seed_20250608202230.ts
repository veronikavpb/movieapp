import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    /*  console.log('Deleting existing data...');
    await prisma.watchlist.deleteMany();
    await prisma.movie.deleteMany();
    await prisma.user.deleteMany(); */

    /* console.log('Seeding users...');
    const admin = await prisma.user.create({
        data: {
            username: 'admin',
            password: await bcrypt.hash('admin123', 12),
            role: 'admin',
        },
    });

    const user1 = await prisma.user.create({
        data: {
            username: 'user',
            password: await bcrypt.hash('user123', 12),
            role: 'user',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            username: 'janedoe',
            password: await bcrypt.hash('password456', 12),
            role: 'user',
        },
    }); */

    console.log('Seeding movies...');
    const inception = await prisma.movie.create({
        data: {
            title: 'Inception',
            genre: 'Sci-Fi',
            decade: 2010,
            mood: 'Mind-bending',
            description: 'A sci-fi thriller about dream manipulation.',
            posterUrl: '../../front-end/public/images/inception.jpg',
            rating: 9,
        },
    });

    const godfather = await prisma.movie.create({
        data: {
            title: 'The Godfather',
            genre: 'Crime',
            decade: 1970,
            mood: 'Intense',
            description: 'A mafia crime drama.',
            posterUrl: '../../front-end/public/images/godfather.jpg',
            rating: 9.2,
        },
    });

    const darkKnight = await prisma.movie.create({
        data: {
            title: 'The Dark Knight',
            genre: 'Action',
            decade: 2000,
            mood: 'Thrilling',
            description: 'Batman faces the Joker in Gotham City.',
            posterUrl: '../../front-end/public/images/darkknight.jpg',
            rating: 9.1,
        },
    });

    const pulpFiction = await prisma.movie.create({
        data: {
            title: 'Pulp Fiction',
            genre: 'Crime',
            decade: 1990,
            mood: 'Darkly Comedic',
            description:
                'The lives of two mob hitmen, a boxer, and others intertwine in a tale of violence and redemption.',
            posterUrl: '../../front-end/public/images/pulpfiction.jpg',
            rating: 8.9,
        },
    });

    /*  console.log('Seeding watchlists...');
    await prisma.watchlist.create({
        data: {
            userId: user1.id,
            movieId: inception.id,
        },
    });

    await prisma.watchlist.create({
        data: {
            userId: user1.id,
            movieId: darkKnight.id,
        },
    });

    await prisma.watchlist.create({
        data: {
            userId: user2.id,
            movieId: godfather.id,
        }, 
    });*/

    console.log('✅ Seeding complete!');
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
