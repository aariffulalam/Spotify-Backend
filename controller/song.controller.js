const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();


// Get all Songs
exports.getsongs = async (req, res) => {
    const getSongs = await prisma.song.findMany({
        include: {
            artists: true,
            ratings: true
        }
    })
    res.status(201).json({ message: "all songs", getSongs })
}






// Add a Song and Artist
exports.postsong = async (req, res) => {
    // const { name, dateOfRealiese, cover } = req.body;
    const { song, artist } = req.body

    let songData;
    let artistData;

    songData = await prisma.song.findFirst({
        where: {
            name: song.name
        }
    })

    const date = new Date(song.dateOfRealiese)
    console.log(date)

    if (songData === null) {
        songData = await prisma.song.create({
            data: {
                name: song.name,
                dateOfRealiese: date,
                cover: song.cover
            }
        })
    }



    artistData = await prisma.artist.findFirst({
        where: {
            name: artist.name
        }
    })

    if (artistData === null) {
        const date = new Date(artist.dob)
        artistData = await prisma.artist.create({
            data: {
                name: artist.name,
                dob: date,
                bio: artist.bio
            }
        })
    }

    const SongAndArtist = await prisma.songsungbyartists.create({
        data: {
            artistId: artistData.id,
            songId: songData.id
        }
    })
    res.status(201).json({ status: "song posted with it's singer", SongAndArtist })
}