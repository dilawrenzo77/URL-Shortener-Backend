-- CreateTable
CREATE TABLE "Qr" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Qr_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Qr" ADD CONSTRAINT "Qr_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
