/*
  Warnings:

  - You are about to drop the column `time` on the `sections` table. All the data in the column will be lost.
  - Added the required column `combined_days` to the `sections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `combined_location` to the `sections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `combined_time_start` to the `sections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `combined_time_stop` to the `sections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_combined` to the `sections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `sections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeStart` to the `sections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeStop` to the `sections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sections" DROP COLUMN "time",
ADD COLUMN     "combined_days" TEXT NOT NULL,
ADD COLUMN     "combined_location" TEXT NOT NULL,
ADD COLUMN     "combined_time_start" TEXT NOT NULL,
ADD COLUMN     "combined_time_stop" TEXT NOT NULL,
ADD COLUMN     "is_combined" BOOLEAN NOT NULL,
ADD COLUMN     "note" TEXT NOT NULL,
ADD COLUMN     "timeStart" TEXT NOT NULL,
ADD COLUMN     "timeStop" TEXT NOT NULL;
