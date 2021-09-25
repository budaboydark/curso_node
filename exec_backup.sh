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
mysqldump --column-statistics=0 -u root -pfumsoluco679 -h 172.17.0.3 scontabil > public/db/${NOW}_dump.sql
echo 'backup finalizado'
exit



