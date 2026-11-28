-- CreateTable
CREATE TABLE "ordem_servico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" INTEGER NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "descricao_problema" TEXT NOT NULL,
    "equipamento" TEXT NOT NULL,
    "data_abertura" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ordem_servico_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ordem_servico_numero_key" ON "ordem_servico"("numero");
