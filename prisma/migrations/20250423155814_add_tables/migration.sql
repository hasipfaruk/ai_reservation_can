-- CreateTable
CREATE TABLE "Table" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "location" TEXT
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "numberOfPersons" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "reservationDate" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tableId" INTEGER,
    CONSTRAINT "Reservation_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("createdAt", "id", "name", "numberOfPersons", "phone", "reservationDate", "status", "time") SELECT "createdAt", "id", "name", "numberOfPersons", "phone", "reservationDate", "status", "time" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Table_number_key" ON "Table"("number");
