/*
  Warnings:

  - You are about to drop the `WatchedMovies` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,movieId]` on the table `Watchlist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "WatchedMovies" DROP CONSTRAINT "WatchedMovies_movieId_fkey";

-- DropForeignKey
ALTER TABLE "WatchedMovies" DROP CONSTRAINT "WatchedMovies_userId_fkey";

-- DropTable
DROP TABLE "WatchedMovies";

-- CreateIndex
CREATE UNIQUE INDEX "Watchlist_userId_movieId_key" ON "Watchlist"("userId", "movieId");
