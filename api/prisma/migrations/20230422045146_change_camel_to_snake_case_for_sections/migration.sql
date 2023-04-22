/*
  Warnings:

  - You are about to drop the column `timeStart` on the `sections` table. All the data in the column will be lost.
  - You are about to drop the column `timeStop` on the `sections` table. All the data in the column will be lost.
  - Added the required column `time_start` to the `sections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_stop` to the `sections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sections" DROP COLUMN "timeStart",
DROP COLUMN "timeStop",
ADD COLUMN     "time_start" TEXT NOT NULL,
ADD COLUMN     "time_stop" TEXT NOT NULL;
