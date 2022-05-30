/*
  Warnings:

  - Added the required column `rating` to the `RatingOfSong` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RatingOfSong" ADD COLUMN     "rating" INTEGER NOT NULL;
