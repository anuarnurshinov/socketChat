-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "dialogId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dialog" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Dialog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DialogOnUsers" (
    "userId" INTEGER NOT NULL,
    "dialogId" INTEGER NOT NULL,

    CONSTRAINT "DialogOnUsers_pkey" PRIMARY KEY ("userId","dialogId")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_dialogId_fkey" FOREIGN KEY ("dialogId") REFERENCES "Dialog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DialogOnUsers" ADD CONSTRAINT "DialogOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DialogOnUsers" ADD CONSTRAINT "DialogOnUsers_dialogId_fkey" FOREIGN KEY ("dialogId") REFERENCES "Dialog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
