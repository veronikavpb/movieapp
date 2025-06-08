const { PrismaClient } = require('@prisma/client');
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    await prisma.watchlist.deleteMany();
    await prisma.movie.deleteMany();
    await prisma.user.deleteMany();

    console.log('✅ Cleared existing data.');

    // Seed users
    const users = [
        { username: 'admin', password: 'admin123', role: 'ADMIN' },
        { username: 'user', password: 'user123', role: 'USER' },
        { username: 'guest', password: 'guest123', role: 'USER' },
    ];

    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 12);
        await prisma.user.upsert({
            where: { username: user.username },
            update: {},
            create: {
                username: user.username,
                password: hashedPassword,
                role: user.role,
            },
        });
    }

    // Seed movies
    await prisma.movie.createMany({
        data: [
            {
                title: 'Inception',
                genre: 'Sci-Fi',
                decade: 2010,
                mood: 'Mind-bending',
                description:
                    'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
                posterUrl: '/images/inception.jpg',
                rating: 9,
            },
            {
                title: 'The Godfather',
                genre: 'Crime',
                decade: 1970,
                mood: 'Intense',
                description:
                    'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
                posterUrl: '../../front-end/public/images/godfather.jpg',
                rating: 9.2,
            },
            {
                title: 'The Dark Knight',
                genre: 'Action',
                decade: 2000,
                mood: 'Thrilling',
                description:
                    'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on Gotham.',
                posterUrl: '../../front-end/public/images/darkknight.jpg',
                rating: 9.1,
            },
            {
                title: 'Pulp Fiction',
                genre: 'Crime',
                decade: 1990,
                mood: 'Quirky',
                description:
                    'The lives of two mob hitmen, a boxer, a gangster, and his wife intertwine in four tales of violence and redemption.',
                posterUrl: '../../front-end/public/images/pulpfiction.jpg',
                rating: 8.9,
            },
            {
                title: 'Forrest Gump',
                genre: 'Drama',
                decade: 1990,
                mood: 'Heartwarming',
                description:
                    'The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.',
                posterUrl: '../../front-end/public/images/forrestgump.jpg',
                rating: 8.8,
            },
            {
                title: 'The Shawshank Redemption',
                genre: 'Drama',
                decade: 1990,
                mood: 'Inspirational',
                description:
                    'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
                posterUrl: '../../front-end/public/images/shawshank.jpg',
                rating: 9.3,
            },
            {
                title: 'Avengers: Endgame',
                genre: 'Sci-Fi',
                decade: 2010,
                mood: 'Epic',
                description:
                    "After the devastating events of Avengers: Infinity War, the Avengers assemble once more to undo Thanos' actions and restore balance to the universe.",
                posterUrl: '../../front-end/public/images/avengers.jpg',
                rating: 8.4,
            },
            {
                title: 'Interstellar',
                genre: 'Sci-Fi',
                decade: 2010,
                mood: 'Thought-provoking',
                description:
                    "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
                posterUrl: '../../front-end/public/images/interstellar.jpg',
                rating: 8.6,
            },
            {
                title: "Schindler's List",
                genre: 'Historical',
                decade: 1990,
                mood: 'Emotional',
                description:
                    'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
                posterUrl: '../../front-end/public/images/shindler.jpg',
                rating: 9.0,
            },
            {
                title: 'The Matrix',
                genre: 'Sci-Fi',
                decade: 1990,
                mood: 'Revolutionary',
                description:
                    'A computer hacker learns about the true nature of his reality and his role in the war against its controllers.',
                posterUrl: '../../front-end/public/images/matrix.jpg',
                rating: 8.7,
            },
        ],
    });

    console.log('✅ Users and movies seeded.');

    const user1 = await prisma.user.findUnique({ where: { username: 'user' } });
    const user2 = await prisma.user.findUnique({ where: { username: 'guest' } });

    const allMovies = await prisma.movie.findMany();
    if (!user1 || !user2 || allMovies.length < 6) {
        console.warn('⚠️ Could not seed watchlists: missing users or not enough movies.');
        return;
    }

    const shuffle = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

    const user1Movies = shuffle(allMovies).slice(0, 3);
    const user2Movies = shuffle(allMovies).slice(3, 6);

    await prisma.watchlist.createMany({
        data: [
            ...user1Movies.map((m) => ({ userId: user1.id, movieId: m.id })),
            ...user2Movies.map((m) => ({ userId: user2.id, movieId: m.id })),
        ],
    });

    console.log('Watchlists seeded with different movies.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
