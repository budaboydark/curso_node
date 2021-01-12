#!/bin/bash

echo 'validando diretório public/db'

if [ ! -d ./public/db ]
then 
	mkdir -p ./public/db
	echo 'criando diretório public/db'
fi

echo 'executando backup'
NOW=$(date '+%Y-%m-%d')
echo 'iniciando backup'
mysqldump -u rodrigo -prodrigo -P 3020 -h localhost banco_teste > public/db/${NOW}_dump.sql
echo 'backup finalizado'
exit



