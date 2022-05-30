/*
  Warnings:

  - You are about to drop the `SongSungByArtists` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SongSungByArtists" DROP CONSTRAINT "SongSungByArtists_artistId_fkey";

-- DropForeignKey
ALTER TABLE "SongSungByArtists" DROP CONSTRAINT "SongSungByArtists_songId_fkey";

-- DropTable
DROP TABLE "SongSungByArtists";

-- CreateTable
CREATE TABLE "Songsungbyartists" (
    "artistId" INTEGER NOT NULL,
    "songId" INTEGER NOT NULL,

    CONSTRAINT "Songsungbyartists_pkey" PRIMARY KEY ("artistId","songId")
);

-- AddForeignKey
ALTER TABLE "Songsungbyartists" ADD CONSTRAINT "Songsungbyartists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Songsungbyartists" ADD CONSTRAINT "Songsungbyartists_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
